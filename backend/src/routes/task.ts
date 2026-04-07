import { Router } from 'express'
import * as taskController from '../controllers/task'

const router = Router()

router.get('/tasks', (_req, res) => taskController.getTasks(_req, res))
router.get('/tasks/:id', (req, res) => taskController.getTaskById(req, res))
router.post('/tasks', (req, res) => taskController.createTask(req, res))
router.put('/tasks/:id', (req, res) => taskController.updateTask(req, res))
router.delete('/tasks/:id', (req, res) => taskController.deleteTask(req, res))

export default router