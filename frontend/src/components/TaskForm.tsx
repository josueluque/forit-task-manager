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

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title)
      setDescription(taskToEdit.description)
    }
  }, [taskToEdit])

  const handleSubmit = () => {
    if (!title.trim()) return
    console.log('Submitting:', { title, description })
    onSubmit(title, description)
    setTitle('')
    setDescription('')
  }

  return (
    <div className="bg-[#1a1d27] border border-[#2a2d3a] rounded-xl p-4 mb-6">
      <h2 className="text-gray-100 text-sm font-medium mb-4">
        {taskToEdit ? 'Editar tarea' : 'Nueva tarea'}
      </h2>
      <input
        type="text"
        placeholder="Titulo"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="w-full bg-[#0f1117] border border-[#2a2d3a] rounded-lg px-3 py-2 text-sm text-gray-100 placeholder-gray-600 mb-3 focus:outline-none focus:border-blue-500"
      />
      <textarea
        placeholder="Descripción opcional"
        value={description}
        onChange={e => setDescription(e.target.value)}
        className="w-full bg-[#0f1117] border border-[#2a2d3a] rounded-lg px-3 py-2 text-sm text-gray-100 placeholder-gray-600 mb-4 focus:outline-none focus:border-blue-500 resize-none h-20"
      />
      <div className="flex gap-2 justify-end">
        <button
          onClick={onCancel}
          className="text-xs text-[#e8eef8] border border-[#1c2a3f] rounded-lg px-4 py-2 cursor-pointer hover:bg-[#1c2a3f] transition-colors"
        >
          Cancelar
        </button>
        <button
          onClick={handleSubmit}
          className="text-xs text-white bg-[#0b38ff] rounded-lg px-4 py-2 cursor-pointer hover:bg-[#1540ff] transition-colors"
        >
          {taskToEdit ? 'Guardar' : 'Agregar'}
        </button>
      </div>
    </div>
  )
}

export default TaskForm