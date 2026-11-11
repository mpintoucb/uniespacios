import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout.jsx'
import SearchPage from './pages/SearchPage.jsx'
import ResultsPage from './pages/ResultsPage.jsx'
import SpaceDetailPage from './pages/SpaceDetailPage.jsx'
import ConfirmBookingPage from './pages/ConfirmBookingPage.jsx'
import BookingSuccessPage from './pages/BookingSuccessPage.jsx'
import MyBookingsPage from './pages/MyBookingsPage.jsx'
import BookingDetailPage from './pages/BookingDetailPage.jsx'
import CancelBookingPage from './pages/CancelBookingPage.jsx'
import CancelSuccessPage from './pages/CancelSuccessPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<SearchPage />} />
        <Route path="/resultados" element={<ResultsPage />} />
        <Route path="/espacios/:id" element={<SpaceDetailPage />} />
        <Route path="/reservar/:id" element={<ConfirmBookingPage />} />
        <Route path="/reserva-realizada" element={<BookingSuccessPage />} />
        <Route path="/mis-reservas" element={<MyBookingsPage />} />
        <Route path="/mis-reservas/:codigo" element={<BookingDetailPage />} />
        <Route path="/mis-reservas/:codigo/cancelar" element={<CancelBookingPage />} />
        <Route path="/reserva-cancelada" element={<CancelSuccessPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App