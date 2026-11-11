import { useSearchParams, useNavigate } from 'react-router-dom'
import Button from '../components/Button/Button.jsx'
import DetailRow from '../components/DetailRow/DetailRow.jsx'
import InfoBox from '../components/InfoBox/InfoBox.jsx'
import ResultMessage from '../components/ResultMessage/ResultMessage.jsx'
import useApi from '../hooks/useApi.js'
 
function BookingSuccessPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const code = searchParams.get('codigo')
  const { data: reservation, loading, error } = useApi(`/api/reservas/${code}`)
 
  if (loading) {
    return (
      <main className="page">
        <InfoBox title="Cargando…" text="Buscando tu reserva." />
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
      <ResultMessage title="Reserva realizada" text="Tu espacio quedó reservado correctamente." />
 
      <section className="summary-card">
        <div>
          <strong className="summary-card__title">{reservation.spaceName}</strong>
          <span className="summary-card__subtitle">{reservation.building} · Piso {reservation.floor}</span>
        </div>
        <DetailRow label="Fecha" value={reservation.date} />
        <DetailRow label="Horario" value={reservation.time} />
        <DetailRow label="Estado" value={reservation.status} variant="success" />
        <span className="summary-card__subtitle">Código: {reservation.code}</span>
      </section>
 
      <Button onClick={() => navigate('/mis-reservas')}>Ver mis reservas</Button>
      <Button variant="secondary" onClick={() => navigate('/')}>Volver al inicio</Button>
    </main>
  )
}
 
export default BookingSuccessPage
