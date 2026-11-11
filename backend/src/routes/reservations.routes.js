import { Router } from 'express'
import {
  getReservations,
  getReservationByCode,
  createReservation,
  cancelReservation,
} from '../controllers/reservations.controller.js'
 
const router = Router()
 
router.get('/', getReservations)
router.get('/:codigo', getReservationByCode)
router.post('/', createReservation)
router.delete('/:codigo', cancelReservation)
 
export default router
