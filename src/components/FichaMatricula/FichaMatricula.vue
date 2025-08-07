<template>
  <div class="container">
    <sidebar-menu />
    <div class="content">
      <div class="ficha-matricula">
        <div class="header">
          <h1>Ficha de Matrícula</h1>
          <div class="acoes" v-if="tipoUsuario === 'adm'">
            <a href="#" class="editar">✎ Editar ficha</a>
            <a href="#" class="excluir">🗑️ Excluir ficha</a>
          </div>
        </div>

        <section class="secao">
          <h2><span class="material-icons">person</span> Dados do Aluno</h2>
          <div class="grid">
            <div><strong>Nome completo:</strong>{{ aluno?.aluno?.nome }}</div>
            <div><strong>Idade:</strong> {{ aluno?.aluno?.idade }}</div>
            <div><strong>Sexo:</strong> {{ aluno?.aluno?.sexo }}</div>
            <div><strong>RG:</strong> {{ aluno?.aluno?.rg }}</div>
            <div><strong>CPF:</strong> {{ aluno?.aluno?.cpf }}</div>
            <div><strong>Escolaridade:</strong> {{ aluno?.aluno?.escolaridade }}</div>
            <div><strong>Nacionalidade:</strong>{{ aluno?.aluno?.nacionalidade }}</div>
            <div><strong>Nome para Emergência:</strong> {{ aluno?.aluno?.emergenciaNome }}</div>
            <div><strong>Telefone de Emergência:</strong> {{ aluno?.aluno?.emergenciaTelefone }}</div>
          </div>
        </section>

        <section class="secao">
          <h2><span class="material-icons">school</span> Acadêmico</h2>
          <div class="grid1" v-for="(curso, index) in aluno?.academico" :key="index">
            <div><strong>Curso:</strong>{{ curso.curso }}</div>
            <div><strong>Turno:</strong>{{ curso.turno }}</div>
          </div>
        </section>

        <section class="secao">
          <h2><span class="material-icons">location_on</span> Endereço</h2>
          <div class="grid">
            <div><strong>Cidade:</strong> {{aluno?.endereco?.cidade}}</div>
            <div><strong>Bairro:</strong>{{ aluno?.endereco?.bairro }}</div>
            <div><strong>Reside com:</strong>{{ aluno?.endereco?.resideCom }}</div>
              <div><strong>CEP:</strong>{{ aluno?.endereco?.cep }}</div>
            <div><strong>Rua:</strong>{{ aluno?.endereco?.rua }}</div>
            <div><strong>Número:</strong>{{ aluno?.endereco?.numero }}</div>
          </div>
        </section>

        <section class="secao">
          <h2><span class="material-icons">person_outline</span> Dados do Responsável</h2>
          <div class="grid" v-for="(responsavel, index) in aluno?.responsavel" :key="index">
            <div><strong>Nome:</strong>{{ responsavel.nome }}</div>
            <div><strong>Daata de nascimento:</strong>{{responsavel.dataNascimento}}</div>
            <div><strong>Escolaridade:</strong>{{ responsavel.escolaridade }}</div>
            <div><strong>Ocupação:</strong>{{ responsavel.ocupacao }}</div>
            <div><strong>Telefone:</strong>{{ responsavel.telefone }}</div>
            <div><strong>E-mail:</strong>{{ responsavel.email }}</div>
          </div>
        </section>

        <section class="secao">
          <h2><span class="material-icons">medical_services</span> Saúde</h2>
          <div class="grid" v-for="(saude, index) in aluno?.saude" :key="index">
            <div><strong>Possui alergia?</strong>{{ saude.alergia }}</div>
            <div><strong>Toma alguma medicação?</strong>{{saude.medicacao}}</div>
            <div><strong>Tem algum problema de saúde?</strong>{{ saude.problemaSaude }}</div>
            <div><strong>Possui alguma deficiência?</strong>{{ saude.deficiencia }}</div>
          </div>
        </section>

        <div class="footer-link">
          <a href="#">Consultar Calendário</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db, auth } from "../../Firebase/FIrebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import SidebarMenu from '../sideBar/menu.vue';

export default {
  name: "FichaMatricula",
  props: ['id'],
  components: {SidebarMenu},
  data() {
    return {
      aluno: null,
      tipoUsuario: null,
    };
  },
  async mounted(){
      onAuthStateChanged(auth, async (user) =>{
        if (!user) 
        return;
      const profRef = doc(db, "professores", user.uid);
      const profSnap = await getDoc(profRef);

      if(profSnap.exists()) {
        this.tipoUsuario = profSnap.data().tipo;
      }

      const alunoRef = doc(db, "alunos", this.id);
      const alunoSnap = await getDoc(alunoRef);

      if(alunoSnap.exists()) {
        this.aluno = alunoSnap.data();
      }
    });
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");

.container {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.content {
  flex: 1;
  overflow-y: auto;
  background-color: #f7f7f7;
  padding: 20px;
}

.ficha-matricula {
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  max-width: 1000px;
  margin: auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.header h1 {
  color: #025e4d;
}

.acoes a {
  margin-left: 15px;
  text-decoration: none;
  font-weight: bold;
  color: #d60000;
}

.secao {
  margin-bottom: 30px;
}

.secao h2 {
  font-size: 1.2rem;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  color: #3c3c3c;
  gap: 8px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 10px;
}

.grid1{
  color: #2d2d2d;
  display: flex;
  gap: 20px;
}

.grid div {
  font-size: 0.95rem;
  color: #2d2d2d;
}

.footer-link {
  text-align: right;
  margin-top: 20px;
}

.footer-link a {
  text-decoration: none;
  color: #008064;
  font-weight: bold;
}
</style>
