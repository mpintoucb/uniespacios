import './BottomNavigation.css'
 
function BottomNavigation() {
  return (
    <nav className="bottom-nav">
      <span className="bottom-nav__item bottom-nav__item--active">Inicio</span>
      <span className="bottom-nav__item">Reservas</span>
      <span className="bottom-nav__item">Perfil</span>
    </nav>
  )
}
 
export default BottomNavigation
