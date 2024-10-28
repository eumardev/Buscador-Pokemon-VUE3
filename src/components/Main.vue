<script setup>
import { ref } from 'vue';

import GestionPokemon from './GestionPokemon.vue';

const nombrePokemon = ref('');
</script>

<template>
    <main>
      <h1>Buscar Pokémon</h1>
      <GestionPokemon :nombre="nombrePokemon" />
    </main>
  </template>
  

 
<style scoped>
/* *{
  border: 1px solid red;
} */
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* background: linear-gradient(to bottom, blue, yellow); */
  min-height: calc(100vh - 250px); /* Ajusta según el tamaño del header y footer */
  min-width:100%
  /* margin: 0% auto; */
}

.main-content {
  text-align: center; /* Centra el texto en main */
}
</style>
  