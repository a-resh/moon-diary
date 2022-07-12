import i18n from 'i18n-js';
import * as Localization from 'expo-localization';

import {en} from './translations/en';
import {ru} from './translations/ru';
import {uk} from './translations/uk';
import {ar} from './translations/ar';
import {af} from './translations/af';
import {am} from './translations/am';
import {az} from './translations/az';
import {bg} from './translations/bg';
import {bn} from './translations/bn';
import {bs} from './translations/bs';
import {ca} from './translations/ca';
import {cs} from './translations/cs';
import {cy} from './translations/cy';
import {da} from './translations/da';
import {de} from './translations/de';

export const setI18nConfig = () => {
  i18n.translations = {
    en,
    ru,
    uk,
    az,
    ar,
    am,
    af,
    bg,
    bn,
    bs,
    ca,
    cs,
    cy,
    da,
    de,
  };
  i18n.fallbacks = true;
  i18n.locale =
    Localization.locale.search(/-|_/) !== -1
      ? Localization.locale.slice(0, 2)
      : Localization.locale;
};
