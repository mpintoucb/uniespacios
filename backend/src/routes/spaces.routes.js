import { Router } from 'express'
import { getSpaces, getSpaceById } from '../controllers/spaces.controller.js'
 
const router = Router()
 
router.get('/', getSpaces)
router.get('/:id', getSpaceById)
 
export default router
