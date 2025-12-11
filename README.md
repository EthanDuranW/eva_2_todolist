# 📝 TodoList App - Gestión de Tareas Móvil

Aplicación móvil de gestión de tareas desarrollada con **React Native** y **Expo**. Permite crear, editar, eliminar y marcar tareas como completadas, con soporte para imágenes, ubicación GPS y sincronización con backend.

## ✨ Características Principales

- 🔐 **Autenticación segura** con JWT y persistencia de sesión
- ✅ **Gestión completa de tareas** (crear, editar, eliminar, completar)
- 📸 **Captura de fotos** con cámara o selección desde galería
- 🖼️ **Redimensionamiento automático** de imágenes a 1024x768px
- 📍 **Ubicación GPS** con visualización en mapa interactivo
- 🌙 **Modo oscuro automático** según preferencia del sistema
- ☁️ **Sincronización en tiempo real** con backend API
- 📱 **Interfaz adaptativa** para Android e iOS

## 🎥 Video Demostrativo

👉 [Ver demo de la aplicación](https://www.loom.com/share/71bd289ebaa74a7493abebdb357937e9)

## 📋 Requisitos Previos

- **Node.js** 16 o superior
- **npm** o **yarn**
- **Expo Go** instalado en dispositivo móvil (Android/iOS)
- O un **emulador Android/iOS** configurado

---

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone https://github.com/EthanDuranW/eva_2_todolist.git
cd eva_2_todolist
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Iniciar la aplicación
```bash
npx expo start
```

### 4. Ejecutar en dispositivo
- **Dispositivo físico**: Escanea el código QR con la app Expo Go
- **Emulador Android**: Presiona `a` en el terminal
- **Emulador iOS**: Presiona `i` en el terminal (solo macOS)

---

## 📖 Guía de Uso

### 🔐 Inicio de Sesión y Registro

1. **Abrir la aplicación** - Se mostrará la pantalla de login
2. **Registrar una cuenta nueva**:
   - Escribe tu email
   - Escribe tu contraseña
   - Toca "¿No tienes cuenta? Regístrate aquí"
   - Completa el formulario y toca "Registrarme"
3. **Iniciar sesión**:
   - Ingresa tu email y contraseña
   - Toca "Ingresar"
   - La sesión se mantiene activa automáticamente

### ✅ Gestión de Tareas

#### Crear una Nueva Tarea
1. En la pantalla principal, toca el **botón + (azul)** en la esquina inferior derecha
2. **Completar el formulario**:
   - **Título**: Nombre de la tarea (obligatorio)
   - **Descripción**: Detalles adicionales (opcional)
   - **Imagen**: Toca el botón de cámara o galería
   - **Ubicación**: Toca "Obtener ubicación" para agregar tu posición actual
3. Toca **"Guardar tarea"**

#### Agregar una Imagen
- **Desde cámara**:
  1. Toca el icono de cámara
  2. Permite el acceso a la cámara si se solicita
  3. Toma la foto
  4. Ajusta el encuadre si deseas
  5. Confirma la foto
  6. Espera a que se suba al servidor (aparecerá un preview)

- **Desde galería**:
  1. Toca el icono de galería
  2. Permite el acceso a tus fotos si se solicita
  3. Selecciona la imagen deseada
  4. Ajusta el encuadre si deseas
  5. Confirma la selección
  6. Espera a que se suba al servidor

> **Nota**: Las imágenes se redimensionan automáticamente a 1024x768px para optimizar la carga.

#### Agregar Ubicación GPS
1. Toca **"Obtener ubicación"**
2. Permite el acceso a la ubicación si se solicita
3. Espera unos segundos mientras se obtienen las coordenadas
4. Verás un mapa pequeño con tu ubicación actual marcada

#### Ver Tus Tareas
- Las tareas se organizan en dos secciones:
  - **No Completadas**: Tareas pendientes
  - **Completadas**: Tareas finalizadas
- Toca las secciones para expandir/contraer

#### Marcar como Completada
- Toca el **círculo naranja/verde** a la derecha de la tarea
- La tarea se moverá automáticamente a la sección correspondiente

#### Editar una Tarea
1. Toca el **icono de lápiz (naranja)** en la tarea
2. Modifica los campos que desees
3. Toca **"Actualizar tarea"**

#### Eliminar una Tarea
1. Toca el **icono de papelera (rojo)** en la tarea
2. Confirma la eliminación en el modal
3. La tarea se eliminará permanentemente

### 🌙 Modo Oscuro
- El modo oscuro se activa **automáticamente** según la configuración de tu dispositivo
- Para cambiar:
  - **Android**: Ajustes > Pantalla > Tema oscuro
  - **iOS**: Ajustes > Pantalla y brillo > Apariencia

### 🚪 Cerrar Sesión
- Toca **"Cerrar sesión"** en la esquina superior derecha de la pantalla principal
- Serás redirigido a la pantalla de login

---

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React Native** - Framework para aplicaciones móviles
- **Expo** - Plataforma de desarrollo
- **TypeScript** - Lenguaje de programación tipado
- **Context API** - Gestión de estado global
- **AsyncStorage** - Persistencia de sesión local

### Periféricos y Funcionalidades
- **expo-location** - Obtención de ubicación GPS
- **react-native-maps** - Visualización de mapas
- **expo-image-picker** - Acceso a cámara y galería
- **expo-image-manipulator** - Redimensionamiento de imágenes

### Backend API
- **API REST**: `https://todo-list.dobleb.cl`
- **Documentación**: [API Docs](https://todo-list.dobleb.cl/docs)
- **Autenticación**: JWT (JSON Web Tokens)
- **Almacenamiento**: Cloudflare R2 para imágenes

---

## 🧱 Arquitectura del Proyecto

```
eva_2_todolist/
├── app/                    # Pantallas (login, index, add-task, Edit-task)
├── components/             # Componentes reutilizables
│   ├── Header.tsx         # Cabecera con email y logout
│   ├── TaskCard.tsx       # Tarjeta de tarea individual
│   ├── Input.tsx          # Campo de texto personalizado
│   ├── AnimatedButton.tsx # Botón con animaciones
│   └── ...
├── Context/                # Definiciones de contexto
│   ├── AuthContext.tsx    # Contexto de autenticación
│   └── TaskContext.tsx    # Contexto de tareas
├── providers/              # Proveedores de contexto
│   ├── AuthProvider.tsx   # Lógica de autenticación
│   └── TaskProvider.tsx   # Lógica de gestión de tareas
├── services/               # Servicios de API
│   ├── api.ts            # Cliente HTTP base
│   ├── auth.ts           # Servicio de autenticación
│   └── tasks.ts          # Servicio de tareas
├── theme/                  # Estilos y colores
│   └── colors.ts         # Paleta de colores (light/dark)
├── hooks/                  # Hooks personalizados
│   └── use-theme-colors.ts
└── utils/                  # Utilidades
    └── imageHelper.ts    # Redimensionamiento de imágenes
```

---

## ⚠️ Solución de Problemas Comunes

### La imagen no se sube o es muy grande
- **Solución**: Las imágenes se redimensionan automáticamente a 1024x768px. Si aún falla, intenta con una imagen más pequeña o toma una nueva foto.

### No se obtiene la ubicación GPS
- **Solución**: 
  1. Verifica que los permisos de ubicación estén activados
  2. Asegúrate de tener GPS activado en tu dispositivo
  3. Si estás en emulador, configura una ubicación ficticia

### La app se cierra al abrir la cámara
- **Solución**: Verifica que hayas otorgado permisos de cámara a Expo Go en la configuración de tu dispositivo

### No puedo iniciar sesión
- **Solución**: 
  1. Verifica tu conexión a internet
  2. Asegúrate de escribir correctamente tu email y contraseña
  3. Si es una cuenta nueva, regístrate primero

### El modo oscuro no cambia
- **Solución**: El modo oscuro se sincroniza con la configuración del sistema. Cambia el tema de tu dispositivo en Ajustes > Pantalla.

---

## 👥 Equipo de Desarrollo

**Desarrolladores**:
- Andrés Corbacho
- Ethan Durán
- Jesús Flores
- Ignacio Riveros

**Institución**: Instituto San Sebastián  
**Asignatura**: Desarrollo de Aplicaciones Móviles I  
**Evaluación**: Unidad 2 - 3° Trimestre

---

## 📄 Licencia

Este proyecto es de uso académico para la asignatura de Desarrollo de Aplicaciones Móviles I.

---

## 📧 Contacto

Para consultas o reportes de bugs, contacta al equipo a través del repositorio de GitHub:

📂 [https://github.com/EthanDuranW/eva_2_todolist](https://github.com/EthanDuranW/eva_2_todolist)