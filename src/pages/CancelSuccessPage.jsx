import { useSearchParams, useNavigate } from 'react-router-dom'
import Button from '../components/Button/Button.jsx'
import DetailRow from '../components/DetailRow/DetailRow.jsx'
import StatusBadge from '../components/StatusBadge/StatusBadge.jsx'
import InfoBox from '../components/InfoBox/InfoBox.jsx'
import ResultMessage from '../components/ResultMessage/ResultMessage.jsx'
import useApi from '../hooks/useApi.js'
 
function CancelSuccessPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const code = searchParams.get('codigo')
  const { data: reservation, loading, error } = useApi(`/api/reservas/${code}`)
 
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
      <ResultMessage variant="cancel" title="Reserva cancelada" text="La cancelación se registró correctamente." />
 
      <section className="summary-card">
        <div>
          <strong className="summary-card__title">{reservation.spaceName}</strong>
          <span className="summary-card__subtitle">{reservation.date} · {reservation.time}</span>
        </div>
        <StatusBadge status={reservation.status} />
        <DetailRow label="Código de reserva" value={reservation.code} />
        <span className="summary-card__subtitle">El espacio vuelve a estar disponible.</span>
      </section>
 
      <Button onClick={() => navigate('/mis-reservas')}>Ver mis reservas</Button>
      <Button variant="secondary" onClick={() => navigate('/')}>Volver al inicio</Button>
    </main>
  )
}
 
export default CancelSuccessPage
