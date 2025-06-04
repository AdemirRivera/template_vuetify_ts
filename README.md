# Plantilla vue 3

Este proyecto es una plantilla preconfigurada para empezar a desarrollar aplicaciones con Vue 3 de manera rápida y eficiente. Incluye una serie de paquetes y configuraciones listos para usar, lo que permite clonarlo, instalar las dependencias y comenzar a programar de inmediato. Entre las configuraciones preestablecidas, se incluyen herramientas como Vuetify, Vue Router, Pinia, y configuraciones optimizadas para el entorno de desarrollo y producción. Ideal para quienes buscan acelerar el proceso de desarrollo sin tener que configurar manualmente cada herramienta.

## Tabla de contenido

- [Plantilla vue 3 - vuetify 3](#plantilla-vue-3)
  - [Tabla de contenido](#tabla-de-contenido)
  - [Requisitos](#requisitos)
  - [Lenguaje y tecnología](#lenguaje-y-tecnología)
  - [Paquetes utilizados](#paquetes-utilizados)
  - [Instalación](#instalación)
  - [Ejecución](#ejecución)

## Requisitos

![Static Badge](https://img.shields.io/badge/Node.js-^22.15-green?logo=node.js)

## Lenguaje y tecnología

Las tecnologías principales son Vue 3 y Typescript, a continuación se declaran los paquetes utilizados.

## Paquetes utilizados

<----- Trabajando en esto ------>


## Instalación

Para instalar el proyecto, se debe clonar el repositorio. 

Luego, se debe instalar las dependencias del proyecto:

```bash
npm install
```

## Ejecución

Copiar el archivo `.env.example` a `.env.local` y configurar las variables de entorno necesarias.

```env
VITE_VUE_APP_API_URL=http://urldelbackend/
```

En caso que el proyecto se quiera ejecutar en modo de desarrollo, se puede hacer con el siguiente comando:

```bash
npm run dev
```

En caso que el proyecto se quiera ejecutar en modo de producción, se puede hacer con el siguiente comando:

```bash
npm run build
```

Después de ejecutar el comando, se generará una carpeta `dist` con los archivos necesarios para desplegar el proyecto.