import { currencies } from '../constants/currencies'
import '../App.css'

export const CurrencySelect = ({ currency, onCurrencyChange }) => {
  return (
    <select 
      className="currency-select"
      value={currency}
      onChange={(e) => onCurrencyChange(e.target.value)}
      aria-label="Select currency"
    >
      {currencies.map((curr) => (
        <option key={curr.code} value={curr.code}>
          {curr.symbol}
        </option>
      ))}
    </select>
  )
}

