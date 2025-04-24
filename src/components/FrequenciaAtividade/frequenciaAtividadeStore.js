import { defineStore } from "pinia";
import { ref } from "vue";

export const useFrequenciaAtividade = defineStore('FrequenciaAtividade', ()=>{

  const dataAlunos = ref([
    { nomeAluno: "Pedro Sampaio Teodoro", presenca: true, modalidade: "luta", turno: "tarde" },
    { nomeAluno: "Ana Beatriz Silva", presenca: true, modalidade: "luta", turno: "tarde" },
    { nomeAluno: "Lucas Ferreira Mendes", presenca: true, modalidade: "luta", turno: "tarde" },
    { nomeAluno: "Mariana Costa Souza", presenca: true, modalidade: "luta", turno: "tarde" },
    { nomeAluno: "João Paulo Andrade", presenca: true, modalidade: "luta", turno: "tarde" },
    { nomeAluno: "Letícia Ramos Dias", presenca: true, modalidade: "luta", turno: "tarde" },
    { nomeAluno: "Felipe Rocha Lima", presenca: true, modalidade: "luta", turno: "tarde" },
    { nomeAluno: "Camila Martins Oliveira", presenca: true, modalidade: "luta", turno: "tarde" },
    { nomeAluno: "Gabriel Alves Pereira", presenca: true, modalidade: "luta", turno: "tarde" },
    { nomeAluno: "Isabela Nunes Ribeiro", presenca: true, modalidade: "luta", turno: "tarde" },
    { nomeAluno: "Ricardo Tavares Gomes", presenca: true, modalidade: "luta", turno: "tarde" },
    { nomeAluno: "Amanda Lopes Fernandes", presenca: true, modalidade: "luta", turno: "tarde" },
    { nomeAluno: "Bruno Cardoso Leal", presenca: true, modalidade: "luta", turno: "tarde" },
    { nomeAluno: "Juliana Moura Braga", presenca: true, modalidade: "luta", turno: "tarde" },
    { nomeAluno: "Caio Augusto Pires", presenca: true, modalidade: "luta", turno: "tarde" },
    { nomeAluno: "Raquel Menezes Duarte", presenca: true, modalidade: "luta", turno: "tarde" },
    { nomeAluno: "Thiago Neves Rocha", presenca: true, modalidade: "luta", turno: "tarde" },
    { nomeAluno: "Yasmin Figueiredo Lopes", presenca: true, modalidade: "luta", turno: "tarde" },
    { nomeAluno: "Danilo Monteiro Lima", presenca: true, modalidade: "luta", turno: "tarde" },
    { nomeAluno: "Bianca Azevedo Freitas", presenca: true, modalidade: "luta", turno: "tarde" },
    { nomeAluno: "Henrique Dias Barbosa", presenca: true, modalidade: "luta", turno: "tarde" },
    { nomeAluno: "Lorena Martins Cunha", presenca: true, modalidade: "luta", turno: "tarde" },
    { nomeAluno: "Eduardo Almeida Nunes", presenca: true, modalidade: "luta", turno: "tarde" },
    { nomeAluno: "Sofia Ribeiro Melo", presenca: true, modalidade: "luta", turno: "tarde" },
    { nomeAluno: "Vinícius Correia Peixoto", presenca: true, modalidade: "luta", turno: "tarde" },
    { nomeAluno: "Tainá Rocha Monteiro", presenca: true, modalidade: "luta", turno: "tarde" },
    { nomeAluno: "Igor Lima Fernandes", presenca: true, modalidade: "luta", turno: "tarde" },
    { nomeAluno: "Natalia Borges Silva", presenca: true, modalidade: "luta", turno: "tarde" },
    { nomeAluno: "Rafael Mendes Costa", presenca: true, modalidade: "luta", turno: "tarde" },
    { nomeAluno: "Elisa Carvalho Ribeiro", presenca: true, modalidade: "luta", turno: "tarde" }
  ]);

  const alunosModificados = ref([]);

  return {
    dataAlunos,
    alunosModificados
  }
})

