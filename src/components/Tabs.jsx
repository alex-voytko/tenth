import '../App.css'

export const Tabs = ({ activeTab, onTabChange, translations }) => {
  const tabs = [
    { id: 'payments', label: translations.tabs.payments },
    { id: 'charity', label: translations.tabs.charity },
    { id: 'investments', label: translations.tabs.investments }
  ]

  return (
    <div className="tabs-container">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onTabChange(tab.id)}
          aria-label={tab.label}
          aria-selected={activeTab === tab.id}
          role="tab"
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

