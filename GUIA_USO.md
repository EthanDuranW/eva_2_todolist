# 📱 Guía de Uso - TodoList App

## 🔐 Inicio de Sesión

### Primera vez (Registro automático):
1. Abre la aplicación
2. En la pantalla de login, ingresa:
   - **Email válido** (ej: usuario@ejemplo.com)
   - **Contraseña:** `password123` (o déjala en blanco, se usa automáticamente)
3. Presiona "Ingresar"
4. Si el email no existe, el sistema creará tu cuenta automáticamente

### Usuarios existentes:
1. Ingresa tu email registrado
2. Escribe `password123` (o cualquier texto, se usará `password123` internamente)
3. Presiona "Ingresar"

> **⚠️ Importante:** 
> - Todos los usuarios usan la contraseña: `password123`
> - No necesitas registrarte manualmente, solo ingresar tu email
> - Si el email no existe, se crea automáticamente una cuenta nueva

---

## ✨ Gestión de Tareas

### Crear una nueva tarea:
1. Presiona el botón flotante **+** (esquina inferior derecha)
2. Completa los campos:
   - **Título** (obligatorio)
   - **Descripción** (opcional)
3. Opcionalmente puedes:
   - **Agregar imagen**: Desde galería o tomando una foto
   - **Agregar ubicación**: Presiona "Obtener ubicación" para guardar tu posición actual
4. Presiona "Guardar tarea"

### Editar una tarea:
1. En la lista de tareas, presiona el ícono de **lápiz** (editar)
2. Modifica los campos que desees
3. Presiona "Guardar cambios"

### Marcar como completada/no completada:
- Presiona el botón circular con ✓ o ✗ en cada tarea
- Las tareas completadas se mueven automáticamente a la sección "Completadas"

### Eliminar una tarea:
1. Presiona el ícono de **papelera** en la tarea
2. Confirma la eliminación en el modal que aparece

---

## 📸 Uso de Imágenes

### Desde la galería:
1. Presiona "Elegir de la galería"
2. La app solicitará permisos (acepta)
3. Selecciona una imagen de tu dispositivo
4. Recorta si lo deseas (principalmente en iOS)
5. La imagen se subirá automáticamente al servidor

### Desde la cámara:
1. Presiona "Tomar foto"
2. La app solicitará permisos (acepta)
3. Toma la foto
4. Recorta si lo deseas (principalmente en iOS)
5. La imagen se subirá automáticamente al servidor

> **Android:** Las imágenes ahora se pueden recortar correctamente sin que los botones queden ocultos.

---

## 📍 Uso de Ubicación

1. Presiona "Obtener ubicación"
2. La app solicitará permisos de ubicación (acepta)
3. Espera unos segundos mientras se obtienen las coordenadas GPS
4. Verás un mapa pequeño mostrando tu ubicación actual
5. La ubicación se guardará con la tarea

---

## 🗂️ Organización de Tareas

Las tareas se organizan automáticamente en dos secciones:

### No Completadas
- Tareas pendientes por hacer
- Aparecen con el botón ✗ rojo

### Completadas
- Tareas finalizadas
- Aparecen con el botón ✓ verde

Puedes **expandir o colapsar** cada sección presionando en el encabezado.

---

## 🚪 Cerrar Sesión

1. En la pantalla principal, presiona "Cerrar sesión" (esquina superior derecha)
2. Tu sesión se cerrará y volverás a la pantalla de login
3. Tus tareas quedan guardadas en el servidor

---

## ⚠️ Permisos Requeridos

La aplicación solicitará los siguientes permisos:

- 📷 **Cámara**: Para tomar fotos de tus tareas
- 🖼️ **Galería**: Para seleccionar imágenes existentes
- 📍 **Ubicación**: Para guardar dónde creaste la tarea

> Todos los permisos son opcionales. Puedes usar la app sin otorgarlos, pero perderás esas funcionalidades.

---

## 🔄 Sincronización

- ✅ **Todas las operaciones se sincronizan automáticamente con el servidor**
- ✅ Tus datos están seguros en la nube
- ✅ Puedes acceder a tus tareas desde cualquier dispositivo
- ✅ Las imágenes se almacenan en el servidor

---

## 💡 Consejos

1. **Email válido**: Usa un email real por si implementas recuperación de contraseña en el futuro
2. **Títulos descriptivos**: Facilita encontrar tus tareas rápidamente
3. **Imágenes**: Útiles para tareas visuales (compras, proyectos, etc.)
4. **Ubicación**: Ideal para recordar dónde debías hacer algo
5. **Organiza regularmente**: Marca las tareas completadas para mantener tu lista limpia

---

## ❓ Problemas Comunes

### No puedo iniciar sesión
- Verifica tu conexión a internet
- Asegúrate de usar un formato de email válido
- Revisa que el backend esté disponible

### Las imágenes no se cargan
- Verifica que otorgaste los permisos necesarios
- Comprueba tu conexión a internet
- Las imágenes pueden tardar unos segundos en subirse

### La ubicación no funciona
- Activa el GPS en tu dispositivo
- Otorga permisos de ubicación a la app
- Asegúrate de estar en un lugar con buena señal GPS

---

## 📞 Soporte

Si encuentras algún problema o tienes sugerencias, contacta al equipo de desarrollo.

**¡Disfruta organizando tus tareas!** 🎉
