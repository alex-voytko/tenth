import { useState, useEffect } from 'react'
import { DEFAULT_TAX_FEE } from '../constants/defaultSettings'

export const useTaxFee = () => {
  const [taxFee, setTaxFee] = useState(() => {
    const saved = localStorage.getItem('taxFee')
    return saved ? parseFloat(saved) : DEFAULT_TAX_FEE
  })

  useEffect(() => {
    localStorage.setItem('taxFee', taxFee.toString())
  }, [taxFee])

  return { taxFee, setTaxFee }
}

