import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import FilterSummary from '../components/FilterSummary/FilterSummary.jsx'
import SpaceCard from '../components/SpaceCard/SpaceCard.jsx'
import InfoBox from '../components/InfoBox/InfoBox.jsx'
import './ResultsPage.css'
 
function ResultsPage() {
  const [searchParams] = useSearchParams()
  const spaceType = searchParams.get('tipo') || 'Todos'
  const date = searchParams.get('fecha') || '2026-09-22'
  const from = searchParams.get('desde') || '15:00'
  const to = searchParams.get('hasta') || '17:00'
 
  const [spaces, setSpaces] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
 
  useEffect(() => {
    async function loadSpaces() {
      try {
        const response = await fetch(`/api/espacios?tipo=${spaceType}`)
        const data = await response.json()
 
        if (response.ok) {
          setSpaces(data)
        } else {
          setError(data.error)
        }
      } catch {
        setError('No se pudo conectar con la API. ¿Está encendida?')
      } finally {
        setLoading(false)
      }
    }
 
    loadSpaces()
  }, [spaceType])
 
  return (
    <main className="page results-page">
      <h1>Espacios disponibles</h1>
 
      <FilterSummary date={date} from={from} to={to} spaceType={spaceType} />
 
      {loading && <InfoBox title="Cargando…" text="Buscando espacios disponibles." />}
 
      {error && <InfoBox variant="alert" title="No se pudo cargar" text={error} />}
 
      {spaces.map((space) => (
        <SpaceCard
          key={space.id}
          initials={space.initials}
          name={space.name}
          capacity={space.capacity}
          building={space.building}
          to={`/espacios/${space.id}?${searchParams.toString()}`}
        />
      ))}
 
      {!loading && !error && spaces.length === 0 && (
        <InfoBox
          variant="alert"
          title="Sin resultados"
          text="No hay espacios de este tipo. Vuelve atrás y prueba con otro tipo de espacio."
        />
      )}
    </main>
  )
}
 
export default ResultsPage
