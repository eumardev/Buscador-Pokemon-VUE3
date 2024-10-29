<template>
  <div>
    <h3 class="text-center text-blue-800 font-bold text-2xl p-4">Mi colección de Pokémon</h3>
    <div v-for="pokemon in coleccion" :key="pokemon.id">
      <TarjetaPokemon
        :pokemon="pokemon"
        :estaEnColeccion="true"
        @eliminarPokemon="manejarEliminarPokemon">
                <!-- esto es lo que mostrará mi slot -->
                <template #default="{ pokemon }"> 
                  <img :src="pokemon.image" alt="Pokémon" class="h-auto w-40 border-b-2" />
        <h3 class="mt-2 text-blue-900 font-bold text-xl pb-1" >{{ capitalizarNombre(pokemon.name) }}</h3>
        <p><strong class=" text-blue-900 ">Tipos:</strong> {{ pokemon.types }}</p>
        <p class="border-b-2 mb-2">Habilidades: {{ pokemon.abilities }}</p>
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
// funcion computada para capitalizar la primera letra del pokemon
const capitalizarNombre = (nombre) => {
  if (!nombre) return '';
  return nombre.charAt(0).toUpperCase() + nombre.slice(1);
};
</script>
