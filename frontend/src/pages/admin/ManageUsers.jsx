import { useState, useEffect, useCallback } from "react";
import { getUsers, createUser, deleteUser } from "../../api/services/adminService";
import { Card, TableSkeleton, ErrorMsg, Toast, Table, Tr, Td, Btn, Input, Select, Badge } from "../../components/UI";

const ROLES = ["DOCTOR", "RECEPTIONIST", "LAB_TECH"];

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState({
    name: "", email: "", password: "", role: "DOCTOR",
    specialization: "", experience: "", phone: ""
  });
  const [errors, setErrors] = useState({});

  const fetchUsers = useCallback(async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch {
      setToast({ message: "Failed to load users", type: "error" });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const validate = () => {
    const e = {};
    if (!formData.name) e.name = "Required";
    if (!formData.email) e.email = "Required";
    if (!formData.password) e.password = "Required";
    if (formData.role === "DOCTOR" && !formData.specialization) e.specialization = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await createUser(formData);
      setToast({ message: "User created successfully!", type: "success" });
      setFormData({ name: "", email: "", password: "", role: "DOCTOR", specialization: "", experience: "", phone: "" });
      fetchUsers();
    } catch (err) {
      setToast({ message: err.response?.data?.message || "Failed to create user", type: "error" });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await deleteUser(id);
      setUsers(users.filter(u => u.id !== id));
      setToast({ message: "User deleted", type: "success" });
    } catch {
      setToast({ message: "Failed to delete", type: "error" });
    }
  };

  return (
    <div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Manage Users</h1>
        <p className="text-slate-500 text-sm mt-1">Create and manage staff accounts</p>
      </div>

      <Card className="mb-6">
        <h2 className="font-semibold text-slate-800 mb-5">Create New User</h2>
        <form onSubmit={handleCreate} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Full Name" name="name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} error={errors.name} required />
          <Input label="Email" name="email" type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} error={errors.email} required />
          <Input label="Password" name="password" type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} error={errors.password} required />
          <Select label="Role" name="role" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
            {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
          </Select>
          {formData.role === "DOCTOR" && (
            <>
              <Input label="Specialization" name="specialization" value={formData.specialization} onChange={e => setFormData({...formData, specialization: e.target.value})} error={errors.specialization} required />
              <Input label="Experience (years)" name="experience" type="number" value={formData.experience} onChange={e => setFormData({...formData, experience: e.target.value})} />
              <Input label="Phone" name="phone" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
            </>
          )}
          <div className="sm:col-span-2 flex justify-end">
            <Btn type="submit">Create User</Btn>
          </div>
        </form>
      </Card>

      <Card>
        <h2 className="font-semibold text-slate-800 mb-5">All Users ({users.length})</h2>
        {loading ? <TableSkeleton /> : (
          <Table>
            <thead>
              <Tr header>
                <Td header>ID</Td>
                <Td header>Name</Td>
                <Td header>Email</Td>
                <Td header>Role</Td>
                <Td header>Created</Td>
                <Td header>Action</Td>
              </Tr>
            </thead>
            <tbody>
              {users.map(u => (
                <Tr key={u.id}>
                  <Td><span className="text-slate-400">#{u.id}</span></Td>
                  <Td><span className="font-medium text-slate-800">{u.name}</span></Td>
                  <Td>{u.email}</Td>
                  <Td><Badge value={u.role} /></Td>
                  <Td>{new Date(u.created_at).toLocaleDateString()}</Td>
                  <Td>
                    <Btn variant="danger" onClick={() => handleDelete(u.id)}>Delete</Btn>
                  </Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>
    </div>
  );
};

export default ManageUsers;