import Vue from 'vue'
// 1. Importer les dépendances
import VueRouter from 'vue-router'
// 2. Importer les composants des vues de l'application
import HomePage from "@/pages/HomePage";
import TodoPage from "@/pages/TodoPage";
import Todo2Page from "@/pages/Todos2/Todo2Page";

Vue.use(VueRouter)

// 3. Définir les routes qui sont liées aux composants
const routes = [
  { name: 'home', 
    path: '/', 
    component: HomePage },
  {
    name: 'todo',
    path: '/todo/:id',
    component: () => import ('../pages/TodoEditPage.vue')
  },
  {
    name: 'todos',
    path: '/todos',
    component: TodoPage
  },
  // -- My Custom -- \\
  {
    name: 'todos2',
    path: '/todos2',
    component: Todo2Page
  },
]

// on place nos routes dans une instance de VueRouter
const router = new VueRouter({
  mode: 'history',
  routes // short for `routes: routes`
})

// 4. on exporte la configuration pour l'importer dans main.js
export default router