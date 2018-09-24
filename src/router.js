import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')      
    },
    {
      path: '/users',
      name: 'users',
      component: () => import(/* webpackChunkName: "users" */ './views/Users.vue')
    },
    {
      path: '/posts',
      name: 'posts',
      component: () => import(/* webpackChunkName: "users" */ './views/posts/Posts.vue')
    },
    {
      path: '/posts/new',
      name: 'newPost',
      component: () => import(/* webpackChunkName: "users" */ './views/posts/Form.vue'),
      props: {
        default: true,
        title: 'New Post'
      }
    },
    {
      path: '/posts/:id/edit',
      name: 'editPost',
      component: () => import(/* webpackChunkName: "users" */ './views/posts/Form.vue'),
      props: {
        default: true,
        title: 'Edit Post'
      }
    }
  ]
})
