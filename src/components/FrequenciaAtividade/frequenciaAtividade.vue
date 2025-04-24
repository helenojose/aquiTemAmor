<template>
  <Menu></Menu>
  <div class="container">
    <!-- Apenas um container fixo para os rótulos -->
    <div class="insideContainer">
      <!-- Colunas de rótulos fixos -->
      <div class="coluna">
        <div class="rotulo">
          <span class="innerTextRotulo">Quantidade</span>
        </div>
      </div>

      <div class="coluna">
        <div class="rotulo">
          <span class="innerTextRotulo">Aluno</span>
        </div>
      </div>

      <div class="coluna">
        <div class="rotulo">
          <span class="innerTextRotulo">Presença</span>
        </div>
      </div>

      <div class="coluna">
        <div class="rotulo">
          <span class="innerTextRotulo">Filtro Modalidade</span>
        </div>
      </div>

      <div class="coluna">
        <div class="rotulo">
          <span class="innerTextRotulo">Filtro Turno</span>
        </div>
      </div>
    </div>

    <!-- Iterando sobre os dados de cada aluno -->
    <div class="scrollArea">
      <div v-for="(aluno, index) in dataAlunos" :key="index" class="insideContainer">
        
        <!-- Colunas para cada dado do aluno -->
        <div class="coluna">
          <div class="dataContainer">
            <span>N° {{ (index + 1) < 10 ? '0' + (index + 1) : index + 1 }}</span> 
          </div>
        </div>

        <div class="coluna">
          <div class="dataContainer">
            <span>{{ aluno.nomeAluno }}</span> <!-- Nome do aluno -->
          </div>
        </div>

        <div class="coluna">
          <div style="padding-bottom: 20px;" class="dataContainer">
            <label class="checkbox-container">
              <input
                type="checkbox"
                :checked="aluno.presenca"
                @change="(e) => {
                  const index = alunosModificados.findIndex(
                    (item) => item.nomeAluno === aluno.nomeAluno
                  );

                  if (index >= 0) {
                    alunosModificados[index].presence = e.target.checked;
                  } else {
                    alunosModificados.push({
                      nomeAluno: aluno.nomeAluno,
                      presence: e.target.checked,
                    });
                  }

                  console.log(alunosModificados);
                }"
              />
              <span class="checkmark"></span>
            </label>

          </div>
        </div>

        <div class="coluna">
          <div class="dataContainer">
            <span>{{ aluno.modalidade }}</span> <!-- Modalidade -->
          </div>
        </div>

        <div class="coluna">
          <div class="dataContainer">
            <span>{{ aluno.turno }}</span> <!-- Turno -->
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang='js'>
  import { ref } from 'vue';
  import Menu from '../sideBar/menu.vue';
  import { useFrequenciaAtividade } from './frequenciaAtividadeStore';
import { storeToRefs } from 'pinia';


  const FrequenciaAtividade = useFrequenciaAtividade();
  const { dataAlunos, alunosModificados } = storeToRefs(FrequenciaAtividade);

</script>

<style scoped>
  .tittle{
    margin: 0;
  }

  .container{
    background-color: #E3E3E3;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    overflow-y: auto;
  }

  .insideContainer{
    background-color: #E3E3E3;
    width: 1006px;
    display: grid;
    grid-template-columns: 103px 416px 121px 151px 115px;
    gap: 10px;
    margin-top: px;
  }

  .coluna{
    width: 100%;
    background-color: #E3E3E3;
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .rotulo{
    background-color: #0B6157;
    width: 100%;
    height: 50px;
    margin-top: 15px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #E3E3E3;
    font-family: lexend;
  }

  .innerTextRotulo{
    max-width: 100px;
    text-align: center;
  }

  .dataContainer{
    background-color: white;
    border-radius: 5px;
    margin-top: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    font-family: lexend;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 10px;
    padding-bottom: 10px;
    color:#4e4e4e;
  }

  .scrollArea {
    margin-top: 10px;
    max-height: 600px; /* altura máxima visível */
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .checkbox-container {
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  font-family: Lexend;
  position: relative;
  padding-left: 30px; /* espaço pro quadradinho */
  margin-bottom: 12px;
}

/* Esconde o checkbox original */
.checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

/* O quadradinho personalizado */
.checkmark {
  position: absolute;
  left: 0;
  top: 2px;
  height: 20px;
  width: 20px;
  background-color: #ccc;
  border-radius: 4px;
  transition: background-color 0.3s;
}

/* Quando estiver marcado */
.checkbox-container input:checked ~ .checkmark {
  background-color: #0B6157;
}

/* Adiciona um símbolo de check (✓) */
.checkmark::after {
  content: "";
  position: absolute;
  display: none;
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

/* Mostra o check quando está marcado */
.checkbox-container input:checked ~ .checkmark::after {
  display: block;
}

</style>
