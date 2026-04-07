import { Task } from '../model/task'
import { randomUUID } from 'crypto'

// Array de tareas con memoria temporal
const tasks: Task[] = []

export const getTasks = async (): Promise<Task[]> => {
  try {
    return tasks
  } catch (error) {
    throw new Error('Error al obtener las tareas');
  }
}

export const createTask = async (title: string, description: string): Promise<Task> => {
  try {
    if (!title) {
        throw new Error('El título es obligatorio');
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
  } catch (error) {
    throw new Error('Error al crear la tarea');
  }
}

export const updateTask = async (id: string, data: any): Promise<Task | null> => {
  try {
    const taskIndex = tasks.findIndex(task => task.id === id)

    if (taskIndex === -1) throw new Error('Tarea no encontrada')

    const allowedUpdates = ['title', 'description', 'completed']

    allowedUpdates.forEach(field => {
      if (data[field] !== undefined) {
        (tasks[taskIndex] as any)[field as keyof Task] = data[field]
      }
    })

    return tasks[taskIndex]
  } catch (error) {
    throw new Error('Error al actualizar la tarea ' + error);
  }
}


export const deleteTask = async (id: string): Promise<boolean> => {
  try {
    const taskIndex = tasks.findIndex(task => task.id === id)
    if (taskIndex === -1) throw new Error('Tarea no encontrada')

    tasks.splice(taskIndex, 1)
    return true
  } catch (error) {
    throw new Error('Error al eliminar la tarea ' + error);
  }
}

export const getTaskById = async (id: string): Promise<Task | null> => {
  try {  
    const task = tasks.find(task => task.id === id)
    return task || null
  } catch (error) {
    throw new Error('Error al obtener la tarea ' + error);
  }
}