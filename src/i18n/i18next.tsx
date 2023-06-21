/*
做一下国际化，应该不过分吧 (逃
*/
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en', // 默认语言为英文
    detection: {
      order: ['navigator'], // 优先使用浏览器语言设置进行检测
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // 语言资源的加载路径
    },
  });

export default i18n;
