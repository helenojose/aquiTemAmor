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
            <li v-for="student in filteredStudents" :key="student.id">
              Nº {{ student.id < 10 ? '0' + student.id : student.id }}
            </li>
          </ul>
        </div>
        <div class="student-column">
          <div class="text-fixed1">
            <h2>Aluno</h2>
          </div>
          
          <ul>
            <li v-for="student in filteredStudents" :key="student.id + '-name'">
              {{ student.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from "../sideBar/menu.vue";

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
      students: [
        { id: 1, name: 'MARIA BLA BLA BLA', modalidade: 'ballet' },
        { id: 2, name: 'PEDRO BLA BLA BLA', modalidade: 'judô' },
        { id: 3, name: 'Heleno Teste', modalidade: 'natação' },
        { id: 4, name: 'João Silva', modalidade: 'reforço' },
        { id: 5, name: 'Ana Pereira', modalidade: 'muai tay' },
        { id: 6, name: 'Lucas Souza', modalidade: 'ballet' },
        { id: 7, name: 'Carla Mendes', modalidade: 'judô' },
        { id: 8, name: 'Rafael Gomes', modalidade: 'natação' },
        { id: 9, name: 'Beatriz Lima', modalidade: 'reforço' },
        { id: 10, name: 'Gabriel Costa', modalidade: 'muai tay' },
        { id: 9, name: 'Beatriz Lima', modalidade: 'reforço' },
        { id: 9, name: 'Beatriz Lima', modalidade: 'reforço' },
        { id: 9, name: 'Beatriz Lima', modalidade: 'reforço' },
        { id: 9, name: 'Beatriz Lima', modalidade: 'reforço' },
      ],
      filterOptions: [
        { label: 'Reforço',   value: 'reforço' },
        { label: 'Muai Tay',  value: 'muai tay' },
        { label: 'Natação',   value: 'natação' },
        { label: 'Ballet',    value: 'ballet' },
        { label: 'Judô',      value: 'judô' }
      ],
      selectedFilters: [],
      showFilterMenu: false
    };
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
          this.selectedFilters.includes(s.modalidade)
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
    }
  }
};
</script>

<style scoped>
.main-content {
  width: 1006px;
  height: 777px;
  margin: 50px 0 0 333px;
  display: grid;
  grid-template-rows: auto auto 1fr;
  gap: 1.5rem;
  font-family: lexend;
}

.search-bar {
  position: relative;
  border-radius: .7rem;
  color: #fff;
  display: grid;
  grid-template-columns: 800px 80px;
  gap: 1.5rem;

}

.coluna{
 background: #118678;
 padding-left: .1rem;
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;

}

.coluna3{
  background-color: #118678;
  text-align: center;
  padding: .1rem .1rem;
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
}

.filter-btn {
  background: transparent;
  border: none;
  padding: .6rem .75rem;
  cursor: pointer;
  color: #fff;
}

.filter-menu {
  position: absolute;
  top: 320%;
  left: 78%;
  transform: translateY(-50%);
  background: #fff;
  border: 1px solid #ccc;
  border-radius: .5rem;
  margin-left: .5rem;
  padding: .75rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  gap: .5rem;
  z-index: 10;
}

.filter-menu label {
  display: flex;
  align-items: center;
  gap: .5rem;
  font-size: .9rem;
  color: #333;
}

.filter-menu input[type="checkbox"] {
  transform: scale(1.1);
}

.search-bar .coluna i{
  padding-left: 2rem;
}

input::placeholder{
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
  width: 80%;
  display: grid;
  grid-template-columns: 20% 1fr;
  gap: 1rem;
  overflow-y: auto;
  padding-right: 7rem;
  scrollbar-width: unset;             
  scrollbar-color: #118678 #e0e0e0;  
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
  font-size: 1rem;
  width: 140px;
  background-color: #118678;
  padding: .7rem;
  border-radius: .5rem;
  color: #fff;
  text-align: center;
  position: fixed;
}

.text-fixed1 h2 {
  margin-top: -4rem;
  font-size: 1rem;
  width: 600px;
  background-color: #118678;
  padding: .7rem;
  border-radius: .5rem;
  color: #fff;
  text-align: center;
  position: fixed;
}

.quantity-column ul{
  text-align: center
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
  padding: 0.5rem 1rem;
  border-radius: .5rem;
}

/* Responsive */
@media (max-width: 1366px) {
  .main-content {
    margin-top: 1px;
    margin-right: 5px;
    width: 780px;
    height: 550px;
  }
  .search-bar{
    grid-template-columns: 650px 70px;
    gap: 1rem;
  }
  .students-container {
    grid-template-columns: 100px 540px;
    width: 90%;
  }
  .text-fixed h2{
    width: 80px;
  }
  .text-fixed1 h2{
    width: 515px;
  }
}

@media (max-width: 1024px) {
 .main-content {
    margin-top: 10px;
    margin-left: 10px;
    width: 780px;
    height: 750px;
  }
  .search-bar{
    grid-template-columns: 650px 70px;
    gap: 1rem;
  }
  .students-container {
    grid-template-columns: 100px 530px;
    width: 80%;
    scrollbar-width: unset;  
  }
}
</style>
