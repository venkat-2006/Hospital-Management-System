import { useState, useEffect } from "react";
import { getUsers, createUser, deleteUser } from "../../api/services/adminService";
import { PageWrapper, Card, LoadingSpinner, ErrorMsg, SuccessMsg, Table, Tr, Td, Btn, Input, Select, Badge } from "../../components/UI";

const roleColor = {
  ADMIN: "#c0392b", DOCTOR: "#2980b9", PATIENT: "#27ae60",
  RECEPTIONIST: "#8e44ad", LAB_TECH: "#e67e22",
};

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "DOCTOR" });
  const [formLoading, setFormLoading] = useState(false);

  const fetchUsers = () => {
    setLoading(true);
    getUsers()
      .then((res) => setUsers(res.data))
      .catch(() => setError("Failed to load users"))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCreate = async (e) => {
    e.preventDefault();
    setFormLoading(true); setError(""); setSuccess("");
    try {
      await createUser(formData);
      setSuccess("User created successfully!");
      setFormData({ name: "", email: "", password: "", role: "DOCTOR" });
      setShowForm(false);
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create user");
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      await deleteUser(id);
      setUsers(users.filter((u) => u.id !== id));
      setSuccess("User deleted.");
    } catch {
      setError("Failed to delete user");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <PageWrapper title="Manage Users">
      {error && <ErrorMsg message={error} />}
      {success && <SuccessMsg message={success} />}

      <div className="mb-4">
        <Btn onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "+ Add New User"}
        </Btn>
      </div>

      {showForm && (
        <Card className="mb-4">
          <h3 className="font-semibold text-slate-800 mb-4">Create New User</h3>
          <form onSubmit={handleCreate}>
            <div className="grid grid-cols-2 gap-x-4">
              <Input label="Full Name" name="name" value={formData.name} onChange={handleChange} placeholder="Dr. John Doe" required />
              <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="email@hospital.com" required />
              <Input label="Password" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Min 6 chars" required />
              <Select label="Role" name="role" value={formData.role} onChange={handleChange}>
                <option value="ADMIN">Admin</option>
                <option value="DOCTOR">Doctor</option>
                <option value="RECEPTIONIST">Receptionist</option>
                <option value="LAB_TECH">Lab Tech</option>
              </Select>
            </div>
            <Btn type="submit" disabled={formLoading}>{formLoading ? "Creating..." : "Create User"}</Btn>
          </form>
        </Card>
      )}

      <Card>
        {loading ? <LoadingSpinner /> : (
          <Table headers={["Name", "Email", "Role", "Actions"]}>
            {users.map((u) => (
              <Tr key={u.id}>
                <Td><span className="font-medium">{u.name}</span></Td>
                <Td>{u.email}</Td>
                <Td><Badge label={u.role} color={roleColor[u.role] || "#64748b"} /></Td>
                <Td>
                  <Btn variant="danger" onClick={() => handleDelete(u.id)}
                    disabled={deletingId === u.id} className="text-xs px-3 py-1.5">
                    {deletingId === u.id ? "Deleting..." : "Delete"}
                  </Btn>
                </Td>
              </Tr>
            ))}
          </Table>
        )}
        {!loading && users.length === 0 && (
          <p className="text-slate-500 text-center py-6">No users found.</p>
        )}
      </Card>
    </PageWrapper>
  );
};

export default ManageUsers;