## Team 04-front (MultiTravel)

### URL Front: https://multitravel-front.herokuapp.com/
### URL Back: https://multitravel-back.herokuapp.com/

[Video Funcionalidad D3](https://uniandes-my.sharepoint.com/personal/ms_osorio_uniandes_edu_co/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fms_osorio_uniandes_edu_co%2FDocuments%2FMultiTravel%20-%20Mozilla%20Firefox%202019-05-19%2012-44-55%2Emp4&parent=%2Fpersonal%2Fms_osorio_uniandes_edu_co%2FDocuments&cid=5e801779-941f-468b-90a7-d8bd157ac75e)

[Video funcionalidad Auth0]()

[Video funcionalidad PWA]()


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

El proyecto es un sitio web donde cualquier persona puede hacer un plan de viaje considerando múltiples destinos y diferentes rutas para cada uno (viajes aéreos, viajes marítimos o viajes terrestres). Además, el sitio web le sugerirá algunos de los mejores alojamientos en la ciudad de destino (Cartagena se ha utilizado como ejemplo y ya se ha publicado en el servidor). En el sitio web puede agregar viajes con múltiples destinos a su plan y confirmar la reserva. Luego vea sus reservaciones activas y viajes terminados en su perfil.

Antes de interactuar con la vista principal, se recomienda ir al botón "Iniciar sesión / Registrarse" para registrarse en el back-end con su información personal. Si intenta crear un viaje sin haber iniciado sesión, será redirigido a la vista de inicio de sesión para completar el proceso de autenticación.

Paleta de colores usada en la realización del proyecto : https://color.adobe.com/es/PaletaColorMultiTravel-color-theme-12436097


## Videos informativos

### Funcionalidades
https://www.youtube.com/watch?v=rXnxWiKfn_I&feature=youtu.be

### 8 Reglas de diseño
https://youtu.be/pcJ4Z9ggqj4

### Norma Tecnica Colombiana
https://youtu.be/xmwL-vJ28-M

### Pruebas de usabilidad
https://www.youtube.com/watch?v=K8k8vqnfxRM&feature=youtu.be

https://www.youtube.com/watch?v=nlXjWBTl0VQ&feature=youtu.be

https://www.youtube.com/watch?v=so-wyXwnemI&feature=youtu.be

En cuanto al soporte para los dos idiomas, la libreria vista en clase cuenta con un fallo en donde no toma el lenguaje que se encuentre seleccionado en el navegador, sino el primer lenguaje que aparece en la lista de lenguajes totales. Esto ocurre para los navegadores Chrome y Opera. Tener en cuenta esto al momento de realizar las pruebas del sporte inglés/español.

## Deployment

Para ejecutar el proyecto, primero se debe clonar el último release (Entrega3_back) del repositorio [Team04-back](https://github.com/isis3710-uniandes/Team04-back)

Una vez clonado, se deben ejecutar los siguientes comandos para poder tener el back-end funcionando:

```bash
npm install
npm run dev-start
```
Si todo sale bien, en la consola debería aparecer el siguiente mensaje:

```bash
app running on port 3001
```
Ahora, se debe clonar este repositorio, y ejecutar los siguientes comandos:

```bash
npm install
npm start
```
Luego de unos segundos, si todo sale bien, se desplegará una ventana del navegador con la vista principal.
