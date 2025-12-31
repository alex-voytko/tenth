import { useState, useEffect } from 'react'

export const useDeductTaxFee = () => {
  const [deductTaxFee, setDeductTaxFee] = useState(() => {
    const saved = localStorage.getItem('deductTaxFee')
    return saved ? JSON.parse(saved) : false
  })

  useEffect(() => {
    localStorage.setItem('deductTaxFee', JSON.stringify(deductTaxFee))
  }, [deductTaxFee])

  return { deductTaxFee, setDeductTaxFee }
}

