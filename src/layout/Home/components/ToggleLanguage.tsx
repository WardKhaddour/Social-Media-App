import { ReactComponent as LanguageIcon } from 'assets/icons/language.svg';
import { useTranslation } from 'react-i18next';

import './ToggleLanguage.scss';
import { MouseEvent, useState } from 'react';

const LanguagesList = ({
  languages,
  shown,
  setLanguage,
}: {
  languages: string[];
  shown: boolean;
  setLanguage: (val: string) => void;
}) => {
  const classes = shown
    ? 'toggle-language__list toggle-language__list--shown'
    : 'toggle-language__list';

  const changeLanguageHandler = (event: MouseEvent) => {
    const element = event.target as HTMLElement;
    if (element.tagName !== 'LI') {
      return;
    }
    setLanguage(element.textContent!);
  };

  return (
    <ul className={classes} onClick={changeLanguageHandler}>
      {languages.map(lang => (
        <li key={lang} className="toggle-language__list--item">
          {lang}
        </li>
      ))}
    </ul>
  );
};

const ToggleLanguage = () => {
  const [languagesListShown, setLanguagesListShown] = useState(false);
  const { i18n } = useTranslation();

  const toggleList = () => {
    setLanguagesListShown(prevState => !prevState);
  };

  const setLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setLanguagesListShown(false);
    localStorage.setItem('language', lang);
  };

  return (
    <div className="toggle-language">
      <button
        type="button"
        className="toggle-language__btn"
        onClick={toggleList}
      >
        <LanguageIcon className="toggle-language__icon" />
        <span>{i18n.language}</span>
      </button>
      <LanguagesList
        setLanguage={setLanguage}
        shown={languagesListShown}
        languages={[...i18n.languages]}
      />
    </div>
  );
};

export default ToggleLanguage;
