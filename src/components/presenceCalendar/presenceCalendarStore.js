import { defineStore } from "pinia";
import { ref } from "vue";

export const usePresenceCalendar = defineStore('PresenceCalendar', ()=>{

  const tituloPagina = ref("Teste");




  return {
    tituloPagina
  }
})