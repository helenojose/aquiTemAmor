<template>
  <h1>{{ tituloPagina }}</h1>
</template>

<script setup>
  import { usePresenceCalendar } from './presenceCalendarStore';
  import { storeToRefs } from 'pinia';

  const PresenceCalendarStore = usePresenceCalendar()
  const { tituloPagina } = storeToRefs(PresenceCalendarStore);

</script>

<style scoped>

</style>