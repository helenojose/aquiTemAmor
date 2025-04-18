<template>
  <div class="container">
    <sidebar-menu />
    <div class="content">
      <div class="ficha-matricula">
        <div class="header">
          <h1>Ficha de Matrícula</h1>
          <div class="acoes">
            <a href="#" class="editar">✎ Editar ficha</a>
            <a href="#" class="excluir">🗑️ Excluir ficha</a>
          </div>
        </div>

        <section class="secao">
          <h2><span class="material-icons">person</span> Dados do Aluno</h2>
          <div class="grid">
            <div><strong>Nome completo:</strong> Nicole Alves da Silva Oliveira</div>
            <div><strong>Idade:</strong> 10 anos</div>
            <div><strong>Sexo:</strong> Feminino</div>
            <div><strong>RG:</strong> 9248345</div>
            <div><strong>CPF:</strong> 12345678912</div>
            <div><strong>Escolaridade:</strong> 4° ano do Ensino Fundamental</div>
            <div><strong>Nacionalidade:</strong> Brasileira</div>
            <div><strong>Emergência:</strong> Jonatas Morais da Silva - (81) 9 9845-6536</div>
          </div>
        </section>

        <section class="secao">
          <h2><span class="material-icons">school</span> Acadêmico</h2>
          <div class="grid">
            <div><strong>Turma:</strong> Infantil</div>
            <div><strong>Curso:</strong> Robótica</div>
            <div><strong>Período:</strong> Jardim</div>
          </div>
        </section>

        <section class="secao">
          <h2><span class="material-icons">location_on</span> Endereço</h2>
          <div class="grid">
            <div><strong>Cidade:</strong> Jaboatão dos Guararapes</div>
            <div><strong>Bairro:</strong> Barro de Jiquiá</div>
            <div><strong>Reside com:</strong> Pai e Mãe</div>
            <div><strong>CEP:</strong> 54342-037</div>
            <div><strong>Rua:</strong> 1 Travessa Sérvél</div>
            <div><strong>Número:</strong> 437</div>
          </div>
        </section>

        <section class="secao">
          <h2><span class="material-icons">person_outline</span> Dados do Responsável</h2>
          <div class="grid">
            <div><strong>Nome:</strong> Fernanda da Luz Ribeiro</div>
            <div><strong>Idade:</strong> 28 anos</div>
            <div><strong>Escolaridade:</strong> Ensino médio completo</div>
            <div><strong>Ocupação:</strong> Autônoma</div>
            <div><strong>Telefone:</strong> (83) 98452-4456</div>
            <div><strong>E-mail:</strong> donafernandaribeiro@gmail.com</div>
          </div>
        </section>

        <section class="secao">
          <h2><span class="material-icons">medical_services</span> Saúde</h2>
          <div class="grid">
            <div><strong>Possui alergia?</strong> Amendoim e Dipirona</div>
            <div><strong>Toma alguma medicação?</strong> Não</div>
            <div><strong>Tem algum problema de saúde?</strong> Não</div>
            <div><strong>Possui alguma deficiência?</strong> Não</div>
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
import SidebarMenu from '../sideBar/menu.vue';

export default {
  name: "FichaMatricula",
  components: {
    SidebarMenu,
  },
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
  gap: 10px 20px;
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
