import Home from "../components/Home.vue";
import PresenceCalendar from "../components/presenceCalendar/PresenceCalendar.vue";
import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  { path: '/', component: Home },
  {path: '/presenceCalendar', component: PresenceCalendar}
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})


export default router