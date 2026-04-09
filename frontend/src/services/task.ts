const API_URL = import.meta.env.VITE_API_URL
import { type CreateTaskDto, type Task, type UpdateTaskDto } from '../types/task'

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

export const createTask = async (data: CreateTaskDto): Promise<Task> => {
  const response = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  if (!response.ok) throw new Error('Error al crear la tarea')
  return response.json()
}

export const updateTask = async (id: string, data: UpdateTaskDto): Promise<Task> => {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  if (!response.ok) throw new Error('Error al actualizar la tarea')
  return response.json()
}

export const deleteTask = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'DELETE'
  })
  if (!response.ok) throw new Error('Error al eliminar la tarea')
}