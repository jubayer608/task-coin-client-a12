// ManageTasks.jsx
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const ManageTasks = () => {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  // Fetch tasks
  const { data: tasks = [], isLoading, isError } = useQuery({
    queryKey: ["adminTasks"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/tasks");
   
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  // Delete task
  const handleDeleteTask = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Task will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    });

    if (confirm.isConfirmed) {
      await axiosSecure.delete(`/admin/tasks/${id}`);
      Swal.fire("Deleted!", "Task has been removed.", "success");
      queryClient.invalidateQueries(["adminTasks"]);
    }
  };

  if (isLoading) return <p>Loading tasks...</p>;
  if (isError) return <p>Error loading tasks!</p>;
  if (!tasks.length) return <p>No tasks found</p>;

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Manage Tasks</h3>
      <table className="table w-full border rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th>Task Name</th>
            <th>Buyer</th>
            <th>Required Workers</th>
            <th>Payable Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id} className="hover:bg-gray-100 transition">
              <td>{task.name || task.
task_title || "N/A"}</td>
              <td>{task.buyerId || task.buyer_email || "N/A"}</td>
              <td>{task.required_workers}</td>
              <td>${task.payable_amount}</td>
              <td>
                <button
                  className="btn btn-error btn-sm"
                  onClick={() => handleDeleteTask(task._id)}
                >
                  Delete Task
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageTasks;
