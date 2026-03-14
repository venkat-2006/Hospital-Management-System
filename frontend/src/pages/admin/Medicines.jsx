import { useState, useEffect } from "react";
import { getMedicines, createMedicine, updateMedicineStock } from "../../api/services/adminService";
import { PageWrapper, Card, LoadingSpinner, ErrorMsg, SuccessMsg, Table, Tr, Td, Btn, Input } from "../../components/UI";

const Medicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", description: "", stock: "", price: "" });
  const [formLoading, setFormLoading] = useState(false);
  const [stockEdits, setStockEdits] = useState({});
  const [updatingId, setUpdatingId] = useState(null);

  const fetchMedicines = () => {
    getMedicines()
      .then((res) => setMedicines(res.data))
      .catch(() => setError("Failed to load medicines"))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchMedicines(); }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCreate = async (e) => {
    e.preventDefault();
    setFormLoading(true); setError("");
    try {
      await createMedicine(formData);
      setSuccess("Medicine added!");
      setFormData({ name: "", description: "", stock: "", price: "" });
      setShowForm(false);
      fetchMedicines();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add medicine");
    } finally {
      setFormLoading(false);
    }
  };

  const handleStockUpdate = async (id) => {
    setUpdatingId(id);
    try {
      await updateMedicineStock(id, stockEdits[id]);
      setSuccess("Stock updated!");
      fetchMedicines();
      setStockEdits({ ...stockEdits, [id]: "" });
    } catch {
      setError("Failed to update stock");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <PageWrapper title="Medicine Inventory">
      {error && <ErrorMsg message={error} />}
      {success && <SuccessMsg message={success} />}

      <div className="mb-4">
        <Btn onClick={() => setShowForm(!showForm)}>{showForm ? "Cancel" : "+ Add Medicine"}</Btn>
      </div>

      {showForm && (
        <Card className="mb-4">
          <h3 className="font-semibold text-slate-800 mb-4">Add New Medicine</h3>
          <form onSubmit={handleCreate}>
            <div className="grid grid-cols-2 gap-x-4">
              <Input label="Medicine Name" name="name" value={formData.name} onChange={handleChange} required />
              <Input label="Price (₹)" name="price" type="number" value={formData.price} onChange={handleChange} />
              <Input label="Stock Qty" name="stock" type="number" value={formData.stock} onChange={handleChange} required />
              <Input label="Description" name="description" value={formData.description} onChange={handleChange} />
            </div>
            <Btn type="submit" disabled={formLoading}>{formLoading ? "Adding..." : "Add Medicine"}</Btn>
          </form>
        </Card>
      )}

      <Card>
        {loading ? <LoadingSpinner /> : (
          <Table headers={["Name", "Description", "Price", "Stock", "Update Stock"]}>
            {medicines.map((m) => (
              <Tr key={m.id}>
                <Td><span className="font-semibold">{m.name}</span></Td>
                <Td className="text-slate-500">{m.description || "—"}</Td>
                <Td>{m.price ? `₹${m.price}` : "—"}</Td>
                <Td>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold
                    ${m.stock < 10 ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-700"}`}>
                    {m.stock} units
                  </span>
                </Td>
                <Td>
                  <div className="flex items-center gap-2">
                    <input
                      type="number" placeholder="New qty"
                      value={stockEdits[m.id] || ""}
                      onChange={(e) => setStockEdits({ ...stockEdits, [m.id]: e.target.value })}
                      className="w-20 px-2 py-1.5 border border-slate-300 rounded-lg text-xs outline-none focus:border-blue-500"
                    />
                    <Btn variant="ghost" onClick={() => handleStockUpdate(m.id)}
                      disabled={updatingId === m.id || !stockEdits[m.id]}
                      className="text-xs px-3 py-1.5">
                      {updatingId === m.id ? "..." : "Update"}
                    </Btn>
                  </div>
                </Td>
              </Tr>
            ))}
          </Table>
        )}
      </Card>
    </PageWrapper>
  );
};

export default Medicines;