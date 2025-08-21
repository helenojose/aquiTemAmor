<template>
  <div>
    <Menu />

    <div class="main-content">
      <h1>Bem-vindo(a) à Secretaria Digital!</h1>

      <div class="search-bar">
        <div class="coluna">
          <i class="bi bi-search"></i>
          <input
            type="search"
            placeholder="Digite o nome da criança..."
            v-model="searchQuery"
          />
        </div>

        <div class="coluna3" style="position: relative;">
          <button class="filter-btn" @click.stop="toggleFilterMenu">
            <i class="bi bi-funnel"></i>
          </button>

          <div
            v-if="showFilterMenu"
            class="filter-menu"
            v-outside="closeFilterMenu"
            @click.stop
          >
            <label v-for="opt in filterOptions" :key="opt.value">
              <input type="checkbox" v-model="selectedFilters" :value="opt.value" />
              {{ opt.label }}
            </label>
          </div>




          <div
            class="filter-menu"
            v-if="showFilterMenu"
            v-outside="closeFilterMenu"
            @click.stop
          >
            <label v-for="opt in filterOptions" :key="opt.value">
              <input type="checkbox" v-model="selectedFilters" :value="opt.value" />
              {{ opt.label }}
            </label>
          </div>
        </div>
      </div>

      <div class="students-container" v-if="filteredStudents.length">
        <div class="quantity-column">
          <div class="text-fixed">
            <h2>Matricula</h2>
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
            <li
              v-for="student in filteredStudents"
              :key="student.id + '-name'"
              @click="goToFicha(student)"
              style="cursor: pointer;"
            >
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
        document.addEventListener("click", el.clickOutsideEvent);
      },
      unmounted(el) {
        document.removeEventListener("click", el.clickOutsideEvent);
      }
    }
  },

  data() {
    return {
      searchQuery: "",
      students: [],
      filterOptions: [
        { label: "REFORÇO", value: "REFORÇO" },
        { label: "MUAI TAY", value: "MUAI TAY" },
        { label: "NATAÇÃO", value: "NATAÇÃO" },
        { label: "BALLET", value: "BALLET" },
        { label: "JUDÔ", value: "JUDÔ" }
      ],
      selectedFilters: [],
      showFilterMenu: false
    };
  },

  mounted() {
    onAuthStateChanged(auth, async user => {
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

      onSnapshot(alunosCollection, snapshot => {
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
            alunoModalidades.some(modalidade =>
              profModalidades.includes(modalidade)
            )
          ) {
            alunos.push({
              id: doc.id,
              name: aluno.aluno.nome,
              modalidade: alunoModalidades
            });
          }
        });

        this.students = alunos;
      });
    });
  },

  computed: {
    filteredStudents() {
      // Filtra pelo nome
      let results = this.students.filter(s =>
        s.name.toLowerCase().includes(this.searchQuery.trim().toLowerCase())
      );

      // Aplica filtros de modalidade se houver
      if (this.selectedFilters.length) {
        results = results.filter(s =>
          s.modalidade.some(mod =>
            this.selectedFilters.some(f => f.toLowerCase().trim() === mod.toLowerCase().trim())
          )
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

    goToFicha(aluno) {
      if (!aluno || !aluno.id) {
        console.error("Aluno inválido:", aluno);
        return;
      }
      this.$router.push({ name: "FichaMatricula", params: { id: aluno.id } });
    }
  }
};
</script>


<style scoped>
.student-row {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;


}

.student-name {
  font-weight: 500;
  max-width: 100%;
  overflow-wrap: anywhere;
  font-size: clamp(11px, 1.5vw, 14px);
}

.student-modalidades {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
  justify-content: flex-start;
  max-width: 100%;
  margin-top: .2rem;

}

.modal-badge {
  background-color: #118678;
  color: #fff;
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-size: clamp(8px, 1vw, 11px);
  white-space: nowrap;
  
}

.main-content {
  width: min(80%, 1200px);
  margin: 20px auto 0 auto;
  display: grid;
  grid-template-rows: auto auto 1fr;
  gap: 1.5rem;
  font-family: lexend;
  font-size: clamp(14px, 2vw, 20px);
  
}

.search-bar {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1rem;
  align-items: center;
  color: #fff;
}

.coluna {
  background: #118678;
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
}

.coluna i {
  margin-right: 0.5rem;
  font-size: clamp(12px, 2vw, 18px);
}

.coluna input[type="search"] {
  flex: 1;
  border: none;
  background: transparent;
  color: #fff;
  outline: none;
  font-size: clamp(12px, 1.5vw, 16px);
}

.coluna input[type="search"]::placeholder {
  color: #e0e0e0;
}

.coluna3 {
  background: #118678;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
}

.filter-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  color: #fff;
  font-size: clamp(14px, 2vw, 18px);
}

.filter-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  padding: 0.75rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 10;
  min-width: 150px;
}

.filter-menu label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: clamp(12px, 1.5vw, 14px);
  color: #333;
}

.filter-menu input[type="checkbox"] {
  transform: scale(1.1);
}

.students-container {
  display: grid;
  grid-template-columns: minmax(50px, 15%) 1fr;
  gap: 1rem;
  width: 100%;
  overflow-y: auto;
  padding-right: 1rem;
  font-size: clamp(12px, 1.5vw, 16px);
}

.students-container::-webkit-scrollbar {
  width: 12px;
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

.text-fixed h2,
.text-fixed1 h2 {
  font-size: clamp(12px, 1.5vw, 18px);
  background-color: #118678;
  padding: 0.7rem;
  border-radius: 0.5rem;
  color: #fff;
  text-align: center;
  position: sticky;
  top: 0;
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
  background: #fff;  padding: 0.8rem;
  border-radius: 1rem;
  box-sizing: border-box;
  min-height: 50px;
  display: flex;
  align-items: center;
  flex-direction: column; /* empilha */
  align-items: flex-start;
}
.student-column ul li{
  height: 20px;
  padding-top: .1rem;
}

.numeros {
  font-size: clamp(12px, 1.5vw, 18px);
}
.text-fixed h2::after{
  content: "";
}

@media (max-width: 1336px) {
  .main-content {
    width: min(70%, 1200px);
    margin: 5px auto ; /* centraliza horizontalmente */
    padding-right: 10rem;
    display: grid;
    grid-template-rows: auto auto 1fr;
    gap: 1.5rem;
    font-family: lexend;
    font-size: clamp(12px, 2vw, 20px);
  }
}


/* ========================= */
/* 📱 Ajustes para celular   */
/* ========================= */
@media (max-width: 768px) {
   .main-content {
    width: 90%;
    height: 69vh;
    margin: 70px auto; 
    padding: 0;
    display: grid;
    grid-template-rows: auto auto 1fr;
    gap: 1rem;
    font-size: clamp(12px, 4vw, 16px);
  }
  .main-content h1{
    font-size: 22px;
    width: 220px;
  }
  .text-fixed h2{
    color: transparent;
  }
  .text-fixed h2::after {
    color: #fff;
    content: "M";
    position: absolute;
    left: 25px;
    top: 10px;
  }
  .students-container {
    grid-template-columns:60px 1fr; /* vira 1 coluna */
  }

  .student-row {
    flex-direction: column; /* empilha */
    align-items: flex-start;
  }

  .quantity-column ul li,
  .student-column ul li {
    flex-direction: column; /* número em cima */
    align-items: flex-start;
  }
   .quantity-column{
    width: 60px;
   }

  .student-name {
    font-size: 12px;
    font-weight: 600;
  }

  .student-modalidades {
    margin-bottom: 0.3rem; /* modalidades abaixo do nome */
  }
  .filter-menu { 
    position: absolute !important; 
    top: 100%; right: auto; 
    left: 90%;  transform: translateX(-60%);
    width: 70px; background: #fff; 
    border-radius: 6px;
    padding: .3rem 0.5rem;
    box-shadow: 1px 2px 6px rgba(0,0,0,0.2);
    gap: 0.3rem; z-index: 9999; align-items: right ; 
  } 
  .filter-menu label{
    margin-right: 1.5rem; 
    cursor: pointer; 
    font-size: 10px; 
  }
}

</style>
