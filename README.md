## 📝 TodoList App – Evaluación Unidad 2
Aplicación móvil de gestión de tareas desarrollada con **React Native** y **Expo** para la asignatura **Desarrollo de Aplicaciones Móviles**.

El objetivo principal de la app es:

- Gestionar tareas (crear, editar, eliminar, completar) **conectadas a un backend**.
- Autenticación real con **API REST** y persistencia de sesión.
- Clasificar tareas en completadas y no completadas.
- Filtrar tareas por usuario autenticado.
- Utilizar **periféricos del dispositivo móvil**:
- GPS + mapa para ubicación.
- Cámara / galería para asociar imágenes a las tareas.
- **Subir imágenes al servidor** mediante multipart/form-data.
- Integrar **permisos de usuario** de forma correcta y segura.
- Demostrar su funcionamiento real mediante un video.

---

## 🎥 Funcionamiento general de la app

La aplicación fue ejecutada en **dispositivo Android** y/o **emulador**, validando:

- Inicio correcto de la app.
- Flujo completo de gestión de tareas.
- Uso de GPS, mapa y cámara/galería sin errores visibles.
- Manejo adecuado de permisos (ubicación y cámara).


**Video demostrativo del funcionamiento:**

👉 Ver video de la demo (https://www.loom.com/share/71bd289ebaa74a7493abebdb357937e9)

---

## ✨ Funcionalidades principales

- 🔐 **Autenticación real** con backend mediante JWT.
- 💾 **Persistencia de sesión** con AsyncStorage.
- ✅ **Gestión completa de tareas** conectada al backend:
  - Crear, editar, eliminar y marcar como completadas.
  - Todas las operaciones se sincronizan con el servidor.
- 📸 **Captura de imágenes** desde la cámara.
- 🖼️ **Selección de imágenes** desde la galería del dispositivo.
- ☁️ **Subida de imágenes al servidor** y visualización desde URL remota.
- 📍 **Obtención de ubicación actual** mediante GPS.
- 🗺️ **Visualización de la ubicación** en un mapa integrado.
- 👤 **Filtrado automático** de tareas por usuario autenticado.
- 🎨 Interfaz simple, limpia y responsiva, optimizada para Android e iOS.

---

## 🧱 Arquitectura del proyecto

La estructura del proyecto se organiza de forma modular para separar la lógica de negocio, la interfaz y el manejo de estado:

```bash
eva_2_todolist/
├── app/                    # Pantallas principales (login, lista de tareas, agregar, editar)
├── components/             # Componentes reutilizables (cards, inputs, botones, etc.)
├── Context/                # Definiciones de contextos (Auth y Tasks)
├── providers/              # Implementación de proveedores de contexto
├── services/               # Servicios de API (auth.ts, tasks.ts, api.ts)
├── theme/                  # Estilos, paleta de colores, tipografías
└── constants/              # Constantes y configuraciones generales
```

Esta arquitectura permite:

- Separar la lógica de presentación de la lógica de estado y comunicación con API.
- Reutilizar componentes visuales y de interacción.
- Centralizar las llamadas al backend en servicios dedicados.
- Facilitar el mantenimiento y la escalabilidad del código.

---

## 🛠️ Tecnologías utilizadas

- ⚛️ **React Native + Expo**
- 📘 **TypeScript**
- 🔄 **Context API** (estado global para usuario y tareas)
- 🌐 **API REST** (autenticación y CRUD de tareas)
- 💾 **AsyncStorage** (persistencia de token JWT)
- 🔐 **react-native-safe-area-context**
- 🎯 **@expo/vector-icons** (Ionicons)
- 🗺️ **react-native-maps**
- 📷 **expo-image-picker**
- 📍 **expo-location**
- 🖼️ **Subida de imágenes** con FormData

---

## 📋 Requisitos

Para ejecutar el proyecto se requiere:
- Node.js 16 o superior.
- npm o yarn como gestor de paquetes.
- Dispositivo móvil con la app Expo Go instalada, o un emulador Android/iOS configurado.

---

## 🚀 Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/EthanDuranW/eva_2_todolist.git
cd eva_2_todolist
```

2. Instalar las dependencias del proyecto:
```bash
npm install
```

3. Configurar variables de entorno:
```bash
cp .env.example .env
```
Editar el archivo `.env` con la URL del backend si es necesario.

---

## ▶️ Ejecución

1. Iniciar el proyecto con Expo:
```bash
npx expo start
```

2. Ejecutar la aplicación:
- Escanear el código QR con la app Expo Go en el dispositivo móvil, o
- Seleccionar la opción correspondiente en el terminal para abrir en un emulador Android/iOS.

---

## 🔌 Backend API

La aplicación se conecta a un backend REST disponible en:
```
https://basic-hono-api.borisbelmarm.workers.dev
```

Documentación de endpoints: [API Docs](https://basic-hono-api.borisbelmarm.workers.dev/docs)

### Funcionalidades del backend:
- ✅ Autenticación con JWT (login/registro)
- ✅ CRUD completo de tareas
- ✅ Subida de imágenes
- ✅ Filtrado automático por usuario

### 🔑 Credenciales de Acceso:
**Contraseña universal:** `password123`

> **Auto-registro inteligente:**
> - Todos los usuarios usan la contraseña `password123`
> - Si ingresas un email nuevo, se crea automáticamente una cuenta
> - No hay formulario de registro separado, todo ocurre en el login

---

## 👥 Miembros del grupo y roles

### Andrés Corbacho, Ethan Durán, Jesús Flores
- **Desarrollo Frontend**: Pantallas, navegación, componentes UI, estilos.
- **Integración de periféricos**: GPS, mapa, cámara/galería, permisos de ubicación y cámara.
- **Lógica de negocio / Context**: Manejo de estado global, filtros, modelo de datos de tareas.
- **QA / Pruebas y documentación**: Pruebas en emulador/dispositivo, reporte de errores.

### Ignacio Riveros
- **README**: Documentación del proyecto.

---

## 🤖 Uso de IA en el proyecto

La Inteligencia Artificial se utilizó como herramienta de apoyo en las siguientes etapas:

### 1. Investigación y buenas prácticas
Consulta de mejores prácticas para:
- Manejo de permisos de ubicación (expo-location).
- Uso de cámara/galería con expo-image-picker.
- Configuración básica de mapas con react-native-maps.
- Organización del proyecto utilizando Context API.

### 2. Soporte en fragmentos de código
Generación de ejemplos iniciales para:
- Solicitar permisos en tiempo de ejecución.
- Obtener la ubicación actual del usuario.
- Integrar componentes de mapa y selección de imágenes.
- Todo el código sugerido fue:
- Revisado.
- Adaptado a las necesidades del proyecto.
- Probado por el equipo antes de su integración final.

### 3. ### 3. Corrección de errores de diseño
Usamos Github Copilot con el motor de Claude Sonnet 4.5, como apoyo para corregir errores de diseño.

La IA se utilizó como soporte al aprendizaje y a la productividad, pero el diseño, implementación, pruebas y decisiones finales fueron responsabilidad del grupo.

---

## ✅ Pruebas realizadas

Para asegurar el correcto funcionamiento de la aplicación y el uso de los periféricos, se realizaron las siguientes pruebas:

### 1. Pruebas funcionales
- Creación de tareas con distintos textos.
- Edición de tareas existentes.
- Eliminación de tareas.
- Marcado y desmarcado de tareas como completadas.
- Verificación del filtrado correcto de tareas según el usuario autenticado.

### 2. Pruebas de periféricos

#### GPS / Ubicación
- Solicitud del permiso de ubicación en tiempo de ejecución.
- Obtención de la ubicación actual del dispositivo.
- Visualización de la posición en el mapa.
- Comportamiento cuando el usuario acepta el permiso.
- Comportamiento cuando el usuario rechaza el permiso (sin cierres inesperados).

#### Cámara / Galería
- Solicitud de permisos de cámara y acceso a fotos.
- Captura de una imagen con la cámara del dispositivo.
- Selección de una imagen desde la galería.
- Asociación correcta de la imagen seleccionada a la tarea.
- Confirmación de que la app no se cierra ni lanza errores críticos al usar estas funciones.

### 3. Pruebas de estabilidad y experiencia de usuario
- Ejecución en emulador Android y/o dispositivo físico.
- Verificación de que:
- No existan pantallas en blanco inesperadas.
- No se produzcan cierres forzados durante el flujo normal.
- La navegación entre pantallas sea fluida.

---

## 📂 Repositorio

https://github.com/EthanDuranW/eva_2_todolist

- No se incluye la carpeta `node_modules` ni archivos temporales.
- Se recomienda utilizar un archivo `.gitignore` apropiado para proyectos React Native / Expo.