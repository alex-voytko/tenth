import { useState, useEffect } from 'react'
import { DEFAULT_CURRENCY, currencies } from '../constants/currencies'

export const useCurrency = () => {
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem('currency') || DEFAULT_CURRENCY
  })

  useEffect(() => {
    localStorage.setItem('currency', currency)
  }, [currency])

  const getCurrencySymbol = () => {
    const curr = currencies.find(c => c.code === currency)
    return curr ? curr.symbol : '$'
  }

  const formatWithCurrency = (num) => {
    const formatted = num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    return `${getCurrencySymbol()} ${formatted}`
  }

  return { currency, setCurrency, getCurrencySymbol, formatWithCurrency }
}

