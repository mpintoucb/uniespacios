import { useState } from 'react'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import Button from '../components/Button/Button.jsx'
import DetailRow from '../components/DetailRow/DetailRow.jsx'
import InfoBox from '../components/InfoBox/InfoBox.jsx'
import useApi from '../hooks/useApi.js'
 
function ConfirmBookingPage() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
 
  const date = (searchParams.get('fecha') || '2026-09-22').split('-').reverse().join('/')
  const from = searchParams.get('desde') || '15:00'
  const to = searchParams.get('hasta') || '17:00'
 
  const { data: space, loading, error } = useApi(`/api/espacios/${id}`)
  const [saveError, setSaveError] = useState('')
 
  async function handleConfirm() {
    try {
      const response = await fetch('/api/reservas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ spaceId: space.id, date, time: `${from}–${to}` }),
      })
      const data = await response.json()
 
      if (response.ok) {
        navigate(`/reserva-realizada?codigo=${data.code}`)
      } else {
        setSaveError(data.error)
      }
    } catch {
      setSaveError('No se pudo conectar con la API. ¿Está encendida?')
    }
  }
 
  if (loading) {
    return (
      <main className="page">
        <InfoBox title="Cargando…" text="Buscando el espacio." />
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
        <h1>Confirma tu reserva</h1>
        <p>Revisa los datos antes de confirmar.</p>
      </div>
 
      <section className="summary-card">
        <div>
          <strong className="summary-card__title">{space.name}</strong>
          <span className="summary-card__subtitle">{space.building} · Piso {space.floor}</span>
        </div>
        <DetailRow label="Fecha" value={date} />
        <DetailRow label="Horario" value={`${from}–${to}`} />
        <DetailRow label="Capacidad" value={`${space.capacity} personas`} />
        <DetailRow label="Estado" value="Disponible" variant="success" />
      </section>
 
      <InfoBox text="Al confirmar, el espacio quedará reservado para el horario seleccionado." />
 
      {saveError && <InfoBox variant="alert" title="No se pudo reservar" text={saveError} />}
 
      <Button onClick={handleConfirm}>Confirmar reserva</Button>
      <Button variant="secondary" onClick={() => navigate(-1)}>Volver</Button>
    </main>
  )
}
 
export default ConfirmBookingPage