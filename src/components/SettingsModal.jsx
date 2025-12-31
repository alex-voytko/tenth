import { useState, useEffect } from 'react'
import { 
  MIN_PERCENTAGES, 
  MAX_PERCENTAGES, 
  MIN_PERCENT_VALUE, 
  MAX_PERCENT_VALUE,
  DEFAULT_TAX_RATE,
  DEFAULT_INITIAL_DEPOSIT,
  DEFAULT_REGULAR_CONTRIBUTION,
  DEFAULT_CONTRIBUTION_FREQUENCY,
  DEFAULT_ANNUAL_RATE,
  DEFAULT_CAPITALIZATION,
  DEFAULT_PERIOD
} from '../constants/defaultSettings'
import '../App.css'

export const SettingsModal = ({ 
  isOpen, 
  onClose, 
  activeTab,
  // Charity settings
  percentages, 
  onSavePercentages, 
  onResetPercentages,
  // Payments settings
  taxRate,
  onSaveTaxRate,
  taxFee,
  onSaveTaxFee,
  deductTaxFee,
  onSaveDeductTaxFee,
  salaries,
  onSaveSalaries,
  deductSalaries,
  onSaveDeductSalaries,
  // Investments settings
  initialDeposit = 0,
  onSaveInitialDeposit,
  regularContribution = 0,
  onSaveRegularContribution,
  contributionFrequency = 'monthly',
  onSaveContributionFrequency,
  annualRate = 10,
  onSaveAnnualRate,
  capitalization = 'monthly',
  onSaveCapitalization,
  period = 1,
  onSavePeriod,
  translations,
  currencySymbol
}) => {
  const formatInputNumber = (value) => {
    const cleanValue = value.toString().replace(/\s/g, '')
    const parts = cleanValue.split(/[.,]/)
    if (parts.length > 1) {
      const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
      return `${integerPart}.${parts[1]}`
    }
    return cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  }

  const [tempPercentages, setTempPercentages] = useState([...percentages])
  const [errors, setErrors] = useState([])
  const [tempTaxRate, setTempTaxRate] = useState(taxRate)
  const [tempTaxFee, setTempTaxFee] = useState(taxFee)
  const [tempTaxFeeDisplay, setTempTaxFeeDisplay] = useState(() => formatInputNumber(taxFee.toString()))
  const [tempDeductTaxFee, setTempDeductTaxFee] = useState(deductTaxFee)
  const [tempSalaries, setTempSalaries] = useState(salaries || 0)
  const [tempSalariesDisplay, setTempSalariesDisplay] = useState(() => salaries ? formatInputNumber(salaries.toString()) : '')
  const [tempDeductSalaries, setTempDeductSalaries] = useState(deductSalaries)
  
  // Investments temp states
  const [tempInitialDeposit, setTempInitialDeposit] = useState(initialDeposit || 0)
  const [tempInitialDepositDisplay, setTempInitialDepositDisplay] = useState(() => formatInputNumber((initialDeposit || 0).toString()))
  const [tempRegularContribution, setTempRegularContribution] = useState(regularContribution || 0)
  const [tempRegularContributionDisplay, setTempRegularContributionDisplay] = useState(() => formatInputNumber((regularContribution || 0).toString()))
  const [tempContributionFrequency, setTempContributionFrequency] = useState(contributionFrequency || 'monthly')
  const [tempAnnualRate, setTempAnnualRate] = useState(annualRate || 10)
  const [tempCapitalization, setTempCapitalization] = useState(capitalization || 'monthly')
  const [tempPeriod, setTempPeriod] = useState(period || 1)

  // Reset temp values when modal opens
  useEffect(() => {
    if (isOpen) {
      setTempPercentages([...percentages])
      setTempTaxRate(taxRate)
      setTempTaxFee(taxFee)
      setTempTaxFeeDisplay(formatInputNumber(taxFee.toString()))
      setTempDeductTaxFee(deductTaxFee)
      setTempSalaries(salaries || 0)
      setTempSalariesDisplay(salaries ? formatInputNumber(salaries.toString()) : '')
      setTempDeductSalaries(deductSalaries)
      if (initialDeposit !== undefined) {
        setTempInitialDeposit(initialDeposit)
        setTempInitialDepositDisplay(formatInputNumber(initialDeposit.toString()))
      }
      if (regularContribution !== undefined) {
        setTempRegularContribution(regularContribution)
        setTempRegularContributionDisplay(formatInputNumber(regularContribution.toString()))
      }
      if (contributionFrequency) {
        setTempContributionFrequency(contributionFrequency)
      }
      if (annualRate !== undefined) {
        setTempAnnualRate(annualRate)
      }
      if (capitalization) {
        setTempCapitalization(capitalization)
      }
      if (period !== undefined) {
        setTempPeriod(period)
      }
    }
  }, [isOpen, percentages, taxRate, taxFee, salaries, deductTaxFee, deductSalaries, initialDeposit, regularContribution, contributionFrequency, annualRate, capitalization, period])

  if (!isOpen) return null

  const validatePercentage = (value) => {
    const num = parseFloat(value)
    return !isNaN(num) && num >= MIN_PERCENT_VALUE && num <= MAX_PERCENT_VALUE
  }

  const handlePercentageChange = (index, value) => {
    const newPercentages = [...tempPercentages]
    newPercentages[index] = value
    setTempPercentages(newPercentages)
    
    // Validation
    const newErrors = [...errors]
    if (value === '' || validatePercentage(value)) {
      newErrors[index] = false
    } else {
      newErrors[index] = true
    }
    setErrors(newErrors)
  }

  const handleAddPercentage = () => {
    if (tempPercentages.length < MAX_PERCENTAGES) {
      setTempPercentages([...tempPercentages, 10])
      setErrors([...errors, false])
    }
  }

  const handleRemovePercentage = (index) => {
    if (tempPercentages.length > MIN_PERCENTAGES) {
      const newPercentages = tempPercentages.filter((_, i) => i !== index)
      const newErrors = errors.filter((_, i) => i !== index)
      setTempPercentages(newPercentages)
      setErrors(newErrors)
    }
  }

  const handleTaxFeeChange = (e) => {
    const value = e.target.value
    const cleanValue = value.replace(/[^\d\s.,]/g, '')
    const parts = cleanValue.split(/[.,]/)
    const finalValue = parts.length > 2 
      ? parts[0] + '.' + parts.slice(1).join('')
      : cleanValue
    
    setTempTaxFeeDisplay(formatInputNumber(finalValue))
    const cleanTaxFee = finalValue.replace(/\s/g, '').replace(',', '.')
    const taxFeeAmount = parseFloat(cleanTaxFee) || 0
    setTempTaxFee(taxFeeAmount)
  }

  const handleSalariesChange = (e) => {
    const value = e.target.value
    const cleanValue = value.replace(/[^\d\s.,]/g, '')
    const parts = cleanValue.split(/[.,]/)
    const finalValue = parts.length > 2 
      ? parts[0] + '.' + parts.slice(1).join('')
      : cleanValue
    
    setTempSalariesDisplay(formatInputNumber(finalValue))
    const cleanSalaries = finalValue.replace(/\s/g, '').replace(',', '.')
    const salariesAmount = parseFloat(cleanSalaries) || 0
    setTempSalaries(salariesAmount)
  }

  const handleInitialDepositChange = (e) => {
    const value = e.target.value
    const cleanValue = value.replace(/[^\d\s.,]/g, '')
    const parts = cleanValue.split(/[.,]/)
    const finalValue = parts.length > 2 
      ? parts[0] + '.' + parts.slice(1).join('')
      : cleanValue
    
    setTempInitialDepositDisplay(formatInputNumber(finalValue))
    const cleanAmount = finalValue.replace(/\s/g, '').replace(',', '.')
    const amount = parseFloat(cleanAmount) || 0
    setTempInitialDeposit(amount)
  }

  const handleRegularContributionChange = (e) => {
    const value = e.target.value
    const cleanValue = value.replace(/[^\d\s.,]/g, '')
    const parts = cleanValue.split(/[.,]/)
    const finalValue = parts.length > 2 
      ? parts[0] + '.' + parts.slice(1).join('')
      : cleanValue
    
    setTempRegularContributionDisplay(formatInputNumber(finalValue))
    const cleanAmount = finalValue.replace(/\s/g, '').replace(',', '.')
    const amount = parseFloat(cleanAmount) || 0
    setTempRegularContribution(amount)
  }

  const handleSave = () => {
    if (activeTab === 'charity') {
      // Validate all values
      const allValid = tempPercentages.every(p => validatePercentage(p))
      if (allValid && tempPercentages.length >= MIN_PERCENTAGES) {
        onSavePercentages(tempPercentages.map(p => parseFloat(p)))
        onClose()
      }
    } else if (activeTab === 'payments') {
      // Save payments settings
      if (tempTaxRate >= 0 && tempTaxRate <= 100) {
        onSaveTaxRate(tempTaxRate)
        onSaveTaxFee(tempTaxFee)
        onSaveDeductTaxFee(tempDeductTaxFee)
        onSaveSalaries(tempSalaries)
        onSaveDeductSalaries(tempDeductSalaries)
        onClose()
      }
    } else if (activeTab === 'investments') {
      // Save investments settings
      if (tempAnnualRate >= 0 && tempAnnualRate <= 100 && tempPeriod > 0) {
        if (onSaveInitialDeposit) onSaveInitialDeposit(tempInitialDeposit)
        if (onSaveRegularContribution) onSaveRegularContribution(tempRegularContribution)
        if (onSaveContributionFrequency) onSaveContributionFrequency(tempContributionFrequency)
        if (onSaveAnnualRate) onSaveAnnualRate(tempAnnualRate)
        if (onSaveCapitalization) onSaveCapitalization(tempCapitalization)
        if (onSavePeriod) onSavePeriod(tempPeriod)
        onClose()
      }
    }
  }

  const handleReset = () => {
    if (activeTab === 'charity') {
      onResetPercentages()
    } else if (activeTab === 'payments') {
      onSaveTaxRate(DEFAULT_TAX_RATE)
      onSaveTaxFee(taxFee) // Keep current tax fee value
      onSaveDeductTaxFee(false)
      onSaveSalaries(0)
      onSaveDeductSalaries(false)
    } else if (activeTab === 'investments') {
      if (onSaveInitialDeposit) onSaveInitialDeposit(DEFAULT_INITIAL_DEPOSIT)
      if (onSaveRegularContribution) onSaveRegularContribution(DEFAULT_REGULAR_CONTRIBUTION)
      if (onSaveContributionFrequency) onSaveContributionFrequency(DEFAULT_CONTRIBUTION_FREQUENCY)
      if (onSaveAnnualRate) onSaveAnnualRate(DEFAULT_ANNUAL_RATE)
      if (onSaveCapitalization) onSaveCapitalization(DEFAULT_CAPITALIZATION)
      if (onSavePeriod) onSavePeriod(DEFAULT_PERIOD)
    }
    onClose()
  }

  const canSave = activeTab === 'charity' 
    ? tempPercentages.every(p => validatePercentage(p)) && 
      tempPercentages.length >= MIN_PERCENTAGES &&
      tempPercentages.length <= MAX_PERCENTAGES
    : activeTab === 'payments'
    ? tempTaxRate >= 0 && tempTaxRate <= 100
    : tempAnnualRate >= 0 && tempAnnualRate <= 100 && tempPeriod > 0

  const getTitle = () => {
    if (activeTab === 'charity') {
      return translations.settingsTitleCharity || translations.settingsTitle
    } else if (activeTab === 'payments') {
      return translations.settingsTitlePayments || translations.settingsTitle
    } else if (activeTab === 'investments') {
      return translations.settingsTitleInvestments || translations.settingsTitle
    }
    return translations.settingsTitle
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button 
          className="modal-close-button" 
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>
        <h2>{getTitle()}</h2>
        
        {activeTab === 'charity' && (
          <>
            <div className="percentages-list">
              {tempPercentages.map((percentage, index) => (
                <div key={index} className="percentage-item">
                  <label htmlFor={`percentage-${index}`}>
                    {translations.percentLabel} {index + 1}:
                  </label>
                  <div className="percentage-input-group">
                    <input
                      id={`percentage-${index}`}
                      type="number"
                      min={MIN_PERCENT_VALUE}
                      max={MAX_PERCENT_VALUE}
                      step="1"
                      value={percentage}
                      onChange={(e) => handlePercentageChange(index, e.target.value)}
                      className={errors[index] ? 'error' : ''}
                    />
                    <span className="percent-sign">%</span>
                    {tempPercentages.length > MIN_PERCENTAGES && (
                      <button
                        className="remove-button"
                        onClick={() => handleRemovePercentage(index)}
                        aria-label={translations.removePercent}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                  {errors[index] && (
                    <span className="error-message">
                      {translations.percentError}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {tempPercentages.length < MAX_PERCENTAGES && (
              <button 
                className="add-button"
                onClick={handleAddPercentage}
              >
                + {translations.addPercent}
              </button>
            )}
          </>
        )}

        {activeTab === 'payments' && (
          <div className="settings-payments">
            <div className="input-section">
              <label htmlFor="modal-tax-rate">{translations.payments.taxRateLabel}</label>
              <div className="tax-rate-wrapper">
                <input
                  id="modal-tax-rate"
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={tempTaxRate}
                  onChange={(e) => setTempTaxRate(parseFloat(e.target.value) || 0)}
                  className="tax-rate-input"
                />
                <span className="percent-sign">%</span>
              </div>
            </div>

            <div className="input-section">
              <div className="checkbox-wrapper">
                <input
                  id="modal-deduct-tax-fee"
                  type="checkbox"
                  checked={tempDeductTaxFee}
                  onChange={(e) => setTempDeductTaxFee(e.target.checked)}
                  className="checkbox-input"
                />
                <label htmlFor="modal-deduct-tax-fee" className="checkbox-label">
                  {translations.payments.deductTaxFeeLabel}
                </label>
              </div>
            </div>

            {tempDeductTaxFee && (
              <div className="input-section">
                <label htmlFor="modal-tax-fee">{translations.payments.taxFeeLabel}</label>
                <div className="input-wrapper">
                  <span className="currency-prefix">{currencySymbol}</span>
                  <input
                    id="modal-tax-fee"
                    type="text"
                    value={tempTaxFeeDisplay}
                    onChange={handleTaxFeeChange}
                    placeholder={translations.payments.taxFeeLabel}
                    inputMode="decimal"
                  />
                </div>
              </div>
            )}

            <div className="input-section">
              <div className="checkbox-wrapper">
                <input
                  id="modal-deduct-salaries"
                  type="checkbox"
                  checked={tempDeductSalaries}
                  onChange={(e) => setTempDeductSalaries(e.target.checked)}
                  className="checkbox-input"
                />
                <label htmlFor="modal-deduct-salaries" className="checkbox-label">
                  {translations.payments.deductSalariesLabel}
                </label>
              </div>
            </div>

            {tempDeductSalaries && (
              <div className="input-section">
                <label htmlFor="modal-salaries">{translations.payments.salariesLabel}</label>
                <div className="input-wrapper">
                  <span className="currency-prefix">{currencySymbol}</span>
                  <input
                    id="modal-salaries"
                    type="text"
                    value={tempSalariesDisplay}
                    onChange={handleSalariesChange}
                    placeholder={translations.payments.salariesPlaceholder}
                    inputMode="decimal"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'investments' && (
          <div className="settings-investments">
            <div className="input-section">
              <label htmlFor="modal-initial-deposit">{translations.investments.initialDepositLabel}</label>
              <div className="input-wrapper">
                <span className="currency-prefix">{currencySymbol}</span>
                <input
                  id="modal-initial-deposit"
                  type="text"
                  value={tempInitialDepositDisplay}
                  onChange={handleInitialDepositChange}
                  placeholder="0"
                  inputMode="decimal"
                />
              </div>
            </div>

            <div className="input-section">
              <label htmlFor="modal-regular-contribution">{translations.investments.regularContributionLabel}</label>
              <div className="input-wrapper">
                <span className="currency-prefix">{currencySymbol}</span>
                <input
                  id="modal-regular-contribution"
                  type="text"
                  value={tempRegularContributionDisplay}
                  onChange={handleRegularContributionChange}
                  placeholder="0"
                  inputMode="decimal"
                />
              </div>
            </div>

            <div className="input-section">
              <label htmlFor="modal-contribution-frequency">{translations.investments.contributionFrequencyLabel}</label>
              <select
                id="modal-contribution-frequency"
                className="language-select"
                value={tempContributionFrequency}
                onChange={(e) => setTempContributionFrequency(e.target.value)}
              >
                <option value="monthly">{translations.investments.monthly}</option>
                <option value="yearly">{translations.investments.yearly}</option>
              </select>
            </div>

            <div className="input-section">
              <label htmlFor="modal-annual-rate">{translations.investments.annualRateLabel}</label>
              <div className="tax-rate-wrapper">
                <input
                  id="modal-annual-rate"
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={tempAnnualRate}
                  onChange={(e) => setTempAnnualRate(parseFloat(e.target.value) || 0)}
                  className="tax-rate-input"
                />
                <span className="percent-sign">%</span>
              </div>
            </div>

            <div className="input-section">
              <label htmlFor="modal-capitalization">{translations.investments.capitalizationLabel}</label>
              <select
                id="modal-capitalization"
                className="language-select"
                value={tempCapitalization}
                onChange={(e) => setTempCapitalization(e.target.value)}
              >
                <option value="monthly">{translations.investments.monthly}</option>
                <option value="yearly">{translations.investments.yearly}</option>
              </select>
            </div>

            <div className="input-section">
              <label htmlFor="modal-period">{translations.investments.periodLabel}</label>
              <input
                id="modal-period"
                type="number"
                min="0.1"
                step="0.1"
                value={tempPeriod}
                onChange={(e) => setTempPeriod(parseFloat(e.target.value) || 0)}
                className="tax-rate-input"
              />
            </div>
          </div>
        )}

        <div className="modal-actions">
          <button 
            className="button-secondary"
            onClick={handleReset}
          >
            {translations.resetButton}
          </button>
          <div className="modal-actions-right">
            <button 
              className="button-secondary"
              onClick={onClose}
            >
              {translations.cancelButton}
            </button>
            <button 
              className="button-primary"
              onClick={handleSave}
              disabled={!canSave}
            >
              {translations.saveButton}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

