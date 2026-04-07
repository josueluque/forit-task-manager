import { Task } from '../model/task'
import { randomUUID } from 'crypto'
import { HttpError } from '../utils/httpError'

// Array de tareas con memoria temporal
const tasks: Task[] = []

export const getTasks = async (): Promise<Task[]> => {
  return tasks

}

export const createTask = async (title: string, description: string): Promise<Task> => {
  if (!title) {
      throw new HttpError('El título es obligatorio ', 400);
  }
            
  const newTask: Task = {
    id: randomUUID(),
    title,
    description: description || '',
    completed: false,
    createdAt: new Date()
  }

  tasks.push(newTask)
  return newTask
}

export const updateTask = async (id: string, data: any): Promise<Task | null> => {
  const taskIndex = tasks.findIndex(task => task.id === id)

  if (taskIndex === -1) throw new HttpError('Tarea no encontrada', 404)

  const allowedUpdates = ['title', 'description', 'completed']

  allowedUpdates.forEach(field => {
    if (data[field] !== undefined) {
      (tasks[taskIndex] as any)[field as keyof Task] = data[field]
    }
  })

  return tasks[taskIndex]
}


export const deleteTask = async (id: string): Promise<boolean> => {
  const taskIndex = tasks.findIndex(task => task.id === id)
  if (taskIndex === -1) throw new HttpError('Tarea no encontrada', 404)

  tasks.splice(taskIndex, 1)
  return true
}

export const getTaskById = async (id: string): Promise<Task | null> => {
  const task = tasks.find(task => task.id === id)
  return task || null
}