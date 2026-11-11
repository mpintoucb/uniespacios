import './InfoBox.css'

function InfoBox({ title, text, variant = 'info' }) {
  return (
    <div className={`infobox infobox--${variant}`}>
      {title && <strong className="infobox__title">{title}</strong>}
      <span className="infobox__text">{text}</span>
    </div>
  )
}

export default InfoBox
