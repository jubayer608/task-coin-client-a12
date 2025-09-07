import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";



const ManageUsers = () => {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  // Fetch users
  const { data: users = [], isLoading, isError } = useQuery({
    queryKey: ["adminUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/users");
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  // Delete user
  const handleRemoveUser = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "User will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    });

    if (confirm.isConfirmed) {
      await axiosSecure.delete(`/admin/users/${id}`);
      Swal.fire("Deleted!", "User has been removed.", "success");
      queryClient.invalidateQueries(["adminUsers"]);
    }
  };

  // Update user role
  const handleRoleChange = async (id, role) => {
    await axiosSecure.patch(`/admin/users/role/${id}`, { role });
    Swal.fire("Updated!", "User role has been updated.", "success");
    queryClient.invalidateQueries(["adminUsers"]);
  };

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Error loading users!</p>;
  if (!users.length) return <p>No users found</p>;

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Manage Users</h3>
      <table className="table w-full border rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Coin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="hover:bg-gray-100 transition">
              <td>
                <img
                  src={user.photoURL || 'https://placehold.co/40x40/E5E7EB/1F2937?text=NO+IMG'}
                  alt={user.name}
                  className="w-10 h-10 rounded-full"
                />
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <select
                  className="select select-sm"
                  value={user.role}
                  onChange={(e) => handleRoleChange(user._id, e.target.value)}
                >
                  <option value="admin">Admin</option>
                  <option value="buyer">Buyer</option>
                  <option value="worker">Worker</option>
                </select>
              </td>
              <td>{user.coin}</td>
              <td>
                <button
                  className="btn btn-error btn-sm"
                  onClick={() => handleRemoveUser(user._id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;