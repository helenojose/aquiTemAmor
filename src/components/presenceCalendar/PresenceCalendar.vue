<template>
    <Menu/>
    <div class="container">
      <div class="internalContainer">
        <nav class="navbar">
          <div class="badge">
            <span class="badgeTittle">Calendário de Presença</span>
          </div>
        </nav>
      </div>
    </div>
</template>

<script setup>
  import { usePresenceCalendar } from './presenceCalendarStore';
  import { storeToRefs } from 'pinia';
  import Menu from '../sideBar/menu.vue';

  const PresenceCalendarStore = usePresenceCalendar()
  const { tituloPagina } = storeToRefs(PresenceCalendarStore);

</script>

<style scoped>
  html, body{
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
  }

  .container{
    margin-left: 100px;
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
  }

  .internalContainer{
    background-color: #E3E3E3;
    height: 700px;
    width: 1400px;
    border-radius: 30px;
  }

  .navbar{
    height: 59px;
    background-color: #0B6157;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
}

.badge{
  background-color: #118678;
  width: 303px;
  height: 59px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.badgeTittle{
  font-size: 22px;
  font-family: lexend;
  color: white;
}
</style>