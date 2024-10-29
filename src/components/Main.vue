<script setup>
import { ref } from 'vue';

import GestionPokemon from './GestionPokemon.vue';

const nombrePokemon = ref('');
</script>

<template>
    <main class="flex flex-col items-center content-center min-w-full">
      <h1 class="text-center text-blue-800 font-bold text-2xl p-4">Busca tu Pokémon</h1>
      <GestionPokemon :nombre="nombrePokemon" />
    </main>
  </template>
  

 
<style scoped>
</style>
  