import '../App.css'

export const InvestmentsTable = ({ detailsTable, translations, formatNumber }) => {
  if (!detailsTable || detailsTable.length === 0) return null

  return (
    <div className="investments-details-table">
      <div className="table-wrapper">
        <table className="details-table">
          <thead>
            <tr>
              <th>{translations.investments.tablePeriodLabel}</th>
              <th>{translations.investments.contributionLabel}</th>
              <th>{translations.investments.balanceBeforeLabel}</th>
              <th>{translations.investments.interestLabel}</th>
              <th>{translations.investments.balanceAfterLabel}</th>
            </tr>
          </thead>
          <tbody>
            {detailsTable.map((row, index) => (
              <tr key={index}>
                <td>{row.periodLabel}</td>
                <td>{formatNumber(row.contribution)}</td>
                <td>{formatNumber(row.balanceBefore)}</td>
                <td>{formatNumber(row.interest)}</td>
                <td>{formatNumber(row.balanceAfter)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

