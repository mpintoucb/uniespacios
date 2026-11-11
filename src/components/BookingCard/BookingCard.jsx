import { Link } from 'react-router-dom'
import StatusBadge from '../StatusBadge/StatusBadge.jsx'
import './BookingCard.css'

function BookingCard({ spaceName, date, time, building, status, to }) {
  return (
    <article className="booking-card">
      <div className="booking-card__top">
        <strong className="booking-card__title">{spaceName}</strong>
        <StatusBadge status={status} />
      </div>
      <span className="booking-card__when">{date} · {time}</span>
      <span className="booking-card__building">{building}</span>
      <Link className="booking-card__link" to={to}>Gestionar →</Link>
    </article>
  )
}

export default BookingCard