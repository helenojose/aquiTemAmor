<template>
    <div class="app-container">
      <SidebarMenu/>
      <!-- Main Content -->
      <main class="main-content">
        <!-- Header -->
        <header class="header">
          <h1>Nova Matrícula</h1>
        </header>
  
        <!-- Formulário -->
        <form class="matricula-form" @submit.prevent="matricular">
          <!-- Dados do Aluno -->
          <section class="form-section">
            <h2><i class="icon-person"></i> Dados pessoais do aluno</h2>
            <div class="form-group">
              <label>Nome completo<span class="required">*</span></label>
              <input v-model="aluno.nome" placeholder="Digite o nome completo da criança" required />
            </div>
            <div class="form-group">
              <label>Data de nascimento</label>
              <input v-model="aluno.dataNascimento" type="date" />
            </div>
            <div class="form-group">
              <label>Sexo</label>
              <select v-model="aluno.sexo">
                <option value="">F</option>
                <option value="M">M</option>
              </select>
            </div>
            <div class="form-group">
              <label>CPF<span class="required">*</span></label>
              <input v-model="aluno.cpf" placeholder="" required />
            </div>
            <div class="form-group">
              <label>RG<span class="required">*</span></label>
              <input v-model="aluno.rg" placeholder="" required />
            </div>
            <div class="form-group">
              <label>Escolaridade</label>
              <select v-model="aluno.escolaridade">
                <option value="">Selecione a escolaridade</option>
                <option value="fundamental">Ensino Fundamental</option>
                <option value="medio">Ensino Médio</option>
              </select>
            </div>
            <div class="form-group">
              <label>Nacionalidade</label>
              <select v-model="aluno.nacionalidade">
                <option value="">Selecione a nacionalidade</option>
                <option value="brasileira">Brasileira</option>
              </select>
            </div>
            <div class="form-group">
              <label>Em caso de Emergência entrar em contato com<span class="required">*</span></label>
              <input v-model="aluno.contatoEmergencia" placeholder="Falar com: (XX) X XXXX-XXXX" required />
            </div>
          </section>
  
          <!-- Acadêmico -->
          <section class="form-section" v-for="(acad, index) in academico" :key="index">
            <h2><i class="icon-book"></i> Acadêmico</h2>
            <div class="form-group">
              <label>Turno<span class="required">*</span></label>
              <select v-model="acad.turno" required>
                <option value="">Selecione o turno</option>
                <option value="manhã">Manhã</option>
                <option value="tarde">Tarde</option>
              </select>
            </div>
            <div class="form-group">
              <label>Curso<span class="required">*</span></label>
              <select v-model="acad.curso" required>
                <option value="">Selecione o curso</option>
                <option value="judô">Judô</option>
                <option value="informatica">Informática</option>
              </select>
            </div>
            <div class="action-buttons">
              <button type="button" class="add-btn" @click="adicionarCurso">
                <i class="icon-add"></i> Adicionar
              </button>
              <button type="button" class="remove-btn" @click="removerCurso(index)" v-if="academico.length > 1">
                <i class="icon-remove"></i> Remover
              </button>
            </div>
          </section>
  
          <!-- Endereço -->
          <section class="form-section">
            <h2><i class="icon-location"></i> Endereço</h2>
            <div class="form-group">
              <label>Cidade<span class="required">*</span></label>
              <input v-model="endereco.cidade" placeholder="Digite a cidade..." required />
            </div>
            <div class="form-group">
              <label>Bairro<span class="required">*</span></label>
              <input v-model="endereco.bairro" placeholder="Digite o bairro..." required />
            </div>
            <div class="form-group">
              <label>Reside com<span class="required">*</span></label>
              <select v-model="endereco.resideCom" required>
                <option value="">Selecione o parente</option>
                <option value="pais">Pais</option>
                <option value="mae">Mãe</option>
                <option value="pai">Pai</option>
              </select>
            </div>
            <div class="form-group">
              <label>CEP</label>
              <input v-model="endereco.cep" placeholder="XXX.XXX-XXX" />
            </div>
            <div class="form-group">
              <label>Rua<span class="required">*</span></label>
              <input v-model="endereco.rua" placeholder="Digite a rua..." required />
            </div>
            <div class="form-group">
              <label>Nº</label>
              <input v-model="endereco.numero" placeholder="" />
            </div>
          </section>
  
          <!-- Dados do Responsável -->
          <section class="form-section" v-for="(resp, index) in responsavel" :key="index">
            <h2><i class="icon-person"></i> Dados do Responsável</h2>
            <div class="form-group">
              <label>Nome<span class="required">*</span></label>
              <input v-model="resp.nome" placeholder="Digite o nome completo..." required />
            </div>
            <div class="form-group">
              <label>Responsável<span class="required">*</span></label>
              <select v-model="resp.tipo" required>
                <option value="">Selecione o responsável</option>
                <option value="mae">Mãe</option>
                <option value="pai">Pai</option>
              </select>
            </div>
            <div class="form-group">
              <label>Data de nascimento</label>
              <input v-model="resp.dataNascimento" type="date" />
            </div>
            <div class="form-group">
              <label>Escolaridade</label>
              <select v-model="resp.escolaridade">
                <option value="">Selecione a escolaridade</option>
                <option value="fundamental">Ensino Fundamental</option>
                <option value="medio">Ensino Médio</option>
              </select>
            </div>
            <div class="form-group">
              <label>Ocupação</label>
              <select v-model="resp.ocupacao">
                <option value="">Selecione a ocupação</option>
                <option value="autonomo">Autônomo</option>
              </select>
            </div>
            <div class="form-group">
              <label>Telefone<span class="required">*</span></label>
              <input v-model="resp.telefone" placeholder="(XX) X XXXX-XXXX" required />
            </div>
            <div class="form-group">
              <label>E-mail<span class="required">*</span></label>
              <input v-model="resp.email" type="email" placeholder="Digite o e-mail..." required />
            </div>
            <div class="action-buttons">
              <button type="button" class="add-btn" @click="adicionarResponsavel">
                <i class="icon-add"></i> Adicionar
              </button>
              <button type="button" class="remove-btn" @click="removerResponsavel(index)" v-if="responsavel.length > 1">
                <i class="icon-remove"></i> Remover
              </button>
            </div>
          </section>
  
          <!-- Saúde -->
          <section class="form-section" v-for="(saudeItem, index) in saude" :key="index">
            <h2><i class="icon-health"></i> Saúde</h2>
            <div class="form-group">
              <label>Possui alergia ?</label>
              <input v-model="saudeItem.alergia" placeholder="Se sim, quais..." />
            </div>
            <div class="form-group">
              <label>Toma alguma medicação ?</label>
              <input v-model="saudeItem.medicacao" placeholder="Se sim, quais..." />
            </div>
            <div class="form-group">
              <label>Tem algum problema de saúde ?</label>
              <input v-model="saudeItem.problemaSaude" placeholder="Se sim, quais..." />
            </div>
            <div class="form-group">
              <label>Possui alguma deficiência ?</label>
              <input v-model="saudeItem.deficiencia" placeholder="Se sim, quais..." />
            </div>
            <div class="action-buttons">
              <button type="button" class="add-btn" @click="adicionarSaude">
                <i class="icon-add"></i> Adicionar
              </button>
              <button type="button" class="remove-btn" @click="removerSaude(index)" v-if="saude.length > 1">
                <i class="icon-remove"></i> Remover
              </button>
            </div>
          </section>
  
          <!-- Botão Matricular -->
          <div class="submit-button">
            <button type="submit" class="matricular-btn">Matricular</button>
          </div>
        </form>
      </main>
    </div>
  </template>
  
  <script>
  import SidebarMenu from '../sideBar/menu.vue';
  export default {
    name: 'CadastroAluno',
    components: {SidebarMenu},
    data() {
      return {
        aluno: {
          nome: '',
          dataNascimento: '',
          sexo: '',
          cpf: '',
          rg: '',
          escolaridade: '',
          nacionalidade: '',
          contatoEmergencia: '',
        },
        academico: [
          { turno: '', curso: '' },
        ],
        endereco: {
          cidade: '',
          bairro: '',
          resideCom: '',
          cep: '',
          rua: '',
          numero: '',
        },
        responsavel: [
          {
            nome: '',
            tipo: '',
            dataNascimento: '',
            escolaridade: '',
            ocupacao: '',
            telefone: '',
            email: '',
          },
        ],
        saude: [
          {
            alergia: '',
            medicacao: '',
            problemaSaude: '',
            deficiencia: '',
          },
        ],
      };
    },
    methods: {
      adicionarCurso() {
        this.academico.push({ turno: '', curso: '' });
      },
      removerCurso(index) {
        this.academico.splice(index, 1);
      },
      adicionarResponsavel() {
        this.responsavel.push({
          nome: '',
          tipo: '',
          dataNascimento: '',
          escolaridade: '',
          ocupacao: '',
          telefone: '',
          email: '',
        });
      },
      removerResponsavel(index) {
        this.responsavel.splice(index, 1);
      },
      adicionarSaude() {
        this.saude.push({
          alergia: '',
          medicacao: '',
          problemaSaude: '',
          deficiencia: '',
        });
      },
      removerSaude(index) {
        this.saude.splice(index, 1);
      },
      matricular() {
        console.log('Dados do formulário:', {
          aluno: this.aluno,
          academico: this.academico,
          endereco: this.endereco,
          responsavel: this.responsavel,
          saude: this.saude,
        });
        // Adicione lógica para enviar os dados (ex.: para uma API)
      },
    },
  };
  </script>
  
  <style scoped>
  /* Importar a fonte Lexend Medium */
  @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@500&display=swap');
  
  /* Geral */
  .app-container {
    display: flex;
    min-height: 100vh;
    background-color: #e5e5e5;
    font-family: 'Lexend', sans-serif;
  }
  
  .logo {
    background-color: #0b8f68;
    padding: 15px;
    border-radius: 8px;
    text-align: center;
  }
  
  .logo-text {
    color: white;
    font-size: 18px;
    font-weight: bold;
  }
  
  .sidebar-nav {
    flex-grow: 1;
    margin-top: 20px;
  }
  
  .nav-item {
    display: flex;
    align-items: center;
    color: #0b8f68;
    font-size: 16px;
    font-weight: bold;
    padding: 10px;
    text-decoration: none;
    margin-bottom: 10px;
  }
  
  .nav-item:hover {
    background-color: #0b8f68;
    color: white;
    border-radius: 5px;
  }
  
  .icon-home,
  .icon-calendar,
  .icon-logout {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 10px;
    background-size: contain;
    background-repeat: no-repeat;
  }
  
  .icon-home {
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>');
  }
  
  .icon-calendar {
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V8h14v12z"/></svg>');
  }
  
  .icon-logout {
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10 9V5l-7 7 7 7v-4h11v-6H10z"/></svg>');
  }
  
  .logout {
    display: flex;
    align-items: center;
    color: #0b8f68;
    font-size: 16px;
    font-weight: bold;
    padding: 10px;
    text-decoration: none;
  }
  
  .logout:hover {
    background-color: #0b8f68;
    color: white;
    border-radius: 5px;
  }
  
  /* Main Content */
  .main-content {
    flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
  max-height: 100vh;
  }
  
  /* Header */
  .header {
    background-color: #0b8f68;
    padding: 15px;
    border-radius: 8px;
    text-align: center;
  }
  
  .header h1 {
    color: white;
    font-size: 24px;
    margin: 0;
    font-family: 'Lexend', sans-serif;
    font-weight: 500;
  }
  
  /* Formulário */
  .matricula-form {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    margin-top: 20px;
  }
  
  .form-section {
    margin-bottom: 30px;
  }
  
  .form-section h2 {
    font-size: 13px;
    color: #0b8f68;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    font-family: 'Lexend', sans-serif;
    font-weight: 500;
  }
  
  .icon-person,
  .icon-book,
  .icon-location,
  .icon-health {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 10px;
    background-size: contain;
    background-repeat: no-repeat;
  }
  
  .icon-person {
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>');
  }
  
  .icon-book {
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/></svg>');
  }
  
  .icon-location {
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>');
  }
  
  .icon-health {
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>');
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    font-size: 10px;
    color: #666;
    margin-bottom: 5px;
    font-family: 'Lexend', sans-serif;
    font-weight: 500;
  }
  
  .required {
    color: #ff5c5c;
    margin-left: 2px;
  }
  
  .form-group input,
  .form-group select {
    width: 100%;
    padding: 8px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    font-size: 14px;
    color: #333;
    font-family: 'Lexend', sans-serif;
    font-weight: 500;
  }
  
  .form-group input::placeholder {
    color: #999;
  }
  
  .action-buttons {
    display: flex;
    gap: 10px;
    margin-top: 10px;
  }
  
  .add-btn,
  .remove-btn {
    display: flex;
    align-items: center;
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    font-size: 12px;
    font-family: 'Lexend', sans-serif;
    font-weight: 500;
    cursor: pointer;
  }
  
  .add-btn {
    background-color: #0b8f68;
    color: white;
  }
  
  .remove-btn {
    background-color: #ff5c5c;
    color: white;
  }
  
  .icon-add,
  .icon-remove {
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-right: 5px;
    background-size: contain;
    background-repeat: no-repeat;
  }
  
  .icon-add {
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>');
  }
  
  .icon-remove {
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>');
  }
  
  .submit-button {
    text-align: center;
  }
  
  .matricular-btn {
    background-color: #0b8f68;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    font-family: 'Lexend', sans-serif;
    font-weight: 500;
    cursor: pointer;
  }
  
  .matricular-btn:hover {
    background-color: #067a52;
  }
  </style>