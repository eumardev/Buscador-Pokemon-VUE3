<template>
  <div class="tarjeta">
    <slot :pokemon="pokemon"></slot>
    <button @click="toggleColeccion">
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
/* Estilos */
.tarjeta {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin: 20px;
  padding: 5px;
  background: linear-gradient(to bottom, blue, yellow);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  color: black;
  width: 250px; /* Ancho fijo de la tarjeta */
  height: 350px; /* Altura fija de la tarjeta */

}
img {
  width: 160px;
  height: auto;
  margin: 0 auto;
  object-fit: contain; /* Mantiene las proporciones de la imagen */
}
p{
margin: 5px auto;
}
button{
margin: 5px auto;
}
</style>
