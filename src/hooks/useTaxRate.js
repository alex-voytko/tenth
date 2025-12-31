import { useState, useEffect } from 'react'
import { DEFAULT_TAX_RATE } from '../constants/defaultSettings'

export const useTaxRate = () => {
  const [taxRate, setTaxRate] = useState(() => {
    const saved = localStorage.getItem('taxRate')
    return saved ? parseFloat(saved) : DEFAULT_TAX_RATE
  })

  useEffect(() => {
    localStorage.setItem('taxRate', taxRate.toString())
  }, [taxRate])

  return { taxRate, setTaxRate }
}

