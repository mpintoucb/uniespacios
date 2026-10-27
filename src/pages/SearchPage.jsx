import { useState } from 'react'
import FormField from '../components/FormField/FormField.jsx'
import Button from '../components/Button/Button.jsx'
import InfoBox from '../components/InfoBox/InfoBox.jsx'
import SpaceCard from '../components/SpaceCard/SpaceCard.jsx'
import spaces from '../data/spaces.js'
import './SearchPage.css'
 
function SearchPage() {
  const [spaceType, setSpaceType] = useState('Todos')
  const [searched, setSearched] = useState(false)
 
  const visibleSpaces = spaceType === 'Todos'
    ? spaces
    : spaces.filter((space) => space.type === spaceType)
 
  return (
    <main className="page search-page">
      <div>
        <h1>Encuentra un espacio</h1>
        <p>Selecciona fecha, horario y tipo de espacio.</p>
      </div>
 
      <FormField label="Fecha" type="date" defaultValue="2026-09-22" />
 
      <h2>Horario</h2>
      <div className="search-page__row">
        <FormField label="Desde" type="time" defaultValue="15:00" />
        <FormField label="Hasta" type="time" defaultValue="17:00" />
      </div>
 
      <FormField
        label="Tipo de espacio"
        options={['Todos', 'Sala', 'Laboratorio', 'Auditorio']}
        value={spaceType}
        onChange={(event) => setSpaceType(event.target.value)}
      />
 
      <Button onClick={() => setSearched(true)}>Buscar espacios</Button>
 
      <InfoBox
        title="Consulta rápida"
        text="Mostraremos solo espacios disponibles para el rango seleccionado."
      />
 
      {searched && (
        <section className="search-page__results">
          <h2>Espacios disponibles ({visibleSpaces.length})</h2>
 
          {visibleSpaces.map((space) => (
            <SpaceCard
              key={space.id}
              initials={space.initials}
              name={space.name}
              capacity={space.capacity}
              building={space.building}
            />
          ))}
 
          {visibleSpaces.length === 0 && (
            <InfoBox
              variant="alert"
              title="Sin resultados"
              text="No hay espacios de este tipo. Prueba con otro tipo de espacio."
            />
          )}
        </section>
      )}
    </main>
  )
}
export default SearchPage