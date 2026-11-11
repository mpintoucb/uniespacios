import { NavLink } from 'react-router-dom'
import './BottomNavigation.css'
 
function BottomNavigation() {
  const tabs = [
    { label: 'Inicio', to: '/' },
    { label: 'Reservas', to: '/mis-reservas' },
    { label: 'Perfil', to: '/perfil' },
  ]
 
  return (
    <nav className="bottom-nav">
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.to === '/'}
          className={({ isActive }) => (isActive ? 'bottom-nav__item bottom-nav__item--active' : 'bottom-nav__item')}
        >
          {tab.label}
        </NavLink>
      ))}
    </nav>
  )
}
 
export default BottomNavigation
