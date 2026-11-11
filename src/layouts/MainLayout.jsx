import { Outlet } from 'react-router-dom'
import Header from '../components/Header/Header.jsx'
import BottomNavigation from '../components/BottomNavigation/BottomNavigation.jsx'
 
function MainLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <BottomNavigation />
    </>
  )
}
 
export default MainLayout