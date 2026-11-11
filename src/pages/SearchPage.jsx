import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormField from '../components/FormField/FormField.jsx'
import Button from '../components/Button/Button.jsx'
import InfoBox from '../components/InfoBox/InfoBox.jsx'
import './SearchPage.css'
 
function SearchPage() {
  const [spaceType, setSpaceType] = useState('Todos')
  const [date, setDate] = useState('2026-09-22')
  const [from, setFrom] = useState('15:00')
  const [to, setTo] = useState('17:00')
  const navigate = useNavigate()
 
  const invalidTime = to <= from
 
  function handleSearch() {
    if (invalidTime) return
    navigate(`/resultados?tipo=${spaceType}&fecha=${date}&desde=${from}&hasta=${to}`)
  }
 
  return (
    <main className="page search-page">
      <div>
        <h1>Encuentra un espacio</h1>
        <p>Selecciona fecha, horario y tipo de espacio.</p>
      </div>
 
      <FormField label="Fecha" type="date" value={date} onChange={(event) => setDate(event.target.value)} />
 
      <h2>Horario</h2>
      <div className="search-page__row">
        <FormField label="Desde" type="time" value={from} onChange={(event) => setFrom(event.target.value)} />
        <FormField label="Hasta" type="time" value={to} onChange={(event) => setTo(event.target.value)} />
      </div>
 
      {invalidTime && (
        <InfoBox variant="alert" title="Revisa el horario" text="«Hasta» debe ser posterior a «Desde»." />
      )}
 
      <FormField
        label="Tipo de espacio"
        options={['Todos', 'Sala', 'Laboratorio', 'Auditorio']}
        value={spaceType}
        onChange={(event) => setSpaceType(event.target.value)}
      />
 
      <Button onClick={handleSearch}>Buscar espacios</Button>
 
      <InfoBox
        title="Consulta rápida"
        text="Mostraremos solo espacios disponibles para el rango seleccionado."
      />
    </main>
  )
}
 
export default SearchPage