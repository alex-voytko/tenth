import { useState, useEffect } from 'react'
import '../App.css'

export const TaxesInput = ({ translations, onCalculate, taxRate, taxFee, salaries, deductTaxFee, deductSalaries, currencySymbol }) => {
  const formatInputNumber = (value) => {
    // Remove all spaces to get clean number
    const cleanValue = value.replace(/\s/g, '')
    
    // Check if there's a decimal part
    const parts = cleanValue.split(/[.,]/)
    if (parts.length > 1) {
      // Format only the integer part with spaces
      const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
      return `${integerPart}.${parts[1]}`
    }
    
    // Format with spaces
    return cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  }

  const [income, setIncome] = useState('')
  const [displayValue, setDisplayValue] = useState('')

  // Recalculate when tax rate, tax fee or salaries change
  useEffect(() => {
    if (income) {
      const salariesValue = salaries ? salaries.toString() : ''
      calculateTax(income, taxFee, deductTaxFee, salariesValue, deductSalaries)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taxRate, taxFee, deductTaxFee, salaries, deductSalaries])

  const calculateTax = (incomeValue, taxFeeValue, shouldDeductTaxFee, salariesValue, shouldDeductSalaries) => {
    // Remove spaces before parsing, replace comma with dot
    const cleanIncome = incomeValue.replace(/\s/g, '').replace(',', '.')
    const incomeAmount = parseFloat(cleanIncome)
    
    if (isNaN(incomeAmount) || incomeAmount <= 0) {
      onCalculate(null)
      return
    }

    // First: calculate tax from full income
    const taxAmount = incomeAmount * (taxRate / 100)
    let afterTax = incomeAmount - taxAmount

    // Second: deduct tax fee from the amount after taxes (if checked)
    let taxFeeAmount = 0
    if (shouldDeductTaxFee) {
      taxFeeAmount = taxFeeValue
      afterTax = Math.max(0, afterTax - taxFeeAmount)
    }

    // Third: deduct salaries from the amount after tax and tax fee (if checked)
    let salariesAmount = 0
    let finalAmount = afterTax
    if (shouldDeductSalaries && salariesValue) {
      const cleanSalaries = salariesValue.replace(/\s/g, '').replace(',', '.')
      salariesAmount = parseFloat(cleanSalaries) || 0
      finalAmount = Math.max(0, afterTax - salariesAmount)
    } else {
      finalAmount = afterTax
    }

    onCalculate({
      income: incomeAmount,
      taxRate: taxRate,
      taxAmount: taxAmount,
      taxFee: taxFeeAmount,
      salaries: salariesAmount,
      afterTax: finalAmount
    })
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    // Allow only digits, spaces, dots and commas
    const cleanValue = value.replace(/[^\d\s.,]/g, '')
    
    // Ensure only one decimal separator
    const parts = cleanValue.split(/[.,]/)
    const finalValue = parts.length > 2 
      ? parts[0] + '.' + parts.slice(1).join('')
      : cleanValue
    
    setIncome(finalValue)
    setDisplayValue(formatInputNumber(finalValue))
    const salariesValue = salaries ? salaries.toString() : ''
    calculateTax(finalValue, taxFee, deductTaxFee, salariesValue, deductSalaries)
  }



  return (
    <>
      <div className="input-section">
        <label htmlFor="income">{translations.inputLabel}</label>
        <div className="input-wrapper">
          <span className="currency-prefix">{currencySymbol}</span>
          <input
            id="income"
            type="text"
            value={displayValue}
            onChange={handleInputChange}
            placeholder={translations.inputPlaceholder}
            inputMode="decimal"
          />
        </div>
      </div>

    </>
  )
}

