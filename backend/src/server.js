import express from 'express'
import spacesRouter from './routes/spaces.routes.js'
import reservationsRouter from './routes/reservations.routes.js'
 
const app = express()
const PORT = 3000
 
app.use(express.json())
 
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})
 
app.use('/api/espacios', spacesRouter)
app.use('/api/reservas', reservationsRouter)
 
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' })
})
 
app.listen(PORT, () => {
  console.log(`API de UniEspacios en http://localhost:${PORT}`)
})
