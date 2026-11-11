import { DatabaseSync } from 'node:sqlite'
import spaces from './data/spaces.js'
import reservations from './data/reservations.js'
 
const db = new DatabaseSync('uniespacios.db')
 
db.exec(`
  CREATE TABLE IF NOT EXISTS spaces (
    id INTEGER PRIMARY KEY,
    initials TEXT NOT NULL,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    capacity INTEGER NOT NULL,
    building TEXT NOT NULL,
    floor INTEGER NOT NULL,
    features TEXT NOT NULL
  )
`)
 
db.exec(`
  CREATE TABLE IF NOT EXISTS reservations (
    code TEXT PRIMARY KEY,
    spaceId INTEGER NOT NULL REFERENCES spaces(id),
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Confirmada'
  )
`)
 
const { total } = db.prepare('SELECT COUNT(*) AS total FROM spaces').get()
 
if (total === 0) {
  const insertSpace = db.prepare(`
    INSERT INTO spaces (id, initials, name, type, capacity, building, floor, features)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `)
  for (const space of spaces) {
    insertSpace.run(space.id, space.initials, space.name, space.type,
      space.capacity, space.building, space.floor, JSON.stringify(space.features))
  }
 
  const insertReservation = db.prepare(`
    INSERT INTO reservations (code, spaceId, date, time, status)
    VALUES (?, ?, ?, ?, ?)
  `)
  for (const reservation of reservations) {
    insertReservation.run(reservation.code, reservation.spaceId,
      reservation.date, reservation.time, reservation.status)
  }
 
  console.log('Base de datos creada con los datos iniciales')
}
 
export default db