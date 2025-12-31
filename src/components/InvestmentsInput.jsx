import '../App.css'

export const InvestmentsInput = ({ translations, showDetails, onShowDetailsChange }) => {
  return (
    <>
      <div className="input-section">
        <div className="checkbox-wrapper">
          <input
            id="show-investments-details"
            type="checkbox"
            checked={showDetails}
            onChange={(e) => onShowDetailsChange(e.target.checked)}
            className="checkbox-input"
          />
          <label htmlFor="show-investments-details" className="checkbox-label">
            {translations.investments.showDetailsLabel}
          </label>
        </div>
      </div>
    </>
  )
}

