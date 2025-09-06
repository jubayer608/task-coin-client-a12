import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useUserRole from "../../../hooks/useUserRole";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyTasks = () => {
  const { user, coins, setCoins, loading } = useUserRole();
  const axiosSecure = useAxiosSecure();
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({
    task_title: "",
    task_detail: "",
    submission_info: "",
  });

  useEffect(() => {
    if (!loading && user?.email) {
      fetchTasks();
    }
  }, [user, loading]);

  const fetchTasks = async () => {
    try {
      const res = await axiosSecure.get(`/tasks/buyer/${user.email}`);
      setTasks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = (task) => {
    setEditingTask(task);
    setFormData({
      task_title: task.task_title,
      task_detail: task.task_detail,
      submission_info: task.submission_info,
    });
  };

  const submitUpdate = async () => {
    try {
      await axiosSecure.patch(`/tasks/${editingTask._id}`, formData);
      Swal.fire("Success", "Task updated successfully!", "success");
      setEditingTask(null);
      fetchTasks();
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to update task", "error");
    }
  };

  const handleDelete = async (task) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Deleting this task will refill coins for uncompleted workers`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/tasks/${task._id}`);
          Swal.fire("Deleted!", "Task has been deleted.", "success");

          // Refill coins in frontend
          const refillAmount = task.required_workers * task.payable_amount;
          setCoins(coins + refillAmount);

          fetchTasks();
        } catch (error) {
          console.error(error);
          Swal.fire("Error", "Failed to delete task", "error");
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold text-primary mb-6">My Tasks</h2>

      {/* Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="table table-zebra w-full">
          <thead>
            <tr className="bg-gradient-to-r from-primary to-secondary text-white">
              <th>Title</th>
              <th>Required Workers</th>
              <th>Payable Amount</th>
              <th>Completion Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id}>
                <td>{task.task_title}</td>
                <td>{task.required_workers}</td>
                <td>${task.payable_amount}</td>
                <td>{new Date(task.completion_date).toLocaleDateString()}</td>
                <td className="flex gap-2">
                  <button
                    className="btn btn-sm btn-info"
                    onClick={() => handleUpdate(task)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleDelete(task)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Modal */}
      {editingTask && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg">
            <h3 className="text-xl font-bold mb-4 text-primary">Update Task</h3>
            <input
              type="text"
              name="task_title"
              placeholder="Task Title"
              className="input input-bordered w-full mb-2"
              value={formData.task_title}
              onChange={handleChange}
            />
            <textarea
              name="task_detail"
              placeholder="Task Detail"
              className="textarea textarea-bordered w-full mb-2"
              value={formData.task_detail}
              onChange={handleChange}
            />
            <input
              type="text"
              name="submission_info"
              placeholder="Submission Info"
              className="input input-bordered w-full mb-4"
              value={formData.submission_info}
              onChange={handleChange}
            />
            <div className="flex justify-end gap-2">
              <button
                className="btn btn-sm btn-error"
                onClick={() => setEditingTask(null)}
              >
                Cancel
              </button>
              <button className="btn btn-sm btn-success" onClick={submitUpdate}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTasks;
