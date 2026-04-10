import { type Task } from '../types/task'

interface TaskItemProps {
  task: Task
  onDelete: (id: string) => void
  onToggle: (id: string, completed: boolean) => void
  onEdit: (task: Task) => void
}

const TaskItem = ({ task, onDelete, onToggle, onEdit }: TaskItemProps) => {
  return (
    <div className="flex items-center gap-3 bg-[#1e242e] border border-[#1e242e] rounded-xl p-4">
      <button
        onClick={() => onToggle(task.id, !task.completed)}
        className={`w-5 h-5.5 rounded-md border-2 shrink-0 cursor-pointer ${
          task.completed ? 'text-white bg-[#0284c7] border-[#0284c7]' : 'border-[#0284c7]'
        }`}
      >
        {task.completed ? "✓" : ""}
      </button>
      <div className="flex-1">
        <p className={`text-sm font-medium ${task.completed ? 'line-through text-[#334d66]' : 'text-gray-100'}`}>
          {task.title}
        </p>
        <p className="text-xs text-[#334d66] mt-1">{task.description}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(task)}
          className="text-xs font-medium text-gray-100 bg-[#0284c7] rounded-lg px-3 py-1 cursor-pointer hover:bg-[#0e93d6] transition-colors"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="text-xs font-medium text-gray-100 bg-[#c72929] rounded-lg px-3 py-1 cursor-pointer hover:bg-[#ff004c] transition-colors"
        >
          Eliminar
        </button>
      </div>
    </div>
  )
}


export default TaskItem