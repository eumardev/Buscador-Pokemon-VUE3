<template>
    <header>
      <img alt="Pokémon logo" class="logo" src="../assets/titulo.jpg" width="325" height="125" />
    </header>
  </template>
  
  <script setup>
  // Puedes agregar lógica específica para el header aquí si es necesario
  </script>
  
  <style scoped>
  *{
  border: 1px solid red;
}
  header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    width: 100%;
  height: 125px; /* Ajusta según el tamaño de tu imagen */
  overflow: hidden;
  background: linear-gradient(to bottom, blue, yellow);
  margin: 0 auto;
  }
  </style>
  