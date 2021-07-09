import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/RegisterUser.vue'
import Users from '../views/Users.vue'
import axios from 'axios';

function AdminAuth(to, from, next) {

    if (localStorage.getItem('token') != undefined) {
        var req = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        }
        axios.post("http://localhost:8686/validate", {}, req).then(res => {
            console.log(res);
            next();
        }).catch(err => {
            console.log(err.response);
            next("/login");
        });


    } else {
        next("/login");
    }
}



const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/register',
        name: 'Register',
        component: Register

    },
    {
        path: '/admin/users',
        name: 'Users',
        component: Users,
        beforeEnter: AdminAuth
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router