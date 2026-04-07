const API_URL = import.meta.env.VITE_API_URL
import { type Task } from '../types/task'

export const getTasks = async (): Promise<Task[]> => {
  const response = await fetch(`${API_URL}/tasks`)
  console.log('Response status:', response.status)
  if (!response.ok) throw new Error('Error al obtener las tareas')
  return response.json()
}

export const getTaskById = async (id: string): Promise<Task> => {
  const response = await fetch(`${API_URL}/tasks/${id}`)
  if (!response.ok) throw new Error('Error al obtener la tarea')
  return response.json()
}

export const createTask = async (title: string, description: string): Promise<Task> => {
  const response = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description })
  })
  if (!response.ok) throw new Error('Error al crear la tarea')
  return response.json()
}