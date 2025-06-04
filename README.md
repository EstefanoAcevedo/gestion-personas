# GestionPersonas

Este proyecto se utilizó para aprender y dar un primer vistazo al framework Angular.

## Ejecutar el proyecto

Para lanzar el proyecto, ejecutar el comando "ng s --o", el mismo abrirá una ventana en "http://localhost:4200/" con la aplicación.
Si no se cuenta con los modulos necesarios, ejecutar "npm install" para instalarlos.
También es necesario el uso de Angular Material, ejecutar "ng add @angular/material".

## Dependencias

El proyecto utiliza las siguientes dependencias:

- NgModule: Permite decorar una clase como módulo y demás metadatos.
- BrowserModule: Incorpora la infraestructura necesaria para las aplicaciones de Angular.
- ReactiveFormsModule: Incorpora la infraestructura necesaria para utilizar los formularios reactivos.
- AppRoutingModule: Incorpora la infraestructura necesaria para utilizar el sistema de ruteo de Angular.
- HttpClientModule: Incorpora las funcionalidades necesarias para realizar peticiones HTTP y manejar las respuestas.
- MatDialogModule: Incorpora la infraestructura necesaria para abrir ventanas modales en Angular, pertenece a Angular Material.

## Componentes

Estos son los componentes del proyecto:

- HeaderComponent: es el encabezado de la aplicación, cuenta con una barra de navegación colapsable.
- FooterComponent: es el pie de la aplicación, cuenta con datos acerca del creador de la página.
- PrincipalComponent: es el componente principal, en él se encuentra la tabla que muestra el listado de estudiantes y el formulario para añadir o editar los mismos.
- AcercaComponent: este componente muestra información adicional ficticia acerca de la página.
- PopUpComponent: este componente se utiliza como plantilla en las ventanas modales, posee datos configurables para personalizar el mismo.
