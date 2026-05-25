# Perla Pli - Diagnóstico Capilar Interactivo

Quiz interactivo diseñado para tablets en totems verticales que ayuda a los usuarios a descubrir su tipo de cabello y recibir recomendaciones personalizadas de productos Perla Pli.

## 🎯 Características

- **Quiz interactivo** con 6 preguntas sobre el tipo de cabello
- **Animaciones fluidas** y transiciones entre pantallas
- **Diagnóstico personalizado** basado en las respuestas
- **Recomendaciones de productos** Perla Pli específicas
- **Captura de email** para muestras de regalo
- **Integración con Google Sheets** para almacenar datos
- **Diseño responsivo** optimizado para tablets verticales

## 🚀 Inicio Rápido

### Instalación

```bash
pnpm install
```

### Configurar Google Sheets (Opcional)

1. Sigue las instrucciones en `SETUP_GOOGLE_SHEETS.md`
2. Copia `.env.example` a `.env`
3. Agrega tu URL de Google Apps Script

### Desarrollo

El servidor de desarrollo ya está corriendo. Los cambios se reflejan automáticamente en la vista previa.

## 📱 Flujo del Quiz

1. **Splash Screen** - Animación de frasco de serum con botón de inicio
2. **Transición de Logo** - Splash de líquido con logo Perla Pli
3. **Preguntas (6 pantallas):**
   - ¿Cómo se ve tu cabello el día después de lavarlo?
   - ¿Cómo reacciona tu cabello al agua?
   - ¿Cuál es la forma natural de tu cabello?
   - ¿Tenés decoloración o reflejos?
   - ¿Cuál es el grosor de tu pelo?
   - ¿Cómo está tu cuero cabelludo?
4. **Resumen** - Revisión de todas las respuestas con opción de editar
5. **Resultados** - Tipo de pelo y rutina de productos recomendada
6. **Captura de Email** - Opción de dejar email para muestra gratis
7. **Agradecimiento** - Mensaje final con QR de Instagram

## 🎨 Productos Perla Pli

El quiz recomienda entre 4 productos según las necesidades:

- **Selene** - Shot de Control de Frizz
- **Lumina** - Shot de Brillo
- **Aquaella** - Shot de Nutrición e Hidratación
- **Fortana** - Shot de Fuerza y Resistencia

## 💾 Almacenamiento de Datos

Los datos capturados incluyen:
- Email del usuario
- Tipo de cabello diagnosticado
- Necesidades identificadas
- Todas las respuestas del quiz
- Timestamp

Los datos se guardan en:
1. **Google Sheets** (si está configurado)
2. **localStorage** (como respaldo automático)

## 🛠️ Tecnologías

- React 18
- TypeScript
- Tailwind CSS v4
- Motion (Framer Motion) para animaciones
- Lucide React para iconos
- Vite para build

## 📝 Navegación

- El usuario puede volver atrás en las preguntas usando el botón de retroceso
- Las respuestas seleccionadas se mantienen guardadas
- Después de completar todas las preguntas, puede revisar y editar antes de finalizar

## 🎭 Experiencia de Usuario

- **Feedback visual** al seleccionar cada opción
- **Animaciones de transición** entre preguntas
- **Indicadores de progreso** visibles
- **Confirmación visual** de respuestas seleccionadas
- **Diseño intuitivo** para uso en totem público

## 📞 Soporte

Para preguntas sobre configuración o personalización, consulta los archivos de documentación incluidos.

---

Desarrollado para Perla Pli - Diagnóstico Capilar Personalizado
