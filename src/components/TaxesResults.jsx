import '../App.css'

export const TaxesResults = ({ results, translations, formatNumber }) => {
  if (!results) return null

  return (
    <div className="results">
      <h2>{translations.resultsTitle}</h2>
      
      <div className="summary-container">
        <div className="remaining">
          <span className="remaining-label">{translations.payments.taxAmountLabel}</span>
          <span className="remaining-amount">
            {formatNumber(results.taxAmount)}
          </span>
        </div>
        
        {results.taxFee > 0 && (
          <div className="remaining">
            <span className="remaining-label">{translations.payments.taxFeeDeductedLabel}</span>
            <span className="remaining-amount">
              {formatNumber(results.taxFee)}
            </span>
          </div>
        )}
        
        {results.salaries > 0 && (
          <div className="remaining">
            <span className="remaining-label">{translations.payments.salariesDeductedLabel}</span>
            <span className="remaining-amount">
              {formatNumber(results.salaries)}
            </span>
          </div>
        )}
        
        <div className="remaining">
          <span className="remaining-label">{translations.remainingLabel}</span>
          <span className="remaining-amount">
            {formatNumber(results.afterTax)}
          </span>
        </div>
      </div>
    </div>
  )
}

