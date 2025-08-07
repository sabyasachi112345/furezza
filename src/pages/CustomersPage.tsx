import React, { useState } from "react";
import { Customer } from "../types/Customer";
import { initialCustomers } from "../data/customers";
import {
  Pencil,
  Save,
  XCircle,
  User,
  Mail,
  MapPin,
  Landmark,
  Plus,
} from "lucide-react";

const fieldKeys: (keyof Omit<Customer, "id">)[] = [
  "name",
  "email",
  "address",
  "postalCode",
];

const CustomersPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editBackup, setEditBackup] = useState<Customer | null>(null);
  const [newCustomer, setNewCustomer] = useState<Omit<Customer, "id">>({
    name: "",
    email: "",
    address: "",
    postalCode: "",
  });

  const handleEditChange = (
    id: number,
    field: keyof Customer,
    value: string
  ) => {
    setCustomers((prev) =>
      prev.map((customer) =>
        customer.id === id ? { ...customer, [field]: value } : customer
      )
    );
  };

  const handleStartEdit = (customer: Customer) => {
    setEditingId(customer.id);
    setEditBackup({ ...customer });
  };

  const handleCancelEdit = () => {
    if (editingId !== null && editBackup) {
      setCustomers((prev) =>
        prev.map((c) => (c.id === editingId ? { ...editBackup } : c))
      );
    }
    setEditingId(null);
    setEditBackup(null);
  };

  const handleAddCustomer = () => {
    const fieldsFilled = Object.values(newCustomer).every(
      (value) => value.trim() !== ""
    );
    if (fieldsFilled) {
      const nextId = Math.max(...customers.map((c) => c.id), 0) + 1;
      setCustomers((prev) => [...prev, { ...newCustomer, id: nextId }]);
      setNewCustomer({ name: "", email: "", address: "", postalCode: "" });
    } else {
      alert("⚠️ Please fill in all fields to add a new customer.");
    }
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 bg-gradient-to-br from-blue-50 via-white to-indigo-100 min-h-screen">
      <h2 className="text-4xl font-extrabold text-center text-blue-900 mb-10">
        👥 Customer Directory
      </h2>

      {/* Search */}
      <div className="mb-10 flex justify-center">
        <input
          type="text"
          placeholder="🔍 Search by name, email, or address..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-2xl px-5 py-3 text-lg border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Add Customer */}
      <div className="mb-12 p-6 border rounded-2xl shadow-md bg-white">
        <h3 className="text-2xl font-semibold mb-4 text-indigo-800 flex items-center gap-2">
          <Plus className="w-6 h-6" />
          Add New Customer
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {fieldKeys.map((field) => (
            <input
              key={field}
              type="text"
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={newCustomer[field]}
              onChange={(e) =>
                setNewCustomer((prev) => ({
                  ...prev,
                  [field]: e.target.value,
                }))
              }
              className="p-3 text-base border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          ))}
        </div>
        <button
          onClick={handleAddCustomer}
          className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-base"
        >
          Add Customer
        </button>
      </div>

      {/* Customer Cards */}
      {filteredCustomers.length === 0 ? (
        <p className="text-center text-gray-500">No customers found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCustomers.map((customer) => (
            <div
              key={customer.id}
              className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 relative hover:shadow-lg transition duration-300"
            >
              {editingId === customer.id ? (
                <div className="space-y-3">
                  {fieldKeys.map((field) => (
                    <input
                      key={field}
                      type="text"
                      value={customer[field]}
                      onChange={(e) =>
                        handleEditChange(customer.id, field, e.target.value)
                      }
                      className="w-full p-2 text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400"
                    />
                  ))}
                  <div className="flex gap-2 mt-3 justify-end">
                    <button
                      onClick={() => setEditingId(null)}
                      className="flex items-center gap-1 px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 text-sm"
                    >
                      <Save className="w-4 h-4" />
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="flex items-center gap-1 px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600 text-sm"
                    >
                      <XCircle className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-indigo-800 mb-2">
                    <User className="inline w-5 h-5 mr-2 text-indigo-500" />
                    {customer.name}
                  </h3>
                  <p className="text-sm text-gray-700 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-blue-400" />
                    {customer.email}
                  </p>
                  <p className="text-sm text-gray-700 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-pink-400" />
                    {customer.address}
                  </p>
                  <p className="text-sm text-gray-700 flex items-center gap-2">
                    <Landmark className="w-4 h-4 text-green-400" />
                    {customer.postalCode}
                  </p>
                  <button
                    onClick={() => handleStartEdit(customer)}
                    className="absolute top-4 right-4 text-indigo-600 hover:text-indigo-800"
                    title="Edit"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomersPage;
