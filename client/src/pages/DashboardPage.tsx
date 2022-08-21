import axios from "axios";
import { FormEvent, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import TasksList from "../components/tasks/TasksList";
import AppContext from "../context/AppContext";
import useCheckUserLogged from "../hooks/useCheckUserLogged";
import { ITask } from "../interfaces/task";

function DashboardPage() {
  const [task, setTask] = useState({
    title: "",
    description: "",
  });
  const [tasks, setTasks] = useState<ITask[]>([]);

  useCheckUserLogged({ section: "dashboard" });
  const { contextData } = useContext(AppContext);

  const getSpecificTasks = async () => {
    const { data } = await axios.get("/api/tasks/specific");
    setTasks(data.tasks);
  };

  useEffect(() => {
    getSpecificTasks();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/tasks", task);
      toast.success(data.message);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }

    setTask({
      title: "",
      description: "",
    });
  };

  return (
    <div className="container p-4">
      <h1 className="text-white h3">{contextData.user.username}</h1>
      <div className="row d-flex justify-content-center">
        <div className="col-xl-3">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="title-input" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title-input"
                    className="form-control"
                    placeholder="Task one"
                    required
                    autoFocus={true}
                    value={task.title}
                    onChange={(e) =>
                      setTask({ ...task, title: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description-textarea" className="form-label">
                    Description
                  </label>
                  <textarea
                    id="description-textarea"
                    rows={5}
                    className="form-control"
                    placeholder="Description one"
                    value={task.description}
                    onChange={(e) =>
                      setTask({ ...task, description: e.target.value })
                    }
                  ></textarea>
                </div>
                <button className="btn btn-success w-100" type="submit">
                  CREAR
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <TasksList tasks={tasks}/>
      </div>
    </div>
  );
}

export default DashboardPage;
