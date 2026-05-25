# Configuración de Google Sheets para Perla Pli Quiz

Este documento explica cómo configurar la integración con Google Sheets para guardar los datos del quiz.

## Paso 1: Crear la Google Sheet

1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea una nueva hoja de cálculo
3. Nómbrala "Perla Pli - Diagnóstico Capilar"
4. Agrega estos encabezados en la primera fila:
   - A1: `Fecha y Hora`
   - B1: `Email`
   - C1: `Tipo de Pelo`
   - D1: `Necesidades`
   - E1: `Respuestas Completas`

## Paso 2: Crear el Google Apps Script

1. En tu Google Sheet, ve a `Extensiones` > `Apps Script`
2. Borra todo el código existente
3. Pega este código:

```javascript
function doPost(e) {
  try {
    // Abre la hoja de cálculo activa
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parsea los datos recibidos
    const data = JSON.parse(e.postData.contents);
    
    // Agrega una nueva fila con los datos
    sheet.appendRow([
      new Date(),           // Timestamp
      data.email,          // Email
      data.hairType,       // Tipo de pelo
      data.needs,          // Necesidades
      data.answers         // Respuestas completas
    ]);
    
    // Retorna éxito
    return ContentService.createTextOutput(
      JSON.stringify({ success: true })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Retorna error
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  // Opcional: endpoint para probar que funciona
  return ContentService.createTextOutput('Script funcionando correctamente');
}
```

4. Guarda el proyecto (dale un nombre como "Perla Pli Quiz API")

## Paso 3: Desplegar como Web App

1. En el editor de Apps Script, haz clic en `Implementar` > `Nueva implementación`
2. Haz clic en el ícono de engranaje junto a "Selecciona el tipo"
3. Elige `Aplicación web`
4. Configura:
   - **Descripción:** "Perla Pli Quiz Data Collector"
   - **Ejecutar como:** "Yo" (tu cuenta)
   - **Quién tiene acceso:** "Cualquier persona"
5. Haz clic en `Implementar`
6. Autoriza la aplicación (puede que te pida permisos)
7. **IMPORTANTE:** Copia la URL de la aplicación web (algo como `https://script.google.com/macros/s/AKfycby.../exec`)

## Paso 4: Configurar la Variable de Entorno

1. En la raíz del proyecto, crea un archivo `.env` (si no existe)
2. Agrega esta línea con la URL que copiaste:

```bash
VITE_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/TU_URL_AQUI/exec
```

3. Guarda el archivo

## Paso 5: Probar la Integración

1. Reinicia el servidor de desarrollo si está corriendo
2. Completa el quiz y proporciona un email
3. Verifica que los datos aparezcan en tu Google Sheet

## Solución de Problemas

### Los datos no se guardan

- Verifica que la URL en `.env` sea correcta
- Asegúrate de haber autorizado el script en Google
- Revisa la consola del navegador para ver errores
- Los datos se guardan en localStorage como respaldo si falla Google Sheets

### Error de permisos

- Asegúrate de que la aplicación web esté configurada con "Quién tiene acceso: Cualquier persona"
- Verifica que hayas autorizado todos los permisos solicitados

### Ver datos guardados localmente (respaldo)

Abre la consola del navegador y ejecuta:

```javascript
JSON.parse(localStorage.getItem('perlapli_quiz_submissions'))
```

## Exportar Datos

Desde tu Google Sheet puedes:
- Descargar como Excel (Archivo > Descargar > Microsoft Excel)
- Descargar como CSV (Archivo > Descargar > CSV)
- Conectar con otras herramientas usando complementos de Google Sheets

## Seguridad

- El script solo acepta datos POST, no permite lectura de la hoja
- Los datos se envían de forma segura a través de HTTPS
- Solo tú (propietario de la hoja) puedes ver los datos recopilados
