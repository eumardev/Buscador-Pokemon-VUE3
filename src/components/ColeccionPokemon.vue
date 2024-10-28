<template>
  <div>
    <h3>Mi colección de Pokémon</h3>
    <div v-for="pokemon in coleccion" :key="pokemon.id">
      <TarjetaPokemon
        :pokemon="pokemon"
        :estaEnColeccion="true"
        @eliminarPokemon="manejarEliminarPokemon"
      />
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import TarjetaPokemon from './TarjetaPokemon.vue';

const props = defineProps({
  coleccion: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['eliminarPokemon']);

const manejarEliminarPokemon = (pokemonId) => {
  emit('eliminarPokemon', pokemonId);
  console.log('Manejando eliminación de Pokémon con ID:', pokemonId);
};
</script>
