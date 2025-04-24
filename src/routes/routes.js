import PresenceCalendar from "../components/presenceCalendar/PresenceCalendar.vue";
import login from "../components/login/login.vue"
import homeSecretaria from "../components/HomeSecretaria/homeSecretaria.vue"
import FichaMatricula from "../components/FichaMatricula/FichaMatricula.vue";
import { createRouter, createWebHashHistory } from 'vue-router';
import CadastroAluno from "../components/CadastroAluno/CadastroAluno.vue";
import frequenciaAtividade from "../components/FrequenciaAtividade/frequenciaAtividade.vue";


const routes = [
  { path: '/', component: homeSecretaria },
  {path: '/presenceCalendar', component: PresenceCalendar},
  {path: '/login', component: login},
  { path: '/matricula', name: 'FichaMatricula', component: FichaMatricula },
  { path:'/cadastro', name:'CadastroAluno', component:CadastroAluno},
  { path:'/frequenciaAtividade', name:'frequenciaAtividade', component:frequenciaAtividade}
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})


export default router