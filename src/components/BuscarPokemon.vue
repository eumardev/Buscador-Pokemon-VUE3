<template>
  <div>
    <input type="text" v-model="busqueda" placeholder="Buscar Pokémon por nombre o tipo" class="ml-5" />
    <button @click="buscarPokemon" class="p-0 m-2">Buscar</button>
      <!-- Muestra el mensaje cuando hay texto en la variable -->
      <div v-if="mensaje">{{ mensaje }}</div>
    <TarjetaPokemon
      v-if="pokemonSeleccionado"
      :pokemon="pokemonSeleccionado"
      :estaEnColeccion="isInCollection(pokemonSeleccionado.id)"
      @añadirPokemon="añadirAColeccion"
      @eliminarPokemon="eliminarDeColeccion"
      >
      <template #default="{ pokemon }">
        <img :src="pokemon.image" alt="Pokémon" class="h-auto w-40 border-b-2" />
        <h3 class="mt-2 text-blue-900 font-bold text-xl pb-1" >{{ capitalizarNombre(pokemon.name) }}</h3>
        <p><strong class=" text-blue-900 ">Tipos:</strong> {{ pokemon.types }}</p>
        <p class="border-b-2 mb-2">Habilidades: {{ pokemon.abilities }}</p>
      </template>
    </TarjetaPokemon>


    <ul v-if="pokemonsPorTipo.length">
      <li
        v-for="(pokemon, index) in pokemonsPorTipo"
        :key="index"
        @click="mostrarDetallesPokemon(pokemon.name)"
      >
        {{ pokemon.name }}
      </li>
    </ul>

    <div v-if="loading">Cargando...</div>
    <div v-if="error">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import TarjetaPokemon from './TarjetaPokemon.vue';

const emit = defineEmits(['añadirPokemon', 'eliminarPokemon', 'isInCollection']);

const loading = ref(false);
const error = ref(null);
const pokemonSeleccionado = ref(null);
const pokemonsPorTipo = ref([]);
const busqueda = ref('');
const mensaje = ref(null); // Hacemos mensaje reactivo

const buscarPokemon = async () => {
  console.log('Buscando Pokémon...');
  loading.value = true;
  mensaje.value = 'Buscando...'; // Mostramos mensaje de carga
  error.value = null;
  pokemonSeleccionado.value = null;
  pokemonsPorTipo.value = [];

  const urlNombreID = `https://pokeapi.co/api/v2/pokemon/${busqueda.value}`;
  const urlTipo = `https://pokeapi.co/api/v2/type/${busqueda.value}`;

  try {
    const resultado = await Promise.any([
      fetch(urlNombreID).then((res) => {
        if (!res.ok) throw new Error('No se encontró Pokémon por nombre o ID');
        return res.json();
      }),
      fetch(urlTipo).then((res) => {
        if (!res.ok) throw new Error('No se encontró Pokémon por tipo');
        return res.json();
      }),
    ]);
    if (resultado.pokemon) {
      pokemonsPorTipo.value = resultado.pokemon.map((p) => p.pokemon);
      mensaje.value = pokemonsPorTipo.value.length
        ? null
        :  'No se encontraron resultados';
    } else {
      procesarDatosPokemon(resultado);
      setTimeout(() => {
      mensaje.value = "";
  },1000);
    }
  } catch (err) {
    mensaje.value = err.message || 'No se encontraron resultados';
    error.value = err.message || 'Error al buscar Pokémon';
  } finally {
    loading.value = false;
    console.log('Búsqueda finalizada.');
  }
};

const mostrarDetallesPokemon = async (nombre) => {
  console.log('Mostrando detalles para:', nombre);
  const url = `https://pokeapi.co/api/v2/pokemon/${nombre}`;
  loading.value = true;
  mensaje.value = 'Buscando...'; // Mensaje de carga
  setTimeout(() => {
      mensaje.value = "";
  },3000);
  error.value = null;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('No se encontró el Pokémon');
    const data = await response.json();

    pokemonSeleccionado.value = {
      id: data.id,
      name: data.name,
      image: data.sprites.front_default,
      types: data.types.map((type) => type.type.name).join(', '),
      abilities: data.abilities.map((ability) => ability.ability.name).join(', '),
    };

    pokemonsPorTipo.value = [];
    mensaje.value = null; // Limpiamos el mensaje cuando se encuentran los detalles
  } catch (err) {
    mensaje.value = 'No se encontraron resultados';
    error.value = 'No se encontraron resultados';
    mensaje='No se encontraron resultados'
  } finally {
    loading.value = false;
    console.log('Detalles mostrados:', pokemonSeleccionado.value);
  }
};

// Función para verificar si el Pokémon está en la colección
const isInCollection = (pokemonId) => {
  console.log('Verificando si está en la colección:', pokemonId);
  // Se debe implementar una lógica de verificación aquí
  return emit('isInCollection', pokemonId);
};

// Función para añadir Pokémon a la colección
const añadirAColeccion = (pokemon) => {
  emit('añadirPokemon', pokemon);
  console.log('Añadiendo Pokémon a la colección:', pokemon);
};

// Función para eliminar Pokémon de la colección
const eliminarDeColeccion = (pokemonId) => {
  emit('eliminarPokemon', pokemonId);
  console.log('Eliminando Pokémon de la colección con ID:', pokemonId);
};

// Función para procesar los datos del Pokémon
const procesarDatosPokemon = (data) => {
  pokemonSeleccionado.value = {
    id: data.id,
    name: data.name,
    image: data.sprites.front_default,
    types: data.types.map((t) => t.type.name).join(', '),
    abilities: data.abilities.map((a) => a.ability.name).join(', '),
  };
};
// funcion computada para capitalizar la primera letra del pokemon
const capitalizarNombre = (nombre) => {
  if (!nombre) return '';
  return nombre.charAt(0).toUpperCase() + nombre.slice(1);
};
</script>


<style scoped>
/* Estilos para el buscador */
</style>
