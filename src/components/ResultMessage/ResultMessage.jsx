import './ResultMessage.css'

function ResultMessage({ title, text, variant = 'success' }) {
  return (
    <div className={`result result--${variant}`}>
      <span className="result__icon">✓</span>
      <h1 className="result__title">{title}</h1>
      <p className="result__text">{text}</p>
    </div>
  )
}

export default ResultMessage
