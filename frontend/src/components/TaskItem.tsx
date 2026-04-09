import { type Task } from '../types/task'

interface TaskItemProps {
  task: Task
  onDelete: (id: string) => void
  onToggle: (id: string, completed: boolean) => void
  onEdit: (task: Task) => void
}

const TaskItem = ({ task, onDelete, onToggle, onEdit }: TaskItemProps) => {
  return (
    <div className="flex items-center gap-3 bg-[#0a1220] border border-[#0f1e35] rounded-xl p-4">
      <button
        onClick={() => onToggle(task.id, !task.completed)}
        className={`w-5 h-5 rounded-md border-2 shrink-0 cursor-pointer ${
          task.completed ? 'bg-[#0b38ff] border-[#0b38ff]' : 'border-[#0b38ff]'
        }`}
      />
      <div className="flex-1">
        <p className={`text-sm font-medium ${task.completed ? 'line-through text-[#334d66]' : 'text-gray-100'}`}>
          {task.title}
        </p>
        <p className="text-xs text-[#334d66] mt-1">{task.description}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(task)}
          className="text-xs font-medium text-gray-100 bg-[#0b38ff] rounded-lg px-3 py-1 cursor-pointer hover:bg-[#1540ff] transition-colors"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="text-xs font-medium text-gray-100 bg-[#da3333] rounded-lg px-3 py-1 cursor-pointer hover:bg-[#ff004c] transition-colors"
        >
          Eliminar
        </button>
      </div>
    </div>
  )
}


export default TaskItem