import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import pl from './translations/pl/pl';

i18n
    .use(LanguageDetector)
    .use(HttpApi)
    .use(initReactI18next)
    .init({
        backend: {
            mode: 'cors',
            credentials: 'same-origin',
            cache: 'default'
        },
        resources: {
            pl
        },
        lng: 'pl',
        fallbackLng: 'pl',
        ns: ['translations'],
        defaultNS: 'translations',

        keySeparator: '.',

        interpolation: {
            escapeValue: false
        },
        react: {
            wait: true
        }
    });

export default i18n;