import { Router } from 'express'
import * as taskController from '../controllers/task'

const router = Router()

router.get('/tasks', (_req, res, next) => taskController.getTasks(_req, res, next))
router.get('/tasks/:id', (req, res, next) => taskController.getTaskById(req, res, next))
router.post('/tasks', (req, res, next) => taskController.createTask(req, res, next))
router.put('/tasks/:id', (req, res, next) => taskController.updateTask(req, res, next))
router.delete('/tasks/:id', (req, res, next) => taskController.deleteTask(req, res, next))

export default router