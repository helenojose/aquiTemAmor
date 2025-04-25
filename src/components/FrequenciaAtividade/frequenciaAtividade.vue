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
        <div @click="FrequenciaAtividade.togglePopModalidade" style="position: relative; cursor: pointer;" class="rotulo">
          <span class="innerTextRotulo">Filtro Modalidade</span>
          <i class="bi bi-funnel-fill"></i>

          <div v-if="isOpenModalidade" class="filterPopUpModalidade">
            <div class="InsidefilterPopUpModalidade">
              <div @click="FrequenciaAtividade.setFilter('Reforço', turnoFilter)">
                Reforço
              </div>
              <div @click="FrequenciaAtividade.setFilter('Muai Tay', turnoFilter)">
                Muai Tay
              </div>
              <div @click="FrequenciaAtividade.setFilter('Natação', turnoFilter)" >
                Natação
              </div>
              <div @click="FrequenciaAtividade.setFilter('Ballet', turnoFilter)" >
                Ballet
              </div>
              <div @click="FrequenciaAtividade.setFilter('Judô', turnoFilter)" >
                Judô
              </div>
            </div>
          </div>

        </div>
      </div>

      <div class="coluna">
        <div @click="FrequenciaAtividade.togglePopTurno" style="position: relative; cursor: pointer;" class="rotulo">
          <span class="innerTextRotulo">Filtro Turno</span>
          <i class="bi bi-funnel-fill"></i>

          <div v-if="isOpenTurno" class="filterPopUpTurno">
            <div class="InsidefilterPopUpTurno">
              <div @click="FrequenciaAtividade.setFilter(modalidadeFilter,'manhã')">
                Manhã
              </div>
              <div @click="FrequenciaAtividade.setFilter(modalidadeFilter,'tarde')">
                Tarde
              </div>
              <div @click="FrequenciaAtividade.setFilter(modalidadeFilter,'noite')" >
                Noite
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- Iterando sobre os dados de cada aluno -->
    <div class="scrollArea">
      <div v-for="(aluno, index) in alunos" :key="index" class="insideContainer">
        
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
  const { dataAlunos, alunosModificados, isOpenModalidade, modalidadeFilter, alunos, isOpenTurno, turnoFilter } = storeToRefs(FrequenciaAtividade);

</script>

<style scoped>


  .InsidefilterPopUpTurno div:hover{
    background-color: #4e4e4e;
    color: white;
  }

  .InsidefilterPopUpModalidade div:hover{
    background-color: #4e4e4e;
    color: white;
  }

  .InsidefilterPopUpTurno div{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: solid 1px #4e4e4e;
    text-align: center;
    text-wrap: nowrap;
    margin-left: 10px;
    margin-right: 10px;
    cursor: pointer;
  }

  .InsidefilterPopUpModalidade div{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: solid 1px #4e4e4e;
    text-align: center;
    text-wrap: nowrap;
    margin-left: 10px;
    margin-right: 10px;
    cursor: pointer;
  }

  .InsidefilterPopUpTurno{
    border-radius: 10px;
    display: flex;
    justify-content: center;
    font-family: lexend;
    background-color: white;
    color: #4e4e4e;
    gap: 10px;
    flex-direction: column;
    align-items: center;
    padding-top: 15px;
    padding-bottom: 15px;
  }

  .InsidefilterPopUpModalidade{
    border-radius: 10px;
    display: flex;
    justify-content: center;
    font-family: lexend;
    background-color: white;
    color: #4e4e4e;
    gap: 10px;
    flex-direction: column;
    align-items: center;
    padding-top: 15px;
    padding-bottom: 15px;
  }
  .filterPopUpTurno{
    max-height: 350px;
    max-width: 180px;
    position: absolute;
    top: -50px;
    left: 100px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  .filterPopUpModalidade{
    max-height: 350px;
    max-width: 180px;
    position: absolute;
    top: -50px;
    left: 100px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    z-index: 999;
  }

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
