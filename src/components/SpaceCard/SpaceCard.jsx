import './SpaceCard.css'
 
function SpaceCard({ initials, name, capacity, building }) {
  return (
    <article className="card">
      <span className="card__thumb">{initials}</span>
      <div className="card__body">
        <strong className="card__title">{name}</strong>
        <span className="card__info">{capacity} personas · {building}</span>
        <span className="card__badge">Disponible</span>
        <span className="card__link">Ver detalle →</span>
      </div>
    </article>
  )
}
 
export default SpaceCard
