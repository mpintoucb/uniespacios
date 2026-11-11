import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Button from '../components/Button/Button.jsx'
import DetailRow from '../components/DetailRow/DetailRow.jsx'
import InfoBox from '../components/InfoBox/InfoBox.jsx'
import useApi from '../hooks/useApi.js'
 
function CancelBookingPage() {
  const { codigo } = useParams()
  const navigate = useNavigate()
  const { data: reservation, loading, error } = useApi(`/api/reservas/${codigo}`)
  const [cancelError, setCancelError] = useState('')
 
  async function handleCancel() {
    try {
      const response = await fetch(`/api/reservas/${codigo}`, { method: 'DELETE' })
      const data = await response.json()
 
      if (response.ok) {
        navigate(`/reserva-cancelada?codigo=${data.code}`)
      } else {
        setCancelError(data.error)
      }
    } catch {
      setCancelError('No se pudo conectar con la API. ¿Está encendida?')
    }
  }
 
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
      <div>
        <h1>¿Cancelar esta reserva?</h1>
        <p>Esta acción requiere confirmación.</p>
      </div>
 
      <InfoBox variant="alert" title="Atención" text="La reserva dejará de estar disponible para ti al confirmar la cancelación." />
 
      <section className="summary-card">
        <div>
          <strong className="summary-card__title">{reservation.spaceName}</strong>
          <span className="summary-card__subtitle">{reservation.building} · Piso {reservation.floor}</span>
        </div>
        <DetailRow label="Fecha" value={reservation.date} />
        <DetailRow label="Horario" value={reservation.time} />
        <DetailRow label="Código" value={reservation.code} />
      </section>
 
      {cancelError && <InfoBox variant="alert" title="No se pudo cancelar" text={cancelError} />}
 
      <Button variant="secondary" onClick={() => navigate(-1)}>Volver, mantener reserva</Button>
      <Button variant="danger" onClick={handleCancel}>Confirmar cancelación</Button>
    </main>
  )
}
 
export default CancelBookingPage
