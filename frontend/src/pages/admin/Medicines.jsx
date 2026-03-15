import { useState, useEffect, useCallback } from "react";
import { getMedicines, createMedicine, updateMedicineStock } from "../../api/services/adminService";
import { Card, TableSkeleton, Toast, Table, Tr, Td, Btn, Input, EmptyState } from "../../components/UI";

const Medicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState({ name: "", stock: "", price: "", expiry_date: "" });
  const [stockUpdates, setStockUpdates] = useState({});

  const fetchMedicines = useCallback(async () => {
    try {
      const res = await getMedicines();
      setMedicines(res.data);
    } catch {
      setToast({ message: "Failed to load medicines", type: "error" });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchMedicines(); }, [fetchMedicines]);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createMedicine(formData);
      setToast({ message: "Medicine added!", type: "success" });
      setFormData({ name: "", stock: "", price: "", expiry_date: "" });
      fetchMedicines();
    } catch {
      setToast({ message: "Failed to add medicine", type: "error" });
    }
  };

  const handleStockUpdate = async (id) => {
    if (!stockUpdates[id]) return;
    try {
      await updateMedicineStock(id, parseInt(stockUpdates[id]));
      setToast({ message: "Stock updated!", type: "success" });
      fetchMedicines();
    } catch {
      setToast({ message: "Failed to update stock", type: "error" });
    }
  };

  return (
    <div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Medicines</h1>
        <p className="text-slate-500 text-sm mt-1">Manage medicine inventory</p>
      </div>

      <Card className="mb-6">
        <h2 className="font-semibold text-slate-800 mb-5">Add Medicine</h2>
        <form onSubmit={handleCreate} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Medicine Name" name="name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
          <Input label="Initial Stock" name="stock" type="number" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} required />
          <Input label="Price (₹)" name="price" type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required />
          <Input label="Expiry Date" name="expiry_date" type="date" value={formData.expiry_date} onChange={e => setFormData({...formData, expiry_date: e.target.value})} required />
          <div className="sm:col-span-2 flex justify-end">
            <Btn type="submit">Add Medicine</Btn>
          </div>
        </form>
      </Card>

      <Card>
        <h2 className="font-semibold text-slate-800 mb-5">Inventory ({medicines.length})</h2>
        {loading ? <TableSkeleton /> : medicines.length === 0 ? <EmptyState message="No medicines added yet" /> : (
          <Table>
            <thead>
              <Tr header>
                <Td header>Name</Td>
                <Td header>Stock</Td>
                <Td header>Price</Td>
                <Td header>Expiry</Td>
                <Td header>Update Stock</Td>
              </Tr>
            </thead>
            <tbody>
              {medicines.map(m => (
                <Tr key={m.id}>
                  <Td><span className="font-medium text-slate-800">{m.name}</span></Td>
                  <Td>
                    <span className={`font-semibold ${m.stock < 10 ? "text-rose-600" : "text-emerald-600"}`}>
                      {m.stock}
                    </span>
                  </Td>
                  <Td>₹{m.price}</Td>
                  <Td>{m.expiry_date?.split("T")[0]}</Td>
                  <Td>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="New qty"
                        className="border border-slate-200 rounded-lg px-2 py-1.5 text-sm w-24 outline-none focus:border-blue-400"
                        onChange={e => setStockUpdates({...stockUpdates, [m.id]: e.target.value})}
                      />
                      <Btn onClick={() => handleStockUpdate(m.id)}>Update</Btn>
                    </div>
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

export default Medicines;