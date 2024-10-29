/** @type {import('tailwindcss').Config} */
export default {
//  el contenido dentro de content puede ser el que está aquí abajo que refiere que se aplique tailwind a todo el proyecto o podría definirse la ruta para el archivo en concreto donde queremos aplicar tailwind
  content: [
    "./index.html", 
    "./src/**/*.{vue,js,ts,jsx,tsx}"],
     //  los nombres de demtro de extend, no son aleatorios, responden a una seleccion de nombres para que tailwind sea consciente de la personalización que estás llevando a cabo, consultar https://tailwindcss.com/docs/theme#extending-the-default-theme
  theme: {
    extend: {
      colors: {
        miAzul: '#00FFFF', // Define un color personalizado
        miAmarillo: '#FFEA00', // Define un color personalizado
      },
    },
  },
  plugins: [],
};
