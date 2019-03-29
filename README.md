## Team 04-front (MultiTravel)


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

El proyecto es un sitio web donde cualquier persona puede hacer un plan de viaje considerando múltiples destinos y diferentes rutas para cada uno (viajes aéreos, viajes marítimos o viajes terrestres). Además, el sitio web le sugerirá algunos de los mejores alojamientos en la ciudad de destino (Cartagena se ha utilizado como ejemplo y ya se ha publicado en el servidor). En el sitio web puede agregar viajes con múltiples destinos a su plan y confirmar la reserva. Luego vea sus reservaciones activas y viajes terminados en su perfil.

Antes de interactuar con la vista principal, se recomienda ir al botón "Iniciar sesión / Registrarse" para registrarse en el back-end con su información personal. Si intenta crear un viaje sin haber iniciado sesión, será redirigido a la vista de inicio de sesión para completar el proceso de autenticación.


## Deployment

Para ejecutar el proyecto, primero se debe clonar el último release (Entrega3_back) del repositorio repositorio [Team04-back](https://github.com/isis3710-uniandes/Team04-back)

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
