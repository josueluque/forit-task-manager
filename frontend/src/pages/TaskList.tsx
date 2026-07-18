import { useState, useEffect } from 'react'
import { type Task } from '../types/task'
import TaskItem from '../components/TaskItem'
import TaskForm from '../components/TaskForm'
import * as tasksService from '../services/task'

type Theme = 'light' | 'dark'

// localStorage can throw (SecurityError) in storage-restricted contexts such
// as sandboxed iframes, so every access falls back to the system preference.
const getInitialTheme = (): Theme => {
  try {
    const stored = localStorage.getItem('theme')
    if (stored === 'light' || stored === 'dark') return stored
  } catch {
    // storage unavailable, fall through to the media query
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const storeTheme = (theme: Theme) => {
  try {
    localStorage.setItem('theme', theme)
  } catch {
    // storage unavailable, keep the in-memory theme only
  }
}

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [showForm, setShowForm] = useState(false)
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'todos' | 'pendientes' | 'completadas'>('todos')
  const [theme, setTheme] = useState<Theme>(getInitialTheme)


  useEffect(() => {
    fetchTasks()
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    storeTheme(theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))
  }

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
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
              title={theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
              className="text-muted border border-border rounded-lg p-2 cursor-pointer hover:bg-elevated hover:text-fg transition-colors"
            >
              {theme === 'dark' ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="text-xs font-medium text-white bg-primary rounded-lg px-4 py-2 cursor-pointer hover:bg-primary-hover transition-colors"
              >
                Agregar tarea
              </button>
            )}
          </div>
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