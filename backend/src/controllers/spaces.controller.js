import db from '../db.js'
 
const SPACE_TYPES = ['Todos', 'Sala', 'Laboratorio', 'Auditorio']
 
function toSpace(row) {
  return { ...row, features: JSON.parse(row.features) }
}
 
export function getSpaces(req, res) {
  const spaceType = req.query.tipo || 'Todos'
 
  if (!SPACE_TYPES.includes(spaceType)) {
    return res.status(400).json({ error: 'Tipo de espacio no válido' })
  }
 
  const rows = spaceType === 'Todos'
    ? db.prepare('SELECT * FROM spaces').all()
    : db.prepare('SELECT * FROM spaces WHERE type = ?').all(spaceType)
 
  res.json(rows.map(toSpace))
}
 
export function getSpaceById(req, res) {
  const id = Number(req.params.id)
 
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: 'El id debe ser un número' })
  }
 
  const row = db.prepare('SELECT * FROM spaces WHERE id = ?').get(id)
 
  if (!row) {
    return res.status(404).json({ error: 'Espacio no encontrado' })
  }
 
  res.json(toSpace(row))
}