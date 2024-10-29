<template>
  <div class=" w-64 h-84 p-2 m-2 flex flex-col items-center border-1 border-white rounded  bg-gradient-to-b from-blue-600 to-miAmarillo shadow-xl shadow-gray-500 transition-transform duration-300 hover:-translate-y-1" >
    <slot :pokemon="pokemon"></slot>
    <button @click="toggleColeccion" class="p-1 m-1 bg-miAzul rounded font-semibold text-blue-900">
      {{ estaEnColeccion ? 'Eliminar de colección' : 'Añadir a colección' }}
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  pokemon: {
    type: Object,
    required: true
  },
  estaEnColeccion: {  
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['añadirPokemon', 'eliminarPokemon']);

const toggleColeccion = () => {
  console.log('Botón clicado para', props.estaEnColeccion ? 'eliminar' : 'añadir', 'el Pokémon:', props.pokemon.name);
  if (props.estaEnColeccion !== undefined) {
    if (props.estaEnColeccion) {
      emit('eliminarPokemon', props.pokemon.id);
      console.log('Emitiendo evento para eliminar Pokémon con ID:', props.pokemon.id);
    } else {
      emit('añadirPokemon', props.pokemon);
      console.log('Emitiendo evento para añadir Pokémon:', props.pokemon);
    }
  } else {
    console.error("estaEnColeccion no está definido");
  }
};
</script>


<style scoped>
</style>
