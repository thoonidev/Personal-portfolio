# Personal Portfolio

Portafolio personal de **thoonidev**, enfocado en desarrollo backend con Java y Spring Boot. Presenta proyectos, tecnologías y exploraciones de programación mediante una interfaz desarrollada con React.

## Características

- Presentación personal y descarga del CV.
- Tecnologías organizadas por especialidad.
- Proyectos destacados y adicionales con capturas, detalles y enlaces a GitHub.
- Videos de YouTube que se cargan al reproducirlos.
- Diseño adaptable, navegación por secciones y animaciones al desplazarse.
- Formulario de contacto conectado a una API, con validación, estados de envío y manejo de errores.
- Contacto alternativo por correo y LinkedIn.

## Tecnologías

React 19 · Vite 6 · Tailwind CSS 4 · Heroicons · JavaScript · CSS · ESLint

## Instalación y ejecución

Requiere **Node.js compatible con Vite 6** y **npm**.

```bash
git clone https://github.com/thoonidev/Personal-portfolio.git
cd Personal-portfolio
npm ci
npm run dev
```

Abre la dirección indicada en la terminal, normalmente `http://localhost:5173`. El portafolio puede visualizarse sin backend; el envío del formulario requiere la [API de contacto](https://github.com/thoonidev/Personal-portfolio-api) configurada y en ejecución.

## Configuración del contacto

Copia `.env.example` como `.env.local`.

En desarrollo puedes dejar `VITE_API_BASE_URL` vacío: Vite redirige las solicitudes `/api` a `http://127.0.0.1:8080`, según `vite.config.js`.

Para usar un backend remoto, configura su URL pública sin añadir `/api/contact`:

```env
VITE_API_BASE_URL=https://tu-api.example.com
```

El frontend añade `/api/contact` y envía `name`, `email`, `subject`, `message` y el campo señuelo `website`, que debe quedar vacío. El backend debe habilitar el envío y permitir el origen del frontend mediante `CONTACT_ALLOWED_ORIGINS`.

Configura las credenciales de Resend exclusivamente en el backend; las variables `VITE_*` son públicas. Reinicia el servidor local después de cambiar las variables de entorno.

## Personalización

| Archivo o carpeta | Contenido |
| --- | --- |
| `src/data.js` | Proyectos, tecnologías y videos. |
| `src/components/Hero.jsx` y `About.jsx` | Presentación personal y CV. |
| `src/components/Contact.jsx` | Información de contacto y formulario. |
| `src/services/contact.js` | Conexión con la API y manejo de errores. |
| `src/index.css` | Estilos generales. |
| `public/` | CV, capturas, iconos y otros recursos. |

## Comandos

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia el servidor de desarrollo. |
| `npm run build` | Genera la versión de producción en `dist/`. |
| `npm run preview` | Permite revisar la compilación localmente. |
| `npm run lint` | Revisa el código con ESLint. |

## Publicación en Vercel

Importa el repositorio como proyecto **Vite**, utiliza `npm run build` y publica la carpeta `dist`.

Define `VITE_API_BASE_URL` con la URL del backend antes de compilar y permite el dominio de Vercel en el CORS de la API. El proxy de desarrollo de Vite no se incluye en producción; los cambios en las variables requieren una nueva compilación y despliegue.
