import '../App.css'

export const SettingsButton = ({ onClick, ariaLabel }) => {
  return (
    <button 
      className="settings-button" 
      onClick={onClick}
      aria-label={ariaLabel}
    >
      ⚙️
    </button>
  )
}

