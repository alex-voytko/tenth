import '../App.css'

export const ThemeToggler = ({ theme, onToggle, ariaLabel }) => {
  return (
    <button 
      className="theme-toggle" 
      onClick={onToggle}
      aria-label={ariaLabel}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  )
}

