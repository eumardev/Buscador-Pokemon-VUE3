<template>
  <div>
    <BuscarPokemon @añadirPokemon="añadirAColeccion" />
    <h2>Mi Colección</h2>
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
          <img :src="pokemon.image" alt="Pokémon" />
          <h3>{{ pokemon.name }}</h3>
          <p>Tipos: {{ pokemon.types }}</p>
          <p>Habilidades: {{ pokemon.abilities }}</p>
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
</script>


<style scoped>
.coleccion {
  display: flex;
  flex-wrap: wrap;
}
h2 {
  font-size: 1.5em;
  /* color: #4CAF50; */
  text-align: center;
}
</style>
