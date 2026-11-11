import { useState, useEffect } from 'react'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import Button from '../components/Button/Button.jsx'
import InfoBox from '../components/InfoBox/InfoBox.jsx'
import './SpaceDetailPage.css'
 
function SpaceDetailPage() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
 
  const from = searchParams.get('desde') || '15:00'
  const to = searchParams.get('hasta') || '17:00'
 
  const [space, setSpace] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
 
  useEffect(() => {
    async function loadSpace() {
      try {
        const response = await fetch(`/api/espacios/${id}`)
        const data = await response.json()
 
        if (response.ok) {
          setSpace(data)
        } else {
          setError(data.error)
        }
      } catch {
        setError('No se pudo conectar con la API. ¿Está encendida?')
      } finally {
        setLoading(false)
      }
    }
 
    loadSpace()
  }, [id])
 
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
    <main className="page detail-page">
      <div>
        <h1>{space.name}</h1>
        <p>{space.building} · Piso {space.floor}</p>
      </div>
 
      <div className="detail-page__view">{space.initials}</div>
 
      <div className="detail-page__data">
        <div>
          <span className="detail-page__label">Capacidad</span>
          <strong className="detail-page__value">{space.capacity} personas</strong>
        </div>
        <div>
          <span className="detail-page__label">Horario</span>
          <strong className="detail-page__value">{from}–{to}</strong>
        </div>
        <span className="detail-page__badge">Disponible</span>
      </div>
 
      <h2>Características</h2>
      <ul className="detail-page__features">
        {space.features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
 
      <Button onClick={() => navigate(`/reservar/${space.id}?${searchParams.toString()}`)}>Reservar espacio</Button>
      <Button variant="secondary" onClick={() => navigate(-1)}>Volver a resultados</Button>
    </main>
  )
}
 
export default SpaceDetailPage
