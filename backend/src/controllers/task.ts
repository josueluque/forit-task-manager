import { Request, Response } from 'express'
import * as taskService from '../services/task'

export const getTasks = async (_req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await taskService.getTasks()
    res.json(tasks)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}

export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description } = req.body

    const task = await taskService.createTask(title, description)
    res.status(201).json(task)
  } catch (error) {
    res.status(400).json({ error: (error as Error).message })
  }
}

export const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const { title, description, completed } = req.body

    const task = await taskService.updateTask(id, { title, description, completed })

    res.json(task)
  } catch (error) {
    res.status(404).json({ error: (error as Error).message })
  }
}

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
  
    await taskService.deleteTask(id)

    res.status(204).send()
  } catch (error) {
    res.status(404).json({ error: (error as Error).message })
  }
}


export const getTaskById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const task = await taskService.getTaskById(id)

    res.json(task)
  } catch (error) {
    res.status(404).json({ error: (error as Error).message })
  }
}