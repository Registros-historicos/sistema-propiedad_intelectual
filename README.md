# Proyecto base. Sistema de gestión de Propiedad Intelectual.

Para ejecutar el proyecto es necesario tener instalados:
- Node.js v18 o superior
- Angular CLI v18.1.4

## Instalación y Ejecución del Proyecto
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/Braulio-Palagot/sistema-propiedad_intelectual.git
   ```
   
2. Navegar al directorio del proyecto:
   ```bash
    cd ruta/del/proyecto/sistema-propiedad_intelectual
    ```
   
3. Instalar las dependencias:
   ```bash
   npm install --legacy-peer-deps
   ```
   
4. Ejecutar el proyecto:
   ```bash
   ng serve
   ```
   
## Consideraciones

Este proyecto se desarrollará con la plantilla Metronic v8.3.0 para Angular. La estructura de carpetas se encuentra organizada de la siguiente manera:

```
src/ => Directorio principal del proyecto.
  ├── app/ => Contiene los componentes, servicios y módulos de la aplicación.
  ├     ├── api/ => Servicios para la comunicación con la API (Actualmente contiene servicios dummy).
  ├     ├── modules/ => Módulos de la aplicación. Aquí se pueden agregar nuevos módulos según sea necesario.
  ├     ├── pages/ => Páginas de la aplicación, cada una con su propio componente. Aquí se pueden agregar nuevas páginas según sea necesario.
  ├     ├── template/ => Aquí se encuentra el grueso del código de la plantilla Metronic.
  ├     ├      ├── kt/ => Contiene componentes basicos de la plantilla Metronic. No se recomienda modificar.
  ├     ├      ├── layout/ => Contiene configuraciones, servicios y componentes relacionados con el layout de la plantilla seleccionada.
  ├     ├      ├── shared/ => Contiene los iconos de KeenThemes. Aquí se agregarán los iconos personalizados que proporcione el equipo Iconografía.
  ├     ├      ├── widgets/ => Contiene los widgets preconstruidos que proporciona la plantilla. Se encuentran separados en widgets relacionados al layout y widgets relacionados al contenido de la aplicación.
  ├── assets/ => Archivos estáticos como imágenes, fuentes, etc.
  ├── environments/ => Configuraciones específicas del entorno (desarrollo, producción).
```

## Lecturas Recomendadas

Se recomienda leer las siguientes documentaciones para familiarizarse con el manejo de la plantilla Metronic de Angular:

- [Internacionalización de textos](https://preview.keenthemes.com/metronic8/angular/docs/i18n)
- [Creación de nuevas páginas](https://preview.keenthemes.com/metronic8/angular/docs/create-a-page)
- [Servicio del Breadcrumb](https://preview.keenthemes.com/metronic8/angular/docs/breadcrumb-service)
- [Utilización de modales](https://preview.keenthemes.com/metronic8/angular/docs/modals)
- [Componentes UI de Angular Material](https://v18.material.angular.dev/components/categories)

Los componentes de Angular Material se utilizarán únicamente en caso de que los componentes proporcionados por la plantilla Metronic no sean suficientes para cumplir con los requerimientos del proyecto. En caso de utilizar componentes de Angular Material, se recomienda comunicarlo al resto del equipo para seguir un patrón de diseño coherente.


# Flujo de Trabajo con Git (Git Workflow)

Dentro del repositorio contamos con 2 ramas principales: `main` y `develop`.

Para mantener un flujo adecuado de trabajo en equipo adecuado con Git, se recomienda seguir el siguiente flujo de trabajo:
1. **Rama `master`**: Esta rama contiene el código en producción. No se debe realizar ningún commit directamente en esta rama.
2. **Rama `develop`**: Esta rama contiene el código en desarrollo. Esta es la rama destino para todas las pull requests.
3. **Ramas de características (feature branches)**: Para cada nueva funcionalidad o corrección de errores, se debe crear una rama a partir de `develop`. El nombre de la rama debe seguir el formato `feature-nombre-de-la-funcionalidad` o `fix-nombre-del-error`.
4. **Pull Requests**: Una vez que se haya completado el trabajo en una rama de características, se debe crear un Pull Request hacia la rama `develop`. Dentro de la descripción del Pull Request, se debe detallar el trabajo realizado y cualquier información relevante para la revisión. Además se debe asignar como Revisor al usuario Braulio-Palagot quien revisará los cambios y los aprobará o solicitará modificaciones en caso de ser necesario.
5. **Revisión y Aprobación**: El revisor revisará el código, realizará comentarios y aprobará el Pull Request si todo está correcto. Una vez aprobado, se procederá a hacer el merge de la rama de características a `develop` y se eliminará la rama de características.
