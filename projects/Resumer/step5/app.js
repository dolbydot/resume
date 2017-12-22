
import Vue from 'vue'
import AV from 'leancloud-storage'
import './index.css'
import friendlyDate from './date.js'

let APP_ID = 'aeTqFehwIkT3Lfdz57UTEkai-gzGzoHsz';
let APP_KEY = 'hGtaRjlrewcCIUyTtl9lVGYT';
AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

var app = new Vue({
    el: '#app',
    data: {
        message: 'TodoList',
        newTodo: '',
        todoList: [],
        actionType: 'signUp',
        formData: {//登入 注册共用，这样一来用户切换登入注册的时候，已输入的数据就不需要再输入一遍
            username: '',
            password: ''
        },
        currentUser: null,//当前登录的用户
    },

    created: function () {
        // window.onbeforeunload = () => {//onbeforeunload在页面卸载时触发，实践得出的结论是：beforeunload 事件里面的所有请求都发不出去，会被取消
        //     let dataString = JSON.stringify(this.todoList)

        // 每次刷新页面待办就没了，因为代码保存在内存中，而内存无法持久，所以我们选择将代码保存在localStorage中
        // window.localStorage.setItem('myTodos', dataString)
        // 但将数据保存在localStorage里，弊端是在不清空内存的情况下所有用户看到的都是同意todoList
        // 所以我们选择将内存存储在leancloud中，以下接口来自官方文档 https://leancloud.cn/docs/leanstorage_guide-js.html#hash-609558353

        // 因为beforeunload事件里的请求发不出去，所以我们不能再beforeunload事件里将数据存储到LeanCloud中

        // 第一次尝试保存数据与用户匹配不成功
        // var AVTodos = AV.Object.extend('AllTodos')
        // var avTodos = new AVTodos()
        // avTodos.set('content', dataString)
        // avTodos.save().then(function (todo) {
        //     // 成功保存之后，执行其他逻辑.
        //     console.log('保存成功')
        // }, function (error) {
        //     // 异常处理
        //     console.error('保存失败')
        // })

        // 别被困难打倒，为什么一定要在页面卸载前存储数据到leancloud中呢？
        // 我们完全可以在用户每次增删todo时就发送请求存储数据
        // }

        // 从LeanCloud读取todos的逻辑
        // let oldDataString = window.localStorage.getItem('myTodos')
        // let oldData = JSON.parse(oldDataString)
        // this.todoList = oldData || []

        this.currentUser = this.getCurrentUser()
        this.fetchTodos()
    },

    methods: {
        // 读取todos
        fetchTodos() {
            if (this.currentUser) {
                var query = new AV.Query('AllTodos')
                query.find()
                    // .then(function (todos) {
                    //     console.log(todos)//获取user的AllTodos
                    .then((todos) => {
                        let avAllTodos = todos[0]//一个用户对应一块AllTodos，理论上AllTodos只有一个，所以我们取结果的第一项
                        let id = avAllTodos.id
                        this.todoList = JSON.parse(avAllTodos.attributes.content)
                        this.todoList.id = id// 读取成功后保存id
                    }, function (error) {
                        console.log(error)
                    })
            }
        },

        // 更新对象
        updateTodos() {
            let dataString = JSON.stringify(this.todoList)
            let avTodos = AV.Object.createWithoutData('AllTodos', this.todoList.id)
            avTodos.set('content', dataString)
            avTodos.save().then(() => {
                console.log('更新成功')
            })
        },

        // 存储待办项
        saveTodos() {
            let dataString = JSON.stringify(this.todoList)
            var AVTodos = AV.Object.extend('AllTodos')
            var avTodos = new AVTodos()
            var acl = new AV.ACL()// ACL即leancloud访问控制（读写权限管理）
            acl.setReadAccess(AV.User.current(), true)// 当前user可读
            acl.setWriteAccess(AV.User.current(), true)// 当前user可写
            avTodos.set('content', dataString)
            avTodos.setACL(acl)// 设置访问控制
            avTodos.save().then((todo) => {
                // 成功保存之后，执行其他逻辑.
                this.todoList.id = todo.id// save成功后保存id
                console.log('保存成功')
            }, function (error) {
                // 异常处理
                console.error('保存失败')
            })
        },

        // id存在即更新todos，不存在则新建todos
        saveOrUpdateTodos() {
            if (this.todoList.id) {
                this.updateTodos()
            } else {
                this.saveTodos()
            }
        },

        // 增加一个待办项
        addTodo() {
            // 避免无内容的todo
            if (this.newTodo === '') return
            this.todoList.unshift({
                title: this.newTodo,
                createdAt: Date.now(),
                doneAt: 0,
                done: false//添加一个done属性
            })
            this.newTodo = ''
            this.saveOrUpdateTodos()//每次新增/更新项即发送请求存储数据
        },

        // 移除一个待办项
        removeTodo(todo) {
            let index = this.todoList.indexOf(todo)
            this.todoList.splice(index, 1)
            this.saveOrUpdateTodos()//每次删除/更新项即发送请求存储数据
        },

        //todo可以在已完成和未完成之间切换，无论何时，已完成的项在底部，未完成的项在顶部
        toggleTodo(todo) {
            let index = this.todoList.indexOf(todo)
            if (todo.done) {
                todo.done = false
                todo.doneAt = 0
                this.todoList.unshift(this.todoList.splice(index, 1)[0])
            } else {
                todo.done = true
                todo.doneAt = Date.now()
                this.todoList.push(this.todoList.splice(index, 1)[0])
            }
            this.saveOrUpdateTodos()//一定要记得保存完成状态
        },

        //切换日期显示格式
        formatedTime(time) {
            return friendlyDate(time)
        },

        //注册
        signUp() {
            let user = new AV.User();
            user.setUsername(this.formData.username);
            user.setPassword(this.formData.password);
            user.signUp().then((loginedUser) => {
                // console.log(loginedUser)
                this.currentUser = this.getCurrentUser()
            }, (error) => {
                console.log('注册失败')
            })
        },

        //登入
        login() {
            AV.User.logIn(this.formData.username, this.formData.password)
                .then((loginedUser) => {
                    // console.log(loginedUser)
                    this.currentUser = this.getCurrentUser()
                    this.fetchTodos()//登录成功后即读取todos
                }, (error) => {
                    console.log('登录失败')
                })
        },

        //获取当前登录的用户
        getCurrentUser() {
            let current = AV.User.current()
            if (current) {
                let { id, createdAt, attributes: { username } } = current
                return { id, username, createdAt }//解构赋值
            } else {
                return null
            }
        },

        //登出
        logout() {
            AV.User.logOut()
            this.currentUser = null
            window.location.reload()
        },

    },
})