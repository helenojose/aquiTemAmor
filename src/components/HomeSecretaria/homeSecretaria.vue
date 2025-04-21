<template>
  <div>
    <Menu />
    <div class="main-content">
      <h1>Bem-vindo(a) a Secretaria Digital!</h1>
      <div class="search-bar">
        <input type="search" placeholder="Digite o nome da criança..." />
        <i class="bi bi-search"></i>
        <div class="filter">
          <i class="bi bi-funnel"></i>
        </div>
      </div>

      <!-- Lista de alunos matriculados (oculta por padrão) -->
      <div class="students-container" hidden>
        <div class="quantity-column">
          <h2>Quantidade</h2>
          <ul>
            <li v-for="student in students" :key="student.id">
              Nº {{ student.id < 10 ? '0' + student.id : student.id }}
            </li>
          </ul>
        </div>
        <div class="student-column">
          <h2>Aluno</h2>
          <ul>
            <li v-for="student in students" :key="student.id + '-name'">
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
  data() {
    return {
      students: [
        { id: 1, name: 'MARIA BLA BLA BLA' },
        { id: 2, name: 'PEDRO BLA BLA BLA' }
      ]
    };
  },
  mounted() {
    // Exibir bloco quando houver alunos
    if (this.students.length) {
      this.$nextTick(() => {
        this.$el.querySelector('.students-container').removeAttribute('hidden');
      });
    }
  }
};
</script>

<style scoped>
.main-content {
  margin-left: 200px;
  padding: 1rem;
  width: calc(100% - 150px);
}

.search-bar {
  margin-top: 1rem;
  border-radius: .5rem;
  position: relative;
}

.search-bar i {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: #fff;
  pointer-events: none;
}

input::placeholder {
  color: #fff;
}


.search-bar input[type="search"] {
  width: 40%;
  padding: 0.5rem;
  padding-left: 3rem;
  border: 1px solid #ccc;
  border-radius: .7rem 0 0 .7rem;
  border-right: none;
  background-color: #118678;
  color: #fff;
}

.search-bar input[type="search"]:focus {
  border-color: #22C574;
  outline: none;
}

.filter {
  background-color: #118678;
}

.filter i {
  margin-left: 43.3rem;
  color: #fff;
  background-color: #118678;
  padding: .44rem;
  border-radius: 0rem .7rem .7rem 0rem;
}

/* Estilização da lista de alunos */
.students-container {
  margin-top: 1rem;
  width: calc(48.5% - 150px);
  display: grid;
  grid-template-columns: 20% 1fr;
  gap: 1rem;
}

.students-container h2 {
  margin: 0 0 0.5rem;
  font-size: 1rem;
  background-color: #118678;
  padding: .7rem;
  border-radius: .5rem;
  color: #fff;
  text-align: center;
}

/* Colunas de listas com espaçamento entre itens */
.quantity-column ul,
.student-column ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem; /* espaço entre cada li */
}

.quantity-column ul li,
.student-column ul li {
  background: #fff;
  padding: 0.5rem 1rem;
  border-radius: .5rem;
}

.quantity-column {
  text-align: center;
}

.student-column ul {
  padding-left: 1rem;
}
</style>
