import { useState } from 'react'
import './App.css'
import { useTheme } from './hooks/useTheme'
import { useLanguage } from './hooks/useLanguage'
import { useSettings } from './hooks/useSettings'
import { useCurrency } from './hooks/useCurrency'
import { LanguageSelect } from './components/LanguageSelect'
import { CurrencySelect } from './components/CurrencySelect'
import { ThemeToggler } from './components/ThemeToggler'
import { SettingsButton } from './components/SettingsButton'
import { SettingsModal } from './components/SettingsModal'
import { TenthInput } from './components/TenthInput'
import { TenthsResults } from './components/TenthsResults'

function App() {
  const [results, setResults] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const { theme, toggleTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const { percentages, setPercentages, resetToDefault } = useSettings()
  const { currency, setCurrency, getCurrencySymbol, formatWithCurrency } = useCurrency()

  return (
    <div className="app">
      <h1 className="app-title">{t.title}</h1>
      
      <div className="container">
        <div className="toolbar">
          <SettingsButton
            onClick={() => setIsModalOpen(true)}
            ariaLabel={t.settingsButton}
          />
          <CurrencySelect
            currency={currency}
            onCurrencyChange={setCurrency}
          />
          <LanguageSelect 
            language={language}
            onLanguageChange={setLanguage}
          />
          <ThemeToggler 
            theme={theme}
            onToggle={toggleTheme}
            ariaLabel={t.themeToggle}
          />
        </div>

        <TenthInput 
          translations={t}
          onCalculate={setResults}
          percentages={percentages}
          currencySymbol={getCurrencySymbol()}
        />

        <TenthsResults 
          results={results}
          translations={t}
          formatNumber={formatWithCurrency}
        />
      </div>

      <SettingsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        percentages={percentages}
        onSave={setPercentages}
        onReset={resetToDefault}
        translations={t}
      />
    </div>
  )
}

export default App

