<template>
  <div>
    <h3>Mi colección de Pokémon</h3>
    <div v-for="pokemon in coleccion" :key="pokemon.id">
      <TarjetaPokemon
        :pokemon="pokemon"
        :estaEnColeccion="true"
        @eliminarPokemon="manejarEliminarPokemon">
                <!-- esto es lo que mostrará mi slot -->
                <template #default="{ pokemon }"> 
          <img :src="pokemon.image" alt="Pokémon" />
          <h3>{{ pokemon.name }}</h3>
          <p>Tipos: {{ pokemon.types }}</p>
          <p>Habilidades: {{ pokemon.abilities }}</p>
          <button @click="manejarEliminarPokemon(pokemon.id)">
            Eliminar de colección
          </button>
        </template>
      </TarjetaPokemon>
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
