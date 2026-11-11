import db from '../db.js'
 
const SELECT_RESERVATIONS = `
  SELECT reservations.code, reservations.spaceId, reservations.date,
         reservations.time, reservations.status,
         spaces.name AS spaceName, spaces.building, spaces.floor, spaces.capacity
  FROM reservations
  JOIN spaces ON spaces.id = reservations.spaceId
`
 
function findReservation(code) {
  return db.prepare(`${SELECT_RESERVATIONS} WHERE reservations.code = ?`).get(code)
}
 
export function getReservations(req, res) {
  const rows = db.prepare(`${SELECT_RESERVATIONS} ORDER BY reservations.rowid DESC`).all()
  res.json(rows)
}
 
export function getReservationByCode(req, res) {
  const reservation = findReservation(req.params.codigo)
 
  if (!reservation) {
    return res.status(404).json({ error: 'Reserva no encontrada' })
  }
 
  res.json(reservation)
}
 
export function createReservation(req, res) {
  const { spaceId, date, time } = req.body
 
  if (!spaceId || !date || !time) {
    return res.status(400).json({ error: 'Faltan datos: spaceId, date y time' })
  }
 
  const space = db.prepare('SELECT id FROM spaces WHERE id = ?').get(Number(spaceId))
 
  if (!space) {
    return res.status(400).json({ error: 'El espacio no existe' })
  }
 
  const { total } = db.prepare('SELECT COUNT(*) AS total FROM reservations').get()
  const dayMonth = date.slice(0, 2) + date.slice(3, 5)
  const code = `UE-${dayMonth}-${String(total + 1).padStart(3, '0')}`
 
  db.prepare(`
    INSERT INTO reservations (code, spaceId, date, time, status)
    VALUES (?, ?, ?, ?, 'Confirmada')
  `).run(code, Number(spaceId), date, time)
 
  res.status(201).json(findReservation(code))
}
 
export function cancelReservation(req, res) {
  const reservation = findReservation(req.params.codigo)
 
  if (!reservation) {
    return res.status(404).json({ error: 'Reserva no encontrada' })
  }
 
  if (reservation.status === 'Cancelada') {
    return res.status(400).json({ error: 'La reserva ya está cancelada' })
  }
 
  db.prepare("UPDATE reservations SET status = 'Cancelada' WHERE code = ?")
    .run(reservation.code)
 
  res.json(findReservation(reservation.code))
}
