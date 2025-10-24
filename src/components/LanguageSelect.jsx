import { languages } from '../constants/languages'
import '../App.css'

export const LanguageSelect = ({ language, onLanguageChange }) => {
  return (
    <select 
      className="language-select"
      value={language}
      onChange={(e) => onLanguageChange(e.target.value)}
      aria-label="Select language"
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.flag}
        </option>
      ))}
    </select>
  )
}

