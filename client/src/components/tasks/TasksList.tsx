import { ITask } from "../../interfaces/task";
import TaskCard from "./TaskCard";

interface TasksListProps {
  tasks: ITask[];
}

function TasksList({ tasks }: TasksListProps) {
  return (
    <div className="row gy-4">
      {tasks.map((task: ITask) => (
        <div key={task.id} className="col-xl-3">
          <TaskCard task={task} />
        </div>
      ))}
    </div>
  );
}

export default TasksList;
