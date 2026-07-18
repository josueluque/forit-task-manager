import { type Task } from '../types/task'

interface TaskItemProps {
  task: Task
  onDelete: (id: string) => void
  onToggle: (id: string, completed: boolean) => void
  onEdit: (task: Task) => void
}

const TaskItem = ({ task, onDelete, onToggle, onEdit }: TaskItemProps) => {
  return (
    <div className="flex items-center gap-3 bg-elevated border border-elevated rounded-xl p-4">
      <button
        onClick={() => onToggle(task.id, !task.completed)}
        className={`w-5 h-5.5 rounded-md border-2 shrink-0 cursor-pointer ${
          task.completed ? 'text-white bg-primary border-primary' : 'border-primary'
        }`}
      >
        {task.completed ? "✓" : ""}
      </button>
      <div className="flex-1">
        <p className={`text-sm font-medium ${task.completed ? 'line-through text-muted' : 'text-fg'}`}>
          {task.title}
        </p>
        <p className="text-xs text-muted mt-1">{task.description}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(task)}
          className="text-xs font-medium text-white bg-primary rounded-lg px-3 py-1 cursor-pointer hover:bg-primary-hover transition-colors"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="text-xs font-medium text-white bg-danger rounded-lg px-3 py-1 cursor-pointer hover:bg-danger-hover transition-colors"
        >
          Eliminar
        </button>
      </div>
    </div>
  )
}


export default TaskItem