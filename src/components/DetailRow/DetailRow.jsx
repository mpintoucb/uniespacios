import './DetailRow.css'

function DetailRow({ label, value, variant = 'default' }) {
  return (
    <div className="detail-row">
      <span className="detail-row__label">{label}</span>
      <strong className={`detail-row__value detail-row__value--${variant}`}>{value}</strong>
    </div>
  )
}

export default DetailRow
