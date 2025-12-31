import { useState, useEffect } from 'react'

export const useSalaries = () => {
  const [salaries, setSalaries] = useState(() => {
    const saved = localStorage.getItem('salaries')
    return saved ? parseFloat(saved) : 0
  })

  useEffect(() => {
    localStorage.setItem('salaries', salaries.toString())
  }, [salaries])

  return { salaries, setSalaries }
}

