import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: {
                    "title": "Eslabones",
                    "subtitle": "Connecting the best content creators in one place.",
                    "streamers": "Streamers",
                    "community": "Community",
                    "comments_coming_soon": "Comments Section Coming Soon",
                    "login_msg": "Join the conversation by logging in.",
                    "login_google": "Login with Google",
                    "login_discord": "Login with Discord",
                    "post_comment": "Post Comment",
                    "write_comment": "Write a comment...",
                    "links": "Links",
                    "chat": "Chat",
                    "official_channels": "Official Channels",
                    "click_view": "Click to view"
                }
            },
            es: {
                translation: {
                    "title": "Eslabones",
                    "subtitle": "Conectando a los mejores creadores de contenido en un solo lugar.",
                    "streamers": "Streamers",
                    "community": "Comunidad",
                    "comments_coming_soon": "Sección de comentarios próximamente",
                    "login_msg": "Únete a la conversación iniciando sesión.",
                    "login_google": "Iniciar con Google",
                    "login_discord": "Iniciar con Discord",
                    "post_comment": "Publicar comentario",
                    "write_comment": "Escribe un comentario...",
                    "links": "Enlaces",
                    "chat": "Chat",
                    "official_channels": "Canales Oficiales",
                    "click_view": "Clic para ver"
                }
            }
        },
        lng: "es", // Default to Spanish as requested
        fallbackLng: "en",
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
