import { useState, useEffect } from 'react'
import './App.css'
import { useTheme } from './hooks/useTheme'
import { useLanguage } from './hooks/useLanguage'
import { useSettings } from './hooks/useSettings'
import { useCurrency } from './hooks/useCurrency'
import { useTaxRate } from './hooks/useTaxRate'
import { useTaxFee } from './hooks/useTaxFee'
import { useDeductTaxFee } from './hooks/useDeductTaxFee'
import { useDeductSalaries } from './hooks/useDeductSalaries'
import { useSalaries } from './hooks/useSalaries'
import { LanguageSelect } from './components/LanguageSelect'
import { CurrencySelect } from './components/CurrencySelect'
import { ThemeToggler } from './components/ThemeToggler'
import { SettingsButton } from './components/SettingsButton'
import { SettingsModal } from './components/SettingsModal'
import { Tabs } from './components/Tabs'
import { TenthInput } from './components/TenthInput'
import { TenthsResults } from './components/TenthsResults'
import { TaxesInput } from './components/TaxesInput'
import { TaxesResults } from './components/TaxesResults'
import { Investments } from './components/Investments'

function App() {
  const [results, setResults] = useState(null)
  const [taxesResults, setTaxesResults] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('payments')
  
  const { theme, toggleTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const { percentages, setPercentages, resetToDefault } = useSettings()
  const { currency, setCurrency, getCurrencySymbol, formatWithCurrency } = useCurrency()
  const { taxRate, setTaxRate } = useTaxRate()
  const { taxFee, setTaxFee } = useTaxFee()
  const { deductTaxFee, setDeductTaxFee } = useDeductTaxFee()
  const { salaries, setSalaries } = useSalaries()
  const { deductSalaries, setDeductSalaries } = useDeductSalaries()
  
  // Investments settings - will be set by Investments component
  const [investmentsSettings, setInvestmentsSettings] = useState(null)

  // Clear results when switching tabs
  useEffect(() => {
    setResults(null)
    setTaxesResults(null)
  }, [activeTab])

  return (
    <div className="app">
      <h1 className="app-title">{t.title}</h1>
      
      <Tabs 
        activeTab={activeTab}
        onTabChange={setActiveTab}
        translations={t}
      />
      
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

        {activeTab === 'charity' && (
          <>
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
          </>
        )}

        {activeTab === 'payments' && (
          <>
            <TaxesInput 
              translations={t}
              onCalculate={setTaxesResults}
              taxRate={taxRate}
              taxFee={taxFee}
              salaries={salaries}
              deductTaxFee={deductTaxFee}
              deductSalaries={deductSalaries}
              currencySymbol={getCurrencySymbol()}
            />

            <TaxesResults 
              results={taxesResults}
              translations={t}
              formatNumber={formatWithCurrency}
            />
          </>
        )}

        {activeTab === 'investments' && (
          <Investments 
            translations={t}
            formatNumber={formatWithCurrency}
            onSettingsChange={setInvestmentsSettings}
          />
        )}
      </div>

      <SettingsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        activeTab={activeTab}
        percentages={percentages}
        onSavePercentages={setPercentages}
        onResetPercentages={resetToDefault}
        taxRate={taxRate}
        onSaveTaxRate={setTaxRate}
        taxFee={taxFee}
        onSaveTaxFee={setTaxFee}
        deductTaxFee={deductTaxFee}
        onSaveDeductTaxFee={setDeductTaxFee}
        salaries={salaries}
        onSaveSalaries={setSalaries}
        deductSalaries={deductSalaries}
        onSaveDeductSalaries={setDeductSalaries}
        initialDeposit={investmentsSettings?.initialDeposit}
        onSaveInitialDeposit={investmentsSettings?.setInitialDeposit}
        regularContribution={investmentsSettings?.regularContribution}
        onSaveRegularContribution={investmentsSettings?.setRegularContribution}
        contributionFrequency={investmentsSettings?.contributionFrequency}
        onSaveContributionFrequency={investmentsSettings?.setContributionFrequency}
        annualRate={investmentsSettings?.annualRate}
        onSaveAnnualRate={investmentsSettings?.setAnnualRate}
        capitalization={investmentsSettings?.capitalization}
        onSaveCapitalization={investmentsSettings?.setCapitalization}
        period={investmentsSettings?.period}
        onSavePeriod={investmentsSettings?.setPeriod}
        translations={t}
        currencySymbol={getCurrencySymbol()}
      />
    </div>
  )
}

export default App

