import i18n from 'i18n-js';
import * as Localization from 'expo-localization';

import {en} from './translations/en';
import {ru} from './translations/ru';
import {uk} from './translations/uk';
import {ar} from './translations/ar';
import {ko} from './translations/ko';
import {ta} from './translations/ta';
import {pt} from './translations/pt';
import {th} from './translations/th';
import {tr} from './translations/tr';
import {ur} from './translations/ur';
import {vi} from './translations/vi';
import {zh} from './translations/zh';
import {es} from './translations/es';
import {fr} from './translations/fr';
import {id} from './translations/id';
import {it} from './translations/it';
import {ja} from './translations/ja';
import {hi} from './translations/hi';
import {bn} from './translations/bn';
import {de} from './translations/de';
import {enUS} from 'date-fns/locale/en-US';
import {ru as ruLocale} from 'date-fns/locale/ru';
import {ko as koLocale} from 'date-fns/locale/ko';
import {hi as hiLocale} from 'date-fns/locale/hi';
import {ja as jaLocale} from 'date-fns/locale/ja';
import {it as itLocale} from 'date-fns/locale/it';
import {id as idLocale} from 'date-fns/locale/id';
import {fr as frLocale} from 'date-fns/locale/fr';
import {es as esLocale} from 'date-fns/locale/es';
import {zhCN as zhLocale} from 'date-fns/locale/zh-CN';
import {vi as viLocale} from 'date-fns/locale/vi';
import {ta as taLocale} from 'date-fns/locale/ta';
import {th as thLocale} from 'date-fns/locale/th';
import {tr as trLocale} from 'date-fns/locale/tr';
import {uk as ukLocale} from 'date-fns/locale/uk';
import {ar as arLocale} from 'date-fns/locale/ar';
import {bn as bnLocale} from 'date-fns/locale/bn';
import {de as deLocale} from 'date-fns/locale/de';
import {pt as ptLocale} from 'date-fns/locale/pt';
import {Locale} from 'date-fns/locale/types';
import {LanguageLocale} from '../components/config-modal';
import {getStorageData, setStorageData} from '../data/get-geolocation';

export const timeLocale: Record<string, Locale> = {
  en: enUS,
  ru: ruLocale,
  uk: ukLocale,
  ar: arLocale,
  bn: bnLocale,
  de: deLocale,
  ko: koLocale,
  ta: taLocale,
  pt: ptLocale,
  th: thLocale,
  tr: trLocale,
  ur: hiLocale,
  vi: viLocale,
  zh: zhLocale,
  es: esLocale,
  fr: frLocale,
  id: idLocale,
  it: itLocale,
  ja: jaLocale,
  hi: hiLocale,
};

export const translations = {
  en,
  ru,
  uk,
  ar,
  bn,
  de,
  ko,
  ta,
  pt,
  th,
  tr,
  ur,
  vi,
  zh,
  es,
  fr,
  id,
  it,
  ja,
  hi,
};

export const setI18nConfig = async () => {
  let language: string | null | undefined = await getStorageData('language');
  if (!language) {
    language = Object.keys(translations).find(transl =>
      Localization.getLocales().find(locale => locale.languageCode === transl),
    );
    await setStorageData('language', language ?? 'en');
  }
  i18n.translations = translations;
  i18n.fallbacks = true;
  i18n.locale = language ?? 'en';
};

export const changeLanguage = (locale: keyof typeof LanguageLocale) => {
  i18n.translations = {
    [locale]: translations[locale],
  };
  i18n.locale = locale;
};
