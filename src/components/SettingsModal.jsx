import { useState } from 'react'
import { 
  MIN_PERCENTAGES, 
  MAX_PERCENTAGES, 
  MIN_PERCENT_VALUE, 
  MAX_PERCENT_VALUE 
} from '../constants/defaultSettings'
import '../App.css'

export const SettingsModal = ({ 
  isOpen, 
  onClose, 
  percentages, 
  onSave, 
  onReset,
  translations 
}) => {
  const [tempPercentages, setTempPercentages] = useState([...percentages])
  const [errors, setErrors] = useState([])

  if (!isOpen) return null

  const validatePercentage = (value) => {
    const num = parseFloat(value)
    return !isNaN(num) && num >= MIN_PERCENT_VALUE && num <= MAX_PERCENT_VALUE
  }

  const handlePercentageChange = (index, value) => {
    const newPercentages = [...tempPercentages]
    newPercentages[index] = value
    setTempPercentages(newPercentages)
    
    // Validation
    const newErrors = [...errors]
    if (value === '' || validatePercentage(value)) {
      newErrors[index] = false
    } else {
      newErrors[index] = true
    }
    setErrors(newErrors)
  }

  const handleAddPercentage = () => {
    if (tempPercentages.length < MAX_PERCENTAGES) {
      setTempPercentages([...tempPercentages, 10])
      setErrors([...errors, false])
    }
  }

  const handleRemovePercentage = (index) => {
    if (tempPercentages.length > MIN_PERCENTAGES) {
      const newPercentages = tempPercentages.filter((_, i) => i !== index)
      const newErrors = errors.filter((_, i) => i !== index)
      setTempPercentages(newPercentages)
      setErrors(newErrors)
    }
  }

  const handleSave = () => {
    // Validate all values
    const allValid = tempPercentages.every(p => validatePercentage(p))
    if (allValid && tempPercentages.length >= MIN_PERCENTAGES) {
      onSave(tempPercentages.map(p => parseFloat(p)))
      onClose()
    }
  }

  const handleReset = () => {
    onReset()
    onClose()
  }

  const canSave = tempPercentages.every(p => validatePercentage(p)) && 
                  tempPercentages.length >= MIN_PERCENTAGES &&
                  tempPercentages.length <= MAX_PERCENTAGES

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button 
          className="modal-close-button" 
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>
        <h2>{translations.settingsTitle}</h2>
        
        <div className="percentages-list">
          {tempPercentages.map((percentage, index) => (
            <div key={index} className="percentage-item">
              <label htmlFor={`percentage-${index}`}>
                {translations.percentLabel} {index + 1}:
              </label>
              <div className="percentage-input-group">
                <input
                  id={`percentage-${index}`}
                  type="number"
                  min={MIN_PERCENT_VALUE}
                  max={MAX_PERCENT_VALUE}
                  step="1"
                  value={percentage}
                  onChange={(e) => handlePercentageChange(index, e.target.value)}
                  className={errors[index] ? 'error' : ''}
                />
                <span className="percent-sign">%</span>
                {tempPercentages.length > MIN_PERCENTAGES && (
                  <button
                    className="remove-button"
                    onClick={() => handleRemovePercentage(index)}
                    aria-label={translations.removePercent}
                  >
                    ✕
                  </button>
                )}
              </div>
              {errors[index] && (
                <span className="error-message">
                  {translations.percentError}
                </span>
              )}
            </div>
          ))}
        </div>

        {tempPercentages.length < MAX_PERCENTAGES && (
          <button 
            className="add-button"
            onClick={handleAddPercentage}
          >
            + {translations.addPercent}
          </button>
        )}

        <div className="modal-actions">
          <button 
            className="button-secondary"
            onClick={handleReset}
          >
            {translations.resetButton}
          </button>
          <div className="modal-actions-right">
            <button 
              className="button-secondary"
              onClick={onClose}
            >
              {translations.cancelButton}
            </button>
            <button 
              className="button-primary"
              onClick={handleSave}
              disabled={!canSave}
            >
              {translations.saveButton}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

