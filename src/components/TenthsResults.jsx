import '../App.css'

export const TenthsResults = ({ results, translations, formatNumber }) => {
  if (!results) return null

  return (
    <div className="results">
      <h2>{translations.resultsTitle}</h2>
      
      <div className="tenths-list">
        {results.tenths.map((tenth) => (
          <div key={tenth.number} className="tenth-item">
            <span className="tenth-number">
              <span className="percent-badge">({tenth.percent}%)</span>
              {tenth.number}.
            </span>
            <span className="tenth-amount">
              {formatNumber(tenth.amount)}
            </span>
          </div>
        ))}
      </div>

      <div className="summary-container">
        <div className="remaining">
          <span className="remaining-label">{translations.totalPercentagesLabel}</span>
          <span className="remaining-amount">
            {formatNumber(results.totalPercentages)}
          </span>
        </div>
        <div className="remaining">
          <span className="remaining-label">{translations.remainingLabel}</span>
          <span className="remaining-amount">
            {formatNumber(results.remaining)}
          </span>
        </div>
      </div>
    </div>
  )
}

