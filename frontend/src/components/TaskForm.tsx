import { useState, useEffect } from 'react'
import { type Task } from '../types/task'

interface TaskFormProps {
  onSubmit: (title: string, description: string) => void
  onCancel: () => void
  taskToEdit?: Task | null
}

const TaskForm = ({ onSubmit, onCancel, taskToEdit }: TaskFormProps) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title)
      setDescription(taskToEdit.description)
    }
  }, [taskToEdit])

  const handleSubmit = () => {
    if (!title.trim()) {
      setError('El titulo es requerido')
      return
    }
    setError('')
    onSubmit(title, description)
    setTitle('')
    setDescription('')
  }

  return (
    <div className="bg-surface border border-border rounded-xl p-4 mb-6">
      <h2 className="text-fg text-sm font-medium mb-4">
        {taskToEdit ? 'Editar tarea' : 'Nueva tarea'}
      </h2>
      <input
        type="text"
        placeholder="Titulo"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="w-full bg-input border border-input-border rounded-lg px-3 py-2 text-sm text-fg placeholder-muted mb-3 focus:outline-none focus:border-primary"
      />
      {error && (
        <p className="text-xs text-danger mb-3 w-88">{error}</p>
      )}

      <textarea
        placeholder="Descripción opcional"
        value={description}
        onChange={e => setDescription(e.target.value)}
        className="w-full bg-input border border-input-border rounded-lg px-3 py-2 text-sm text-fg placeholder-muted mb-4 focus:outline-none focus:border-primary resize-none h-20"
      />
      <div className="flex gap-2 justify-end">
        <button
          onClick={onCancel}
          className="text-xs text-fg border border-border rounded-lg px-4 py-2 cursor-pointer hover:bg-elevated transition-colors"
        >
          Cancelar
        </button>
        <button
          onClick={handleSubmit}
          className="text-xs text-white bg-primary rounded-lg px-4 py-2 cursor-pointer hover:bg-primary-hover transition-colors"
        >
          {taskToEdit ? 'Guardar' : 'Agregar'}
        </button>
      </div>

      
    </div>
  )
}

export default TaskForm