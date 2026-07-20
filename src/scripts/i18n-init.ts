import i18next from 'i18next';

type TranslationMap = Record<string, Record<string, string>>;

declare global {
  interface Window {
    __I18N_UI__?: TranslationMap;
    __I18N_DEFAULT_LANG__?: string;
    setLanguage?: (lang: string) => Promise<void>;
  }
}

const STORAGE_KEY = 'preferred-lang';

const isTextInputLike = (el: Element): el is HTMLInputElement | HTMLTextAreaElement =>
  el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement;

const resourcesFromUi = (ui: TranslationMap) =>
  Object.fromEntries(
    Object.entries(ui).map(([lang, translations]) => [lang, { translation: translations }]),
  );

const applyTranslations = () => {
  document.querySelectorAll('[data-i18n-key]').forEach((el) => {
    const key = el.getAttribute('data-i18n-key');
    if (!key) return;

    const value = i18next.t(key, { defaultValue: key });
    if (isTextInputLike(el)) {
      el.placeholder = value;
    } else {
      el.textContent = value;
    }
  });
};

const getStoredLanguage = (fallback: string, supported: string[]) => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved && supported.includes(saved) ? saved : fallback;
  } catch {
    return fallback;
  }
};

const initI18n = async () => {
  const ui = window.__I18N_UI__;
  const fallbackLang = window.__I18N_DEFAULT_LANG__ || 'en';

  if (!ui || !ui[fallbackLang]) return;

  const supportedLangs = Object.keys(ui);
  const initialLang = getStoredLanguage(fallbackLang, supportedLangs);

  await i18next.init({
    lng: initialLang,
    fallbackLng: fallbackLang,
    resources: resourcesFromUi(ui),
    interpolation: { escapeValue: false },
    returnEmptyString: false,
  });

  window.setLanguage = async (lang: string) => {
    const nextLang = supportedLangs.includes(lang) ? lang : fallbackLang;

    await i18next.changeLanguage(nextLang);

    try {
      localStorage.setItem(STORAGE_KEY, nextLang);
    } catch {
      // Ignore storage failures (private mode / disabled storage)
    }

    document.documentElement.lang = nextLang;
    applyTranslations();
    window.dispatchEvent(new CustomEvent('language-change', { detail: { lang: nextLang } }));
  };

  await window.setLanguage(initialLang);
};

void initI18n();
