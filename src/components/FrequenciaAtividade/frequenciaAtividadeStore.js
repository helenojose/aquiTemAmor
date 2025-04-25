import { defineStore } from "pinia";
import { ref } from "vue";

export const useFrequenciaAtividade = defineStore('FrequenciaAtividade', ()=>{

  const dataAlunos = ref([
    { nomeAluno: "Pedro Sampaio Teodoro", presenca: true, modalidade: "Judô", turno: "noite" },
    { nomeAluno: "Ana Beatriz Silva", presenca: true, modalidade: "Reforço", turno: "manhã" },
    { nomeAluno: "Lucas Ferreira Mendes", presenca: true, modalidade: "Muai Tay", turno: "tarde" },
    { nomeAluno: "Mariana Costa Souza", presenca: true, modalidade: "Ballet", turno: "manhã" },
    { nomeAluno: "João Paulo Andrade", presenca: true, modalidade: "Natação", turno: "tarde" },
    { nomeAluno: "Letícia Ramos Dias", presenca: true, modalidade: "Reforço", turno: "noite" },
    { nomeAluno: "Felipe Rocha Lima", presenca: true, modalidade: "Judô", turno: "manhã" },
    { nomeAluno: "Camila Martins Oliveira", presenca: true, modalidade: "Ballet", turno: "noite" },
    { nomeAluno: "Gabriel Alves Pereira", presenca: true, modalidade: "Natação", turno: "tarde" },
    { nomeAluno: "Isabela Nunes Ribeiro", presenca: true, modalidade: "Muai Tay", turno: "manhã" },
    { nomeAluno: "Ricardo Tavares Gomes", presenca: true, modalidade: "Judô", turno: "tarde" },
    { nomeAluno: "Amanda Lopes Fernandes", presenca: true, modalidade: "Reforço", turno: "noite" },
    { nomeAluno: "Bruno Cardoso Leal", presenca: true, modalidade: "Natação", turno: "manhã" },
    { nomeAluno: "Juliana Moura Braga", presenca: true, modalidade: "Ballet", turno: "tarde" },
    { nomeAluno: "Caio Augusto Pires", presenca: true, modalidade: "Muai Tay", turno: "manhã" },
    { nomeAluno: "Raquel Menezes Duarte", presenca: true, modalidade: "Reforço", turno: "tarde" },
    { nomeAluno: "Thiago Neves Rocha", presenca: true, modalidade: "Natação", turno: "noite" },
    { nomeAluno: "Yasmin Figueiredo Lopes", presenca: true, modalidade: "Ballet", turno: "manhã" },
    { nomeAluno: "Danilo Monteiro Lima", presenca: true, modalidade: "Muai Tay", turno: "noite" },
    { nomeAluno: "Bianca Azevedo Freitas", presenca: true, modalidade: "Judô", turno: "tarde" },
    { nomeAluno: "Henrique Dias Barbosa", presenca: true, modalidade: "Reforço", turno: "manhã" },
    { nomeAluno: "Lorena Martins Cunha", presenca: true, modalidade: "Natação", turno: "noite" },
    { nomeAluno: "Eduardo Almeida Nunes", presenca: true, modalidade: "Judô", turno: "manhã" },
    { nomeAluno: "Sofia Ribeiro Melo", presenca: true, modalidade: "Muai Tay", turno: "noite" },
    { nomeAluno: "Vinícius Correia Peixoto", presenca: true, modalidade: "Ballet", turno: "tarde" },
    { nomeAluno: "Tainá Rocha Monteiro", presenca: true, modalidade: "Reforço", turno: "tarde" },
    { nomeAluno: "Igor Lima Fernandes", presenca: true, modalidade: "Natação", turno: "manhã" },
    { nomeAluno: "Natalia Borges Silva", presenca: true, modalidade: "Muai Tay", turno: "noite" },
    { nomeAluno: "Rafael Mendes Costa", presenca: true, modalidade: "Ballet", turno: "manhã" },
    { nomeAluno: "Elisa Carvalho Ribeiro", presenca: true, modalidade: "Judô", turno: "tarde" }
  ]);
  const alunos = ref(dataAlunos.value)

  const alunosModificados = ref([]);
  const isOpenModalidade = ref(false);
  const isOpenTurno = ref(false);
  const modalidadeFilter = ref("Reforço");
  const turnoFilter = ref("manhã");

  const togglePopModalidade = ()=>{
    isOpenModalidade.value = !isOpenModalidade.value
  }

  const togglePopTurno = ()=>{
    isOpenTurno.value = !isOpenTurno.value
  }

  const setFilter = (modalidade, turno)=>{

    if(modalidadeFilter != "" && turnoFilter != ""){
      modalidadeFilter.value = modalidade
      turnoFilter.value = turno

      alunos.value = dataAlunos.value.filter(aluno => aluno.modalidade == modalidadeFilter.value && aluno.turno == turnoFilter.value )
    }

  }

  return {
    dataAlunos,
    alunosModificados,
    isOpenModalidade,
    togglePopModalidade,
    modalidadeFilter,
    setFilter,
    alunos,
    isOpenTurno,
    togglePopTurno,
    turnoFilter
  }
})

