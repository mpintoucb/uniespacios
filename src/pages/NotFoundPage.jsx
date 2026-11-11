import { Link } from 'react-router-dom'
 
function NotFoundPage() {
  return (
    <main className="page">
      <h1>Página no encontrada</h1>
      <p>La dirección no existe en UniEspacios.</p>
      <Link to="/">Volver al inicio</Link>
    </main>
  )
}
 
export default NotFoundPage
