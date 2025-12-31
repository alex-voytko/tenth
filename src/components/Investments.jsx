import { useEffect, useState, useMemo } from 'react'
import '../App.css'
import { useInvestments } from '../hooks/useInvestments'
import { useShowInvestmentsDetails } from '../hooks/useShowInvestmentsDetails'
import { InvestmentsInput } from './InvestmentsInput'
import { InvestmentsTable } from './InvestmentsTable'
import { CircleChartWrapper } from './CircleChartWrapper'

export const Investments = ({ 
  translations,
  formatNumber,
  onSettingsChange
}) => {
  const {
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
  } = useInvestments()
  const { showDetails, setShowDetails } = useShowInvestmentsDetails()
  
  const [results, setResults] = useState(null)
  const [detailsTable, setDetailsTable] = useState([])

  // Expose settings to parent for SettingsModal
  useEffect(() => {
    if (onSettingsChange) {
      onSettingsChange({
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
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialDeposit, regularContribution, contributionFrequency, annualRate, capitalization, period])

  useEffect(() => {
    if (period > 0 && annualRate >= 0) {
      calculateCompoundInterest()
      if (showDetails) {
        calculateDetailsTable()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialDeposit, regularContribution, contributionFrequency, annualRate, capitalization, period, showDetails])

  const calculateCompoundInterest = () => {
    // Calculate capitalization periods per year
    const capitalizationPeriodsPerYear = capitalization === 'monthly' ? 12 : 1
    const capitalizationPeriods = capitalizationPeriodsPerYear * period
    
    // Calculate periodic interest rate
    const periodicRate = annualRate / 100 / capitalizationPeriodsPerYear
    
    // Calculate future value of initial deposit with compound interest
    const futureValueInitial = initialDeposit * Math.pow(1 + periodicRate, capitalizationPeriods)
    
    // Calculate future value of regular contributions
    let futureValueContributions = 0
    if (regularContribution > 0) {
      const contributionPeriodsPerYear = contributionFrequency === 'monthly' ? 12 : 1
      const totalContributions = contributionPeriodsPerYear * period
      
      if (capitalization === 'monthly' && contributionFrequency === 'monthly') {
        // Monthly contributions with monthly capitalization
        const monthlyRate = annualRate / 100 / 12
        futureValueContributions = regularContribution * 
          ((Math.pow(1 + monthlyRate, totalContributions) - 1) / monthlyRate)
      } else if (capitalization === 'yearly' && contributionFrequency === 'yearly') {
        // Yearly contributions with yearly capitalization
        const yearlyRate = annualRate / 100
        futureValueContributions = regularContribution * 
          ((Math.pow(1 + yearlyRate, period) - 1) / yearlyRate)
      } else if (capitalization === 'monthly' && contributionFrequency === 'yearly') {
        // Yearly contributions with monthly capitalization
        const monthlyRate = annualRate / 100 / 12
        let accumulated = 0
        for (let year = 0; year < period; year++) {
          accumulated = accumulated * Math.pow(1 + monthlyRate, 12) + regularContribution
        }
        futureValueContributions = accumulated
      } else if (capitalization === 'yearly' && contributionFrequency === 'monthly') {
        // Monthly contributions with yearly capitalization
        // Approximate: accumulate monthly contributions, then compound yearly
        const monthlyContributionsPerYear = regularContribution * 12
        const yearlyRate = annualRate / 100
        let accumulated = 0
        for (let year = 0; year < period; year++) {
          accumulated = (accumulated + monthlyContributionsPerYear) * (1 + yearlyRate)
        }
        futureValueContributions = accumulated
      }
    }
    
    const totalAmount = futureValueInitial + futureValueContributions
    const totalContributions = initialDeposit + (regularContribution * (contributionFrequency === 'monthly' ? 12 : 1) * period)
    const totalInterest = totalAmount - totalContributions

    setResults({
      totalAmount,
      totalContributions,
      totalInterest
    })
  }

  const calculateDetailsTable = () => {
    const table = []
    const capitalizationPeriodsPerYear = capitalization === 'monthly' ? 12 : 1
    const contributionPeriodsPerYear = contributionFrequency === 'monthly' ? 12 : 1
    const periodicRate = annualRate / 100 / capitalizationPeriodsPerYear
    
    let balance = initialDeposit
    const totalPeriods = contributionPeriodsPerYear * period
    
    // Add initial deposit row
    if (initialDeposit > 0) {
      let interest = 0
      if (capitalization === 'monthly') {
        interest = balance * periodicRate
        balance += interest
      }
      table.push({
        period: 0,
        periodLabel: translations.investments.startLabel,
        contribution: initialDeposit,
        balanceBefore: 0,
        interest: interest,
        balanceAfter: balance
      })
    }
    
    // Calculate for each contribution period
    for (let i = 1; i <= totalPeriods; i++) {
      const balanceBefore = balance
      const contribution = regularContribution
      
      // Add contribution
      balance += contribution
      
      // Calculate interest based on capitalization frequency
      let interest = 0
      
      if (capitalization === 'monthly') {
        // Monthly capitalization - calculate interest every month
        interest = balance * periodicRate
        balance += interest
      } else if (capitalization === 'yearly') {
        // Yearly capitalization
        if (contributionFrequency === 'yearly') {
          // For yearly contributions, each period i is already a year
          // Calculate interest at the end of each year
          interest = balance * (annualRate / 100)
          balance += interest
        } else {
          // Monthly contributions with yearly capitalization
          // Calculate interest only at year end (every 12 months)
          const isYearEnd = i % 12 === 0 || i === totalPeriods
          if (isYearEnd) {
            interest = balance * (annualRate / 100)
            balance += interest
          }
        }
      }
      
      let periodLabel = ''
      if (contributionFrequency === 'monthly') {
        periodLabel = `${translations.investments.monthLabel} ${i}`
      } else {
        // For yearly contributions, each i represents a year (1, 2, 3, ...)
        periodLabel = `${translations.investments.yearLabel} ${i}`
      }
      
      table.push({
        period: i,
        periodLabel: periodLabel,
        contribution: contribution,
        balanceBefore: balanceBefore,
        interest: interest,
        balanceAfter: balance
      })
    }
    
    setDetailsTable(table)
  }

  // Подготовка данных для графика
  const chartData = useMemo(() => {
    if (!results || results.totalAmount <= 0) {
      return null
    }

    return [
      {
        label: translations.investments.totalContributionsLabel.replace(':', ''),
        name: 'contributions',
        color: '#667eea', // accent-color из темы
        value: results.totalContributions
      },
      {
        label: translations.investments.totalInterestLabel.replace(':', ''),
        name: 'interest',
        color: '#ffa500', // зеленый цвет для процентов
        value: results.totalInterest
      }
    ]
  }, [results, translations])

  if (!results) return null

  return (
    <div className="results">
      <h2>{translations.resultsTitle}</h2>
      
      <div className="summary-container input-section">
        {chartData && (
          <div className="progress-container">
            <div className="chart-wrapper">
              <CircleChartWrapper data={chartData} />
            </div>
          </div>
        )}
        <div className="remaining">
          <span className="remaining-label">
            <span 
              className="color-indicator" 
              style={{ backgroundColor: '#667eea' }}
            ></span>
            {translations.investments.totalContributionsLabel}
          </span>
          <span className="remaining-amount">
            {formatNumber(results.totalContributions)}
          </span>
        </div>
        <div className="remaining">
          <span className="remaining-label">
            <span 
              className="color-indicator" 
              style={{ backgroundColor: '#ffa500' }}
            ></span>
            {translations.investments.totalInterestLabel}
          </span>
          <span className="remaining-amount">
            {formatNumber(results.totalInterest)}
          </span>
        </div>
        <div className="remaining total-amount-row">
          <span className="remaining-label total-amount-label">{translations.investments.totalAmountLabel}</span>
          <span className="remaining-amount">
            {formatNumber(results.totalAmount)}
          </span>
        </div>
      </div>

      <InvestmentsInput 
        translations={translations}
        showDetails={showDetails}
        onShowDetailsChange={setShowDetails}
      />

      {showDetails && (
        <InvestmentsTable 
          detailsTable={detailsTable}
          translations={translations}
          formatNumber={formatNumber}
        />
      )}
    </div>
  )
}

