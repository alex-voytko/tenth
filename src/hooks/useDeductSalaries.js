import { useState, useEffect } from 'react'

export const useDeductSalaries = () => {
  const [deductSalaries, setDeductSalaries] = useState(() => {
    const saved = localStorage.getItem('deductSalaries')
    return saved ? JSON.parse(saved) : false
  })

  useEffect(() => {
    localStorage.setItem('deductSalaries', JSON.stringify(deductSalaries))
  }, [deductSalaries])

  return { deductSalaries, setDeductSalaries }
}

