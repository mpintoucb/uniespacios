import { useParams, useNavigate } from 'react-router-dom'
import Button from '../components/Button/Button.jsx'
import DetailRow from '../components/DetailRow/DetailRow.jsx'
import StatusBadge from '../components/StatusBadge/StatusBadge.jsx'
import InfoBox from '../components/InfoBox/InfoBox.jsx'
import useApi from '../hooks/useApi.js'
 
function BookingDetailPage() {
  const { codigo } = useParams()
  const navigate = useNavigate()
  const { data: reservation, loading, error } = useApi(`/api/reservas/${codigo}`)
 
  if (loading) {
    return (
      <main className="page">
        <InfoBox title="Cargando…" text="Buscando la reserva." />
      </main>
    )
  }
 
  if (error) {
    return (
      <main className="page">
        <InfoBox variant="alert" title="No se pudo cargar" text={error} />
      </main>
    )
  }
 
  return (
    <main className="page stack-page">
      <h1>Detalle de reserva</h1>
 
      <section className="summary-card">
        <div>
          <strong className="summary-card__title">{reservation.spaceName}</strong>
          <span className="summary-card__subtitle">{reservation.building} · Piso {reservation.floor}</span>
        </div>
        <StatusBadge status={reservation.status} />
        <DetailRow label="Fecha" value={reservation.date} />
        <DetailRow label="Horario" value={reservation.time} />
        <DetailRow label="Capacidad" value={`${reservation.capacity} personas`} />
        <DetailRow label="Código" value={reservation.code} />
      </section>
 
      {reservation.status === 'Confirmada' && (
        <Button variant="danger" onClick={() => navigate(`/mis-reservas/${reservation.code}/cancelar`)}>
          Cancelar reserva
        </Button>
      )}
      <Button variant="secondary" onClick={() => navigate('/mis-reservas')}>Volver a mis reservas</Button>
    </main>
  )
}
 
export default BookingDetailPage
