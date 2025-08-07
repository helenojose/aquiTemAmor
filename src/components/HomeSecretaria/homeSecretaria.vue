<template>
  <div>
    <Menu />
    <div class="main-content">
      <h1>Bem-vindo(a) à Secretaria Digital!</h1>

      <div class="search-bar">
        <div class="coluna">
          <i class="bi bi-search"></i>
          <input type="search" placeholder="Digite o nome da criança..." v-model="searchQuery"/>
        </div>
        <div class="coluna3">
          <button class="filter-btn" @click.stop="toggleFilterMenu">
            <i class="bi bi-funnel"></i>
          </button>
          <div
            class="filter-menu"
            v-if="showFilterMenu"
            v-outside="closeFilterMenu"
            @click.stop
          >
            <label v-for="opt in filterOptions" :key="opt.value">
              <input
                type="checkbox"
                v-model="selectedFilters"
                :value="opt.value"
              />
              {{ opt.label }}
            </label>
          </div>
        </div>
      </div>
      <div class="students-container" v-if="filteredStudents.length">
        <div class="quantity-column">
          <div class="text-fixed">
            <h2>Quantidade</h2>
          </div>
          
          <ul>
            <li v-for="(student, index) in filteredStudents" :key="student.id">
             <div class="numeros">
                Nº {{ index + 1 < 10 ? '0' + (index + 1) : index + 1 }}
             </div> 
            </li>
          </ul>
        </div>
        <div class="student-column">
          <div class="text-fixed1">
            <h2>Alunos Matriculados</h2>
          </div>
          
          <ul>
            <li v-for="student in filteredStudents" :key="student.id + '-name'" @click="goToFicha(student) " style="cursor: pointer;">
              <div class="student-name">{{ student.name }}</div>
              <div class="student-modalidades">
              <span
                v-for="(mod, index) in student.modalidade"
                :key="index"
                class="modal-badge"
              >
                {{ mod }}
              </span>
            </div>
          </li>
            
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from "../sideBar/menu.vue";
import { db } from "../../Firebase/FIrebase";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../Firebase/FIrebase";

export default {
  components: { Menu },
  directives: {
    outside: {
      beforeMount(el, binding) {
        el.clickOutsideEvent = event => {
          if (!(el === event.target || el.contains(event.target))) {
            binding.value(event);
          }
        };
        document.addEventListener('click', el.clickOutsideEvent);
      },
      unmounted(el) {
        document.removeEventListener('click', el.clickOutsideEvent);
      }
    }
  },
  data() {
    return {
      searchQuery: '',
      students: [],
      filterOptions: [
        { label: 'REFORÇO',   value: 'REFORÇO' },
        { label: 'MUAI TAY',  value: 'MUAI TAY' },
        { label: 'NATAÇÃO',   value: 'NATAÇÃO' },
        { label: 'BALLET',    value: 'BALLET' },
        { label: 'JUDÔ',      value: 'JUDÔ' }
      ],
      selectedFilters: [],
      showFilterMenu: false
    };
  },
  mounted() {
  onAuthStateChanged(auth, async (user) => {
    if (!user) return;

    const profSnapshot = await getDocs(collection(db, "professores"));
    let usuarioAtual = null;

    profSnapshot.forEach(doc => {
      if (doc.id === user.uid) {
        usuarioAtual = doc.data();
      }
    });

    if (!usuarioAtual) return;

    const alunosCollection = collection(db, "alunos");

    onSnapshot(alunosCollection, (snapshot) => {
      const alunos = [];

      snapshot.forEach(doc => {
        const aluno = doc.data();

        if (!aluno.aluno || !aluno.aluno.nome) return; // pula documentos inválidos

        const alunoModalidades = Array.isArray(aluno.academico) 
          ? aluno.academico.map(a => a.curso) 
          : [];

        const profModalidades = usuarioAtual.modalidades || [];

        if (
          usuarioAtual.tipo === "adm" ||
          alunoModalidades.some(modalidade => profModalidades.includes(modalidade))
        ) {
          alunos.push({
            id: doc.id,
            name: aluno.aluno.nome,
            modalidade: alunoModalidades,
          });
        }
      });


      this.students = alunos;
    });
  });
},


  computed: {
    filteredStudents() {
      // Primeiro, filtra pelo nome
      let results = this.students.filter(s => {
        return s.name.toLowerCase().includes(this.searchQuery.trim().toLowerCase());
      });
      // Em seguida, aplica filtros de modalidade se houver
      if (this.selectedFilters.length) {
        results = results.filter(s =>
          s.modalidade.some (mod => this.selectedFilters.includes(mod))
        );
      }
      return results;
    }
  },
  methods: {
    toggleFilterMenu() {
      this.showFilterMenu = !this.showFilterMenu;
    },
    closeFilterMenu() {
      this.showFilterMenu = false;
    },
    goToFicha(aluno){
      if(!aluno || !aluno.id){  
        console.error("Aluno invalido:", aluno)
        return
        }
      this.$router.push({name: 'FichaMatricula', params: {id: aluno.id } });
    }
  }
}
</script>

<style scoped>

.student-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.student-name {
  font-weight: 500;
  max-width: 100%;
  overflow-wrap: anywhere;
}

.student-modalidades {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
  justify-content: flex-start;
  max-width: 100%;
}

.modal-badge {
  background-color: #118678;
  color: #fff;
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-size: 0.75rem;
  white-space: nowrap;
}

.main-content {
  width: 90%;
  height: 90vh;
  margin: 20px 0 0 250px;
  display: grid;
  grid-template-rows: auto auto 1fr;
  gap: 1.5rem;
  font-family: lexend;
  font-size: 25px;
}

.search-bar {
  position: relative;
  border-radius: 0.7rem;
  color: #fff;
  display: grid;
  grid-template-columns: 1210px 90px;
  gap: 1.5rem;
  font-size: 20px;
}

.coluna {
  background: #118678;
  padding-left: 0.1rem;
  padding-top: 0.5rem;
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
  font-size: 20px;
}

.coluna3 {
  background-color: #118678;
  text-align: center;
  padding: 0.5rem 0.1rem;
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
  font-size: 20px;
}

.filter-btn {
  background: transparent;
  border: none;
  padding: 0.6rem 0.75rem;
  cursor: pointer;
  color: #fff;
}

.filter-menu {
  position: absolute;
  top: 220%;
  left: 78%;
  transform: translateY(-50%);
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  margin-left: 0.5rem;
  padding: 0.75rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 10;
}

.filter-menu label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #333;
}

.filter-menu input[type="checkbox"] {
  transform: scale(1.1);
}

.search-bar .coluna i {
  padding-left: 2rem;
}

input::placeholder {
  color: #e0e0e0;
}

.search-bar input[type="search"] {
  padding: 0.7rem 1rem;
  border: none;
  background-color: transparent;
  color: #fff;
  outline: none;
}

/* Lista de alunos */
.students-container {
  margin-top: 4rem;
  width: 70%;
  display: grid;
  grid-template-columns: 15% 1fr;
  gap: 1rem;
  overflow-y: auto;
  padding-right: 7rem;
  scrollbar-width: unset;
  scrollbar-color: #118678 #e0e0e0;
  font-size: 20px;
}

.students-container::-webkit-scrollbar {
  width: 20px;
}

.students-container::-webkit-scrollbar-track {
  background: #e0e0e0;
  border-radius: 10px;
}

.students-container::-webkit-scrollbar-thumb {
  background-color: #118678;
  border-radius: 4px;
  border: 2px solid #e0e0e0;
}

.students-container::-webkit-scrollbar-thumb:hover {
  background-color: #22C574;
}

.text-fixed h2 {
  margin-top: -4rem;
  font-size: 20px;
  width: 160px;
  background-color: #118678;
  padding: 0.7rem;
  border-radius: 0.5rem;
  color: #fff;
  text-align: center;
  position: fixed;
}

.text-fixed1 h2 {
  margin-top: -4rem;
  font-size: 20px;
  width: 980px;
  background-color: #118678;
  padding: 0.7rem;
  border-radius: 0.5rem;
  color: #fff;
  text-align: center;
  position: fixed;
}

.quantity-column ul {
  text-align: center;
}

.quantity-column ul,
.student-column ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.quantity-column ul li,
.student-column ul li {
  background: #fff;
  padding: 1rem 1rem;
  border-radius: 1rem;
  height: 75px;
  box-sizing: border-box;
}

.quantity-column ul li {
  padding-top: 1.5rem;
}

.numeros {
  font-size: 23px;
}

/* Media Query para telas grandes e médias */

@media (max-width: 1440px) {
  .main-content {
    width: 85%;
    height: 85vh;
    font-size: 22px;
    margin-left: 250px;
  }
  .search-bar {
    grid-template-columns: calc(100% - 90px) 90px;
    gap: 1rem;
  }
  .students-container {
    width: 85%;
    padding-right: 2rem;
  }
  .text-fixed h2 {
    width: 140px;
    font-size: 18px;
  }
  .text-fixed1 h2 {
    width: 800px;
    font-size: 18px;
  }
}

@media (max-width: 1366px) {
  .main-content {
    width: 800px;
    height: 550px;
    font-size: 20px;
    margin: 20px 0 0 250px;
  }
  .search-bar {
    grid-template-columns: 830px 70px;
    gap: 1rem;
  }
  .students-container {
    grid-template-columns: 120px 700px;
    width: 95%;
    padding-right: 2rem;
  }
  .text-fixed h2 {
    width: 100px;
    font-size: 14px;
  }
  .text-fixed1 h2 {
    width: 675px;
    font-size: 15px;
  }
  .student-modalidades {
    color: #118678;
    padding-left: 0.2rem;
  }
  .student-name {
    padding-right: 0.5rem;
    font-size: 13px;
  }
  .modal-badge {
    font-size: 0.55rem;
  }
  .quantity-column ul li,
  .student-column ul li {
    padding-top: 0.3rem;
    height: 45px;
  }
  .numeros {
    padding-top: 0.5rem;
    font-size: 15px;
  }
}

@media (max-width: 1024px) {
  .main-content {
    margin-top: 10px;
    margin-left: 250px;
    width: 780px;
    height: 750px;
  }
  .search-bar {
    grid-template-columns: 650px 70px;
    gap: 1rem;
  }
  .students-container {
    grid-template-columns: 100px 530px;
    width: 80%;
    scrollbar-width: unset;
  }
}

/* --- desktop: nada muda, fica como está --- */


/* --- celular: tudo menor, menu escondido, layout simples --- */
@media (max-width: 768px) {

  /* Esconde menu lateral */
  .home-container {
    display: none !important;
  }

  /* Botão hamburger fica visível */
  .mobile-menu-toggle {
    display: block !important;
    position: fixed;
    top: 10px;
    left: 10px;
    z-index: 10000;
    font-size: 2rem;
    background: transparent;
    border: none;
    color: #118678;
  }

  /* Ajusta container principal para ocupar toda tela */
  .main-content {
    margin-left: 0 !important;
    width: 80% !important;
    height: 50vh;
    padding: 30px;
    font-size: 12px !important;
  }
  .search-bar {
  display: flex !important;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 0.5rem;
}

  .coluna {
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  padding: 0.4rem;
  border-radius: 0.5rem;
  background-color: #118678;
 
}

.coluna i {
  padding-left: 0;
  font-size: .8rem;
}

.coluna input[type="search"] {
  width: 100%;
  font-size: 0.8rem;
  padding: 0.4rem;
}

.coluna3 {
  flex-shrink: 0;
  background-color: #118678;
  border-radius: 0.5rem;
  padding: 0.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

  /* Exemplo: deixa o título menor */
  h1 {
    width: 200px;
    padding-top: 16px;
    font-size: 1.2rem !important;
  }
  .text-fixed1 h2{
    width: 300px;
    margin-top: -50px;
    font-size: 12px;
  }

  /* Deixa inputs e botões menores */
  input[type="search"] {
    font-size: .7rem !important;
    padding: 10px !important;
    width: 100px;
  }
  .coluna input[type="search"] {
  width: 100%;
  font-size: 0.8rem;
  padding: 0.4rem;
  color: white; /* mostra o texto digitado */
  background-color: transparent;
  border: none;
  outline: none;
}

/* placeholder visível */
.coluna input[type="search"]::placeholder {
  color: white;
  opacity: 0.7;
}


  button.filter-btn {
    font-size: 1rem !important;
    padding: 5px 10px !important;
  }

  /* Lista de alunos fica coluna única, textos menores */
  .students-container {
    grid-template-columns: 1fr !important;
    padding-right: 0 !important;
    margin-top: 30px !important;
    width: 325px;
  }
  input{
    width: 100px;
    font-size: 10px;
  }

  .student-column ul li {
    font-size: 0.6rem !important;
    padding: 7px !important;
  }

  /* Esconde a coluna dos números */
  .quantity-column {
    display: none !important;
  }

  /* Número ao lado do nome (no próprio li) */
  .numeros-mobile {
    display: inline-block !important;
    margin-right: 10px;
    font-weight: 700;
    color: #118678;
  }


  .filter-menu {
    position: absolute !important;
    top: 100%;
    right: auto;        /* Remove o right para não travar do lado direito */
    left: 90%;          /* Posiciona a partir da metade da largura do container */
    transform: translateX(-60%); /* Move para a esquerda, mais perto do botão */
    width: 70px;
    background: #fff;
    border-radius: 6px;
    padding: .3rem 0.5rem;
    box-shadow: 1px 2px 6px rgba(0,0,0,0.2);
    gap: 0.3rem;
    z-index: 9999;
    align-items: right ; 
   
  }

  .filter-menu label {
    margin-right: 1.2rem;
    cursor: pointer;
    font-size: 10px;
  
}

.filter-menu input[type="checkbox"] {
  margin: 0;            /* remove margens que podem desalinhar */
  transform: scale(0.9);

}

}

/* Esconde o botão hamburger no desktop */
.mobile-menu-toggle {
  display: none;
}


</style>
