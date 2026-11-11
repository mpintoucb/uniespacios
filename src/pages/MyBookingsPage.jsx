import BookingCard from '../components/BookingCard/BookingCard.jsx'
import InfoBox from '../components/InfoBox/InfoBox.jsx'
import useApi from '../hooks/useApi.js'
 
function MyBookingsPage() {
  const { data: reservations, loading, error } = useApi('/api/reservas')
 
  return (
    <main className="page stack-page">
      <div>
        <h1>Mis reservas</h1>
        <p>Consulta y gestiona tus espacios reservados.</p>
      </div>
 
      {loading && <InfoBox title="Cargando…" text="Buscando tus reservas." />}
 
      {error && <InfoBox variant="alert" title="No se pudo cargar" text={error} />}
 
      {reservations && reservations.map((reservation) => (
        <BookingCard
          key={reservation.code}
          spaceName={reservation.spaceName}
          date={reservation.date}
          time={reservation.time}
          building={reservation.building}
          status={reservation.status}
          to={`/mis-reservas/${reservation.code}`}
        />
      ))}
 
      {reservations && reservations.length === 0 && (
        <InfoBox title="Aún no tienes reservas" text="Busca un espacio desde Inicio para reservarlo." />
      )}
 
      {reservations && reservations.length > 0 && (
        <InfoBox text="Selecciona una reserva para modificarla o cancelarla." />
      )}
    </main>
  )
}
 
export default MyBookingsPage
