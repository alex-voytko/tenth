import { useState, useEffect } from 'react'
import { DEFAULT_PERCENTAGES } from '../constants/defaultSettings'

export const useSettings = () => {
  const [percentages, setPercentages] = useState(() => {
    const saved = localStorage.getItem('percentages')
    return saved ? JSON.parse(saved) : DEFAULT_PERCENTAGES
  })

  useEffect(() => {
    localStorage.setItem('percentages', JSON.stringify(percentages))
  }, [percentages])

  const resetToDefault = () => {
    setPercentages(DEFAULT_PERCENTAGES)
  }

  return { percentages, setPercentages, resetToDefault }
}

