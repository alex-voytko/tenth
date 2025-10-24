import { useState, useEffect } from 'react'
import '../App.css'

export const TenthInput = ({ translations, onCalculate, percentages, currencySymbol }) => {
  const [amount, setAmount] = useState('')
  const [displayValue, setDisplayValue] = useState('')

  // Recalculate when percentages change
  useEffect(() => {
    if (amount) {
      calculateTenths(amount)
    }
  }, [percentages])

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

  const calculateTenths = (value) => {
    // Remove spaces before parsing, replace comma with dot
    const cleanValue = value.replace(/\s/g, '').replace(',', '.')
    const initialAmount = parseFloat(cleanValue)
    
    if (isNaN(initialAmount) || initialAmount <= 0) {
      onCalculate(null)
      return
    }

    let remaining = initialAmount
    const tenths = []

    // Calculate percentages dynamically
    percentages.forEach((percent, index) => {
      const amount = remaining * (percent / 100)
      tenths.push({
        number: index + 1,
        percent: percent,
        amount: amount
      })
      remaining = remaining - amount
    })

    onCalculate({
      tenths,
      remaining
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
    
    setAmount(finalValue)
    setDisplayValue(formatInputNumber(finalValue))
    calculateTenths(finalValue)
  }

  return (
    <div className="input-section">
      <label htmlFor="amount">{translations.inputLabel}</label>
      <div className="input-wrapper">
        <span className="currency-prefix">{currencySymbol}</span>
        <input
          id="amount"
          type="text"
          value={displayValue}
          onChange={handleInputChange}
          placeholder={translations.inputPlaceholder}
          inputMode="decimal"
        />
      </div>
    </div>
  )
}

