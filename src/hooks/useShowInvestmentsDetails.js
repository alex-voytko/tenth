import { useState, useEffect } from 'react'

export const useShowInvestmentsDetails = () => {
  const [showDetails, setShowDetails] = useState(() => {
    const saved = localStorage.getItem('showInvestmentsDetails')
    return saved ? JSON.parse(saved) : false
  })

  useEffect(() => {
    localStorage.setItem('showInvestmentsDetails', JSON.stringify(showDetails))
  }, [showDetails])

  return { showDetails, setShowDetails }
}

