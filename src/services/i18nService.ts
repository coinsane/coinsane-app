import i18n from 'react-native-i18n';
import en from './i18n/en';
import ru from './i18n/ru';

i18n.fallbacks = true;

i18n.translations = {
  en,
  ru,
};

export default i18n;
