import i18n from 'i18n-js';
import * as Localization from 'expo-localization';

import {en} from './translations/en';
import {ru} from './translations/ru';

export const setI18nConfig = () => {
  i18n.translations = {
    en,
    ru,
  };
  i18n.fallbacks = true;
  i18n.locale =
    Localization.locale.search(/-|_/) !== -1
      ? Localization.locale.slice(0, 2)
      : Localization.locale;
};
