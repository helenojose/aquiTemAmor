<template>
  <div class="app-container">
    <SidebarMenu/>
    <main class="main-content">
      <header class="header">
        <h1>Nova Matrícula</h1>
        <hr class="header-divider" />
      </header>

      <form class="matricula-form" @submit.prevent="matricular">
        <!-- Dados do Aluno -->
        <section class="form-section dados-aluno">
          <h2><i class="bi bi-person"></i> Dados pessoais do aluno</h2>
          <div class="form-group nome-full">
            <label>Nome completo<span class="required">*</span></label>
            <input v-model="aluno.nome" placeholder="Digite o nome completo da criança..." required />
          </div>
          <div class="form-group">
            <label>Data de nascimento</label>
            <input v-model="aluno.dataNascimento" type="date" />
          </div>
          <div class="form-group">
            <label>Sexo</label>
            <select v-model="aluno.sexo">
              <option value="">Feminino</option>
              <option value="M">Masculino</option>
            </select>
          </div>
          <div class="form-group">
            <label >CPF<span class="required">*</span></label>
            <input v-model="aluno.cpf" required placeholder="xxx.xxx.xxx-xx" />
          </div>
          <div class="form-group">
            <label>RG<span class="required">*</span></label>
            <input v-model="aluno.rg" required placeholder="x.xxx.xxx"/>
          </div>
          <div class="form-group escolaridade-full">
            <label>Escolaridade</label>
            <select v-model="aluno.escolaridade">
              <option value="">Selecione</option>
              <option value="fundamental">Ensino Fundamental</option>
              <option value="medio">Ensino Médio</option>
            </select>
          </div>
          <div class="form-group nacionalidade-full">
            <label>Nacionalidade</label>
            <select v-model="aluno.nacionalidade">
              <option value="">Selecione</option>
              <option value="brasileira">Brasileira</option>
            </select>
          </div>
          <div class="form-group emergencia-full">
            <label>Em caso de emergência entrar em contato com<span class="required">*</span></label>
            <div class="emergencia-inputs">
              <input v-model="aluno.emergenciaNome" placeholder="Nome..." required />
              <input v-model="aluno.emergenciaTelefone" placeholder="Telefone..." required />
            </div>
          </div>
        </section>

        <!-- Acadêmico -->
        <section class="form-section academico-row" v-for="(acad, index) in academico" :key="index">
          <div class="academico-header">
              <h2><i class="bi bi-book"></i> Acadêmico</h2>
              <div class="action-buttons">
                <button type="button" class="icon-btn add" @click="adicionarCurso"><i class="bi bi-plus-circle"></i></button>
                <button type="button" class="icon-btn remove" @click="removerCurso(index)" v-if="academico.length>1"><i class="bi bi-dash-circle"></i></button>
              </div>
          </div>
          
          <div class="form-group">
            <label>Turno<span class="required">*</span></label>
            <select v-model="acad.turno" required>
              <option value="">Selecione</option>
              <option>Manhã</option>
              <option>Tarde</option>
              <option>Noite</option>
            </select>
          </div>
          <div class="form-group">
            <label>Curso<span class="required">*</span></label>
            <select v-model="acad.curso" required>
              <option value="">Selecione</option>
              <option>Judô</option>
              <option>Ballet</option>
              <option>Natação</option>
              <option>Muai Tay</option>
            </select>
          </div>
          
        </section>

        <!-- Endereço -->
        <section class="form-section endereco-row">
          <h2><i class="bi bi-geo-alt"></i> Endereço</h2>
          <div class="form-group"><label>Cidade<span class="required">*</span></label><input v-model="endereco.cidade" placeholder="Digite a cidade..." required/></div>
          <div class="form-group"><label>Bairro<span class="required">*</span></label><input v-model="endereco.bairro" placeholder="Digite o bairro..." required/></div>
          <div class="form-group"><label>Reside com<span class="required">*</span></label><select v-model="endereco.resideCom" required><option value="">Selecione</option><option>Pais</option><option>Mãe</option><option>Pai</option></select></div>
          <div class="form-group"><label>CEP</label><input v-model="endereco.cep" placeholder="XXX.XXX-XXX"/></div>
          <div class="form-group"><label>Rua<span class="required">*</span></label><input v-model="endereco.rua" placeholder="Digite a rua..." required/></div>
          <div class="form-group"><label>Nº</label><input v-model="endereco.numero"/></div>
        </section>

        <!-- Responsável -->
        <section class="form-section responsavel-row">
          <div class="responsavel-header">
            <h2><i class="bi bi-person-badge"></i> Dados do Responsável</h2>
            <div class="action-buttons responsavel-actions">
              <button type="button" class="icon-btn add" @click="adicionarResponsavel"><i class="bi bi-plus-circle"></i></button>
              <button type="button" class="icon-btn remove" @click="removerResponsavel(responsavel.length-1)" v-if="responsavel.length>1"><i class="bi bi-dash-circle"></i></button>
            </div>
          </div>
          <div class="responsavel-grid" v-for="(resp, idx) in responsavel" :key="idx">
            <!-- primeira linha: Nome, Tipo, Data, Escolaridade -->
            <div class="form-group"><label>Nome<span class="required">*</span></label><input v-model="resp.nome" placeholder="Nome completo..." required/></div>
            <div class="form-group"><label>Tipo<span class="required">*</span></label><select v-model="resp.tipo" required><option value="">Selecione</option><option>Mãe</option><option>Pai</option></select></div>
            <div class="form-group"><label>Data de nascimento</label><input v-model="resp.dataNascimento" type="date"/></div>
            <div class="form-group"><label>Escolaridade</label><select v-model="resp.escolaridade"><option value="">Selecione</option><option>Fundamental</option><option>Médio</option></select></div>
            <!-- segunda linha: Ocupação, Telefone, E-mail -->
            <div class="form-group"><label>Ocupação</label><select v-model="resp.ocupacao"><option value="">Selecione</option><option>Autônomo</option></select></div>
            <div class="form-group"><label>Telefone<span class="required">*</span></label><input v-model="resp.telefone" placeholder="(XX) XXXX-XXXX" required/></div>
            <div class="form-group"><label>E-mail<span class="required">*</span></label><input v-model="resp.email" type="email" placeholder="Digite o e-mail..." required/></div>
          </div>
        </section>

        <!-- Saúde -->
        <section class="form-section saude-row" v-for="(s, sIdx) in saude" :key="sIdx">
          <div class="saude-header">
            <h2><i class="bi bi-heart-pulse"></i> Saúde</h2>
            <div class="action-buttons">
            <button type="button" class="icon-btn add" @click="adicionarSaude"><i class="bi bi-plus-circle"></i></button>
            <button type="button" class="icon-btn remove" @click="removerSaude(sIdx)" v-if="saude.length>1"><i class="bi bi-dash-circle"></i></button>
          </div>
          </div>
          
          <div class="saude-grid" v-for="(resp, idx) in saude" :key="idx">
            <div class="form-group"><label>Alergia?</label><input v-model="s.alergia" placeholder="Quais?"/></div>
            <div class="form-group"><label>Medicação?</label><input v-model="s.medicacao" placeholder="Quais?"/></div>
            <div class="form-group"><label>Problemas de saúde?</label><input v-model="s.problemaSaude" placeholder="Quais?"/></div>
            <div class="form-group"><label>Deficiência?</label><input v-model="s.deficiencia" placeholder="Quais?"/></div>
          </div>
        </section>

        <div class="submit-button">
          <button type="submit" class="matricular-btn">Matricular</button>
        </div>
      </form>
    </main>
  </div>
</template>

<script>
import SidebarMenu from '../sideBar/menu.vue';
import { db } from '../../Firebase/FIrebase'; // ajuste esse path conforme onde está seu firebase.js
import { collection, addDoc } from 'firebase/firestore';
import { useRouter } from 'vue-router';
export default {
  name: 'CadastroAluno',
  components: { SidebarMenu },
  data() {
    return {
      aluno: { nome:'', dataNascimento:'', sexo:'', cpf:'', rg:'', escolaridade:'', nacionalidade:'', emergenciaNome:'', emergenciaTelefone:'' },
      academico:[{turno:'',curso:''}],
      endereco:{cidade:'',bairro:'',resideCom:'',cep:'',rua:'',numero:''},
      responsavel:[{nome:'',tipo:'',dataNascimento:'',escolaridade:'',ocupacao:'',telefone:'',email:''}],
      saude:[{alergia:'',medicacao:'',problemaSaude:'',deficiencia:''}]
    };
  },
  methods:{
    adicionarCurso(){this.academico.push({turno:'',curso:''});},
    removerCurso(i){this.academico.splice(i,1);},
    adicionarResponsavel(){this.responsavel.push({nome:'',tipo:'',dataNascimento:'',escolaridade:'',ocupacao:'',telefone:'',email:''});},
    removerResponsavel(i){this.responsavel.splice(i,1);},
    adicionarSaude(){this.saude.push({alergia:'',medicacao:'',problemaSaude:'',deficiencia:''});},
    removerSaude(i){this.saude.splice(i,1);},
    matricular(){ console.log({aluno:this.aluno,academico:this.academico,endereco:this.endereco,responsavel:this.responsavel,saude:this.saude}); },

    async matricular(){
      try {
        const alunoData = {
          aluno: this.aluno,
          academico: this.academico,
          endereco: this.endereco,
          responsavel: this.responsavel,
          saude: this.saude,
          criadoEm: new Date()
        };

        await addDoc(collection(db, 'alunos'), alunoData);

        this.$router.push("/");
      } catch (error){
        console.error('Erro ao salvar matrícula: ', error);
        alert('Erro ao salvar. Tente novamente.');
        }
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lexend:wght@500&display=swap');

.app-container {
  display: flex;
  min-height: 100vh;
  background: #f0f0f0;
  font-family: 'Lexend', sans-serif;
}

.main-content {
  flex: 1;
  padding: 24px;
}

.header {
  text-align: center;
}

.header h1 {
  color: #005444;
  font-size: 24px;
  margin: 0;
}

.header-divider {
  margin: 8px auto 24px;
  border: 0;
  height: 1px;
  width: 240px;
  background: #ccc;
}

.matricula-form {
  background: transparent;
  padding: 16px;

  margin: 0 auto;
  max-width: 980px;
  max-height: calc(100vh - 160px);
  overflow-y: auto;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.matricula-form input,
.matricula-form select{
  border: 5px solid rgba(0, 0, 0);
  box-shadow: 0 4px 2px rgba(0, 0, 0, .3);
}

/* Dados do Aluno */
.form-section.dados-aluno {
  display: grid;
  grid-template-columns: 260px 140px 110px 200px 200px; /* inputs maiores */
  gap: 16px;
  margin-bottom: 24px;
}

.nome-full { grid-column: 1 / 2; }
.escolaridade-full { grid-column: 1 / 3; }
.nacionalidade-full { grid-column: 3 / 4; }
.emergencia-full { grid-column: 4 / 6; }

.emergencia-inputs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

/* Acadêmico */
.form-section.academico-row {
  display: grid;
  width: 250px;
  gap: 16px;
  align-items: end;
  margin-bottom: 24px;
}

/* Endereço */
.form-section.endereco-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.form-group span{
  color: red;
}


/* Responsável */
.form-section.responsavel-row {
  margin-bottom: 24px;
}

.responsavel-header {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 8px;
}

.academico-header{
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 8px;
}

.saude-header{
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 10px;
}

.saude-grid{
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* quatro colunas na primeira linha */
  gap: 14px;
  margin-bottom: 20px;
}

.responsavel-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* quatro colunas na primeira linha */
  gap: 14px;
  margin-bottom: 16px;
}

/* ocupação, telefone e e-mail ficam na segunda linha */
.responsavel-grid .ocupacao-grupo,
.responsavel-grid .telefone-grupo,
.responsavel-grid .email-grupo {
  grid-column: span 2;
}

/* Saúde */


h2 {
  grid-column: 1 / -1;
  font-size: 15px;
  color: #005444;
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

h2 i {
  margin-right: 8px;
  font-size: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-size: 14px;
  color: rgba(0,0,0,0.6);
  margin-bottom: 4px;
}

.form-group input,
.form-group select {
  padding: 8px;
  font-size: 14px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.icon-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 20px;
  padding: 0;
}

.icon-btn.add {
  color: #0b8f68;
}

.icon-btn.remove {
  color: #ff5c5c;
}

.submit-button {
  text-align: center;
}

.matricular-btn {
  background: #005444;
  color: white;
  padding: 10px 36px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
}

.matricular-btn:hover {
  background: #024f42;
}
</style>
