import Header from './components/Header/Header.jsx'
import BottomNavigation from './components/BottomNavigation/BottomNavigation.jsx'
 
function App() {
  return (
    <>
      <Header />
      <main className="page">
        <h1>Encuentra un espacio</h1>
        <p>Selecciona fecha, horario y tipo de espacio.</p>
      </main>
      <BottomNavigation />
    </>
  )
}
 
export default App
