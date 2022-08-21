import { ITask } from "../../interfaces/task"

interface TaskCardProps {
    task: ITask
}

function TaskCard({ task }: TaskCardProps) {
  return (
    <div className="card">
        <div className="card-body">
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <span>User: {task.user.username}</span>
        </div>
    </div>
  )
}

export default TaskCard