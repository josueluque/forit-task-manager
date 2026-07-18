import { useState, useEffect } from 'react'
import { type Task } from '../types/task'
import TaskItem from '../components/TaskItem'
import TaskForm from '../components/TaskForm'
import * as tasksService from '../services/task'

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [showForm, setShowForm] = useState(false)
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'todos' | 'pendientes' | 'completadas'>('todos')


  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const data = await tasksService.getTasks()
      setTasks(data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleCreate = async (title: string, description: string) => {
    try {
      await tasksService.createTask({ title, description })
      await fetchTasks()
      setShowForm(false)
    } catch (error) {
      console.error(error)
    }
  }

  const handleUpdate = async (title: string, description: string) => {
    if (!taskToEdit) return
    try {
      await tasksService.updateTask(taskToEdit.id, { title, description })
      await fetchTasks()
      setTaskToEdit(null)
      setShowForm(false)
    } catch (error) {
      console.error(error)
    }
  }

  const handleToggle = async (id: string, completed: boolean) => {
    try {
      await tasksService.updateTask(id, { completed })
      await fetchTasks()
    } catch (error) {
      console.error(error)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await tasksService.deleteTask(id)
      await fetchTasks()
    } catch (error) {
      console.error(error)
    }
  }

  const handleEdit = (task: Task) => {
    setTaskToEdit(task)
    setShowForm(true)
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'pendientes') return !task.completed
    if (filter === 'completadas') return task.completed
    return true
  })
  .filter(task =>
    task.title.toLowerCase().includes(search.toLowerCase()) ||
    task.description.toLowerCase().includes(search.toLowerCase())
  )

  const handleCancel = () => {
    setTaskToEdit(null)
    setShowForm(false)
  }

  return (
    <div className="min-h-screen bg-canvas px-4 py-8">
      <div className="max-w-xl mx-auto bg-surface border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-fg text-xl font-medium">Mis tareas</h1>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="text-xs font-medium text-white bg-primary rounded-lg px-4 py-2 cursor-pointer hover:bg-primary-hover transition-colors"
            >
              Agregar tarea
            </button>
          )}
        </div>

        <input
          type="text"
          placeholder="Buscar tareas..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-input border border-input-border rounded-lg px-3 py-2 text-sm text-fg placeholder-muted mb-6 focus:outline-none focus:border-primary"
        />
        <div className="flex gap-2 mb-6">
        <button
          onClick={() => setFilter('todos')}
          className={`text-xs rounded-lg px-4 py-2 cursor-pointer transition-colors ${
            filter === 'todos'
              ? 'bg-primary text-white font-medium'
              : 'border border-border text-muted hover:bg-elevated'
          }`}
        >
          Todas
        </button>
        <button
          onClick={() => setFilter('pendientes')}
          className={`text-xs rounded-lg px-4 py-2 cursor-pointer transition-colors ${
            filter === 'pendientes'
              ? 'bg-primary text-white font-medium'
              : 'border border-border text-muted hover:bg-elevated'
          }`}
        >
          Pendientes
        </button>
        <button
          onClick={() => setFilter('completadas')}
          className={`text-xs rounded-lg px-4 py-2 cursor-pointer transition-colors ${
            filter === 'completadas'
              ? 'bg-primary text-white font-medium'
              : 'border border-border text-muted hover:bg-elevated'
          }`}
        >
          Completadas
        </button>
      </div>

        {showForm && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center px-4">
              <TaskForm
                onSubmit={taskToEdit ? handleUpdate : handleCreate}
                onCancel={handleCancel}
                taskToEdit={taskToEdit}
              />
          </div>
        )}

        <div className="flex flex-col gap-3">
          {filteredTasks.length === 0 ? (
            <p className="text-muted text-sm text-center py-8">No hay tareas todavia</p>
        ) : (
            filteredTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={handleDelete}
              onToggle={handleToggle}
              onEdit={handleEdit}
            />
          ))
        )}
        </div>
      </div>
    </div>
  )
}

export default TaskList