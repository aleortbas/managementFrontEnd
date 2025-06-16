Instrucciones para ejecutar el Frontend (React + TypeScript + TailwindCSS)

Este proyecto es una aplicación de frontend desarrollada en React con TypeScript, utilizando TailwindCSS para estilos. Se conecta con un backend en Node.js y una base de datos SQL Server.

📁 Estructura general

managementFrontEnd/
│
├── public/                 # Archivos estáticos
├── src/                    # Código fuente del frontend
│
├── tailwind.config.js      # Configuración de TailwindCSS
├── tsconfig.json           # Configuración de TypeScript
├── package.json            # Dependencias del proyecto
├── .gitignore

Pasos para instalar y ejecutar
1. Descargar el proyecto
Opción A: Clonar desde GitHub

git clone https://github.com/tu-usuario/managementFrontEnd.git
cd managementFrontEnd

Opción B: Extraer desde archivo ZIP
* Extrae el .zip donde prefieras.

* Abre una terminal y ubícate en la carpeta del proyecto:
cd managementFrontEnd

2. Instalar dependencias

npm install

Esto instalará todas las dependencias de React, Tailwind, React Router, Redux, etc.

3. Verificar configuración de TailwindCSS
Revisa que en tailwind.config.js esté configurado así:

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // ✅ This includes React + TS files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

Y en index.css y App.css, debe tener:

@tailwind base;
@tailwind components;
@tailwind utilities;

4. Ejecutar en modo desarrollo
npm start

Conexión al backend
Por defecto, el frontend se comunica con el backend en:

http://localhost:5000/api