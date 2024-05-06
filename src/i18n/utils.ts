import { defaultLang} from './consts';
import { ui } from './content/ui'
import { home } from './content/home'
import { services } from './content/services'
import { about } from './content/about'
import { work } from './content/work'
import { contact } from './content/contact'
import { blog } from './content/blog'

export function getLangFromUrl(url) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang;
  return defaultLang;
}

export function useTranslations(lang, page?) {
  return function t(key) {
    switch (page) {
      case 'home':
        return home[lang][key] || home[defaultLang][key];
      case 'services':
        return services[lang][key] || services[defaultLang][key];
      case 'work':
        return work[lang][key] || work[defaultLang][key];
      case 'blog':
        return blog[lang][key] || blog[defaultLang][key];
      case 'about':
        return about[lang][key] || about[defaultLang][key];
      case 'contact':
        return contact[lang][key] || contact[defaultLang][key];
      default:
        return ui[lang][key] || ui[defaultLang][key];
    }
  }
}