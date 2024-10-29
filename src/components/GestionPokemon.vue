<template>
  <div>
    <BuscarPokemon @añadirPokemon="añadirAColeccion" />
    <h2 class="text-center text-blue-800 font-bold text-2xl p-4">Mi Colección</h2>
    <div class="coleccion">
      <TarjetaPokemon
        v-for="(pokemon, index) in coleccion"
        :key="pokemon.id"
        :pokemon="pokemon"
        :estaEnColeccion="true"
        @eliminarPokemon="eliminarDeColeccion"
        >
        <!-- Plantilla personalizada para el contenido del slot -->
        <template #default="{ pokemon }"> 
                  <img :src="pokemon.image" alt="Pokémon" class="h-auto w-40 border-b-2" />
        <h3 class="mt-2 text-blue-900 font-bold text-xl pb-1" >{{ capitalizarNombre(pokemon.name) }}</h3>
        <p><strong class=" text-blue-900 ">Tipos:</strong> {{ pokemon.types }}</p>
        <p class="border-b-2 mb-2">Habilidades: {{ pokemon.abilities }}</p>
        </template>
      </TarjetaPokemon>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import BuscarPokemon from './BuscarPokemon.vue';
import TarjetaPokemon from './TarjetaPokemon.vue';

const coleccion = ref([]);

console.log('Colección inicial:', coleccion.value);

// Función para añadir Pokémon a la colección
const añadirAColeccion = (pokemon) => {
  const exists = coleccion.value.some(p => p.id === pokemon.id);
  if (!exists) {
    coleccion.value.push(pokemon);
    console.log('Pokémon añadido a la colección:', pokemon);
  } else {
    console.log('El Pokémon ya existe en la colección:', pokemon);
  }
};

// Función para eliminar Pokémon de la colección
const eliminarDeColeccion = (pokemonId) => {
  coleccion.value = coleccion.value.filter(p => p.id !== pokemonId);
  console.log('Pokémon eliminado de la colección con ID:', pokemonId);
};
// funcion computada para capitalizar la primera letra del pokemon
const capitalizarNombre = (nombre) => {
  if (!nombre) return '';
  return nombre.charAt(0).toUpperCase() + nombre.slice(1);
};
</script>


<style scoped>
</style>
