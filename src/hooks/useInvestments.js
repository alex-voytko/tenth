import { useState, useEffect } from 'react'
import {
  DEFAULT_INITIAL_DEPOSIT,
  DEFAULT_REGULAR_CONTRIBUTION,
  DEFAULT_CONTRIBUTION_FREQUENCY,
  DEFAULT_ANNUAL_RATE,
  DEFAULT_CAPITALIZATION,
  DEFAULT_PERIOD
} from '../constants/defaultSettings'

export const useInvestments = () => {
  const [initialDeposit, setInitialDeposit] = useState(() => {
    const saved = localStorage.getItem('initialDeposit')
    return saved ? parseFloat(saved) : DEFAULT_INITIAL_DEPOSIT
  })

  const [regularContribution, setRegularContribution] = useState(() => {
    const saved = localStorage.getItem('regularContribution')
    return saved ? parseFloat(saved) : DEFAULT_REGULAR_CONTRIBUTION
  })

  const [contributionFrequency, setContributionFrequency] = useState(() => {
    const saved = localStorage.getItem('contributionFrequency')
    return saved || DEFAULT_CONTRIBUTION_FREQUENCY
  })

  const [annualRate, setAnnualRate] = useState(() => {
    const saved = localStorage.getItem('annualRate')
    return saved ? parseFloat(saved) : DEFAULT_ANNUAL_RATE
  })

  const [capitalization, setCapitalization] = useState(() => {
    const saved = localStorage.getItem('capitalization')
    return saved || DEFAULT_CAPITALIZATION
  })

  const [period, setPeriod] = useState(() => {
    const saved = localStorage.getItem('investmentPeriod')
    return saved ? parseFloat(saved) : DEFAULT_PERIOD
  })

  useEffect(() => {
    localStorage.setItem('initialDeposit', initialDeposit.toString())
  }, [initialDeposit])

  useEffect(() => {
    localStorage.setItem('regularContribution', regularContribution.toString())
  }, [regularContribution])

  useEffect(() => {
    localStorage.setItem('contributionFrequency', contributionFrequency)
  }, [contributionFrequency])

  useEffect(() => {
    localStorage.setItem('annualRate', annualRate.toString())
  }, [annualRate])

  useEffect(() => {
    localStorage.setItem('capitalization', capitalization)
  }, [capitalization])

  useEffect(() => {
    localStorage.setItem('investmentPeriod', period.toString())
  }, [period])

  return {
    initialDeposit,
    setInitialDeposit,
    regularContribution,
    setRegularContribution,
    contributionFrequency,
    setContributionFrequency,
    annualRate,
    setAnnualRate,
    capitalization,
    setCapitalization,
    period,
    setPeriod
  }
}

