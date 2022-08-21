import axios from "axios";
import { useEffect, useState } from "react";
import TasksList from "../components/tasks/TasksList";
import useCheckUserLogged from "../hooks/useCheckUserLogged";
import { ITask } from "../interfaces/task";

function HomePage() {
  const [tasks, setTasks] = useState<ITask[]>([]);

  useCheckUserLogged({ section: "home" });

  const getAllTasks = async () => {
    const { data } = await axios.get("/api/tasks/all");
    setTasks(data.tasks);
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  return (
    <div className="container p-4">
      <TasksList tasks={tasks} />
    </div>
  );
}

export default HomePage;
