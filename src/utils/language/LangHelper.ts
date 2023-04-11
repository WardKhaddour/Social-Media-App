class LangHelper {
  setLangLocalStorage(lang: string) {
    localStorage.setItem('language', lang);
    return this;
  }

  getLang() {
    const language = navigator.language.startsWith('ar') ? 'ar' : 'en';
    return localStorage.getItem('language') || language;
  }
}

const langHelper = new LangHelper();

export default langHelper;
