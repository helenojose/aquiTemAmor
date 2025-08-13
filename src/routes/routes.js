import PresenceCalendar from "../components/presenceCalendar/PresenceCalendar.vue";
import login from "../components/login/login.vue"
import homeSecretaria from "../components/HomeSecretaria/homeSecretaria.vue"
import FichaMatricula from "../components/FichaMatricula/FichaMatricula.vue";
import { createRouter, createWebHashHistory } from 'vue-router';
import CadastroAluno from "../components/CadastroAluno/CadastroAluno.vue";
import frequenciaAtividade from "../components/FrequenciaAtividade/frequenciaAtividade.vue";
import CadastroProfessor from "../components/login/CadastroProfessor.vue";
import teste from "../components/login/teste.vue";


const routes = [
  { path: '/home', component: homeSecretaria },
  {path: '/presenceCalendar', component: PresenceCalendar},
  {path: '/', component: login},
  { path: '/matricula/:id', name: 'FichaMatricula', component: () => import('../components/FichaMatricula/FichaMatricula.vue'), props: true},
  { path:'/cadastro', name:'CadastroAluno', component:CadastroAluno},
  { path:'/frequenciaAtividade', name:'frequenciaAtividade', component:frequenciaAtividade},
  { path: '/CadastroProfessor', name: 'CadastroProfessor', component:CadastroProfessor},
  {path: '/teste', name:'teste', component:teste}
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})


export default router