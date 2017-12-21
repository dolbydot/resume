
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


//测试代码
// var TestObject = AV.Object.extend('TestObject');
// var testObject = new TestObject();
// testObject.save({
//   words: 'Hello World!'
// }).then(function(object) {
//   alert('LeanCloud Rocks!');
// })


var app = new Vue({
    el: '#app',
    data: {
        message: 'TodoList',
        newTodo: '',
        todoList: [],
        actionType: 'signUp',
        formData: {//登录注册共用，这样一来用户切换登录注册的时候，已输入的数据就不需要再输入一遍
            username: '',
            password: ''
        },
    },
    // 每次刷新页面待办就没了，因为代码保存在内存中，而内存无法持久，所以我们选择将代码保存在localStorage中
    created: function () {
        window.onbeforeunload = () => {
            let dataString = JSON.stringify(this.todoList)
            window.localStorage.setItem('myTodos', dataString)
        }
        let oldDataString = window.localStorage.getItem('myTodos')
        let oldData = JSON.parse(oldDataString)
        this.todoList = oldData || []
    },
    methods: {
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
        },

        // 移除一个待办项
        removeTodo(todo) {
            let index = this.todoList.indexOf(todo)
            this.todoList.splice(index, 1)
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
            user.signUp().then(function (loginedUser) {
                console.log(loginedUser)
            }, function (error) { })
        },

        //登录
        login() {
            AV.User.logIn(this.formData.username, this.formData.password)
                .then(function (loginedUser) {
                    console.log(loginedUser)
                }, function (error) { })
        }
    },
})