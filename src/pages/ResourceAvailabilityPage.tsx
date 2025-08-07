import React, { useState } from 'react';
import { Technician, Status } from '../types/technician';
import { sampleTechs } from '../data/technicians';

// Filter Buttons Component
interface FilterButtonsProps {
  currentFilter: 'All' | Status;
  onChange: (filter: 'All' | Status) => void;
}
const FilterButtons: React.FC<FilterButtonsProps> = ({ currentFilter, onChange }) => {
  const filters: ('All' | Status)[] = ['All', 'Active', 'Unavailable'];

  return (
    <div className="mb-6 flex flex-wrap gap-3">
      {filters.map(f => (
        <button
          key={f}
          onClick={() => onChange(f)}
          className={`px-5 py-2 rounded-full shadow-sm transition-all duration-200 text-sm font-semibold 
            ${
              currentFilter === f
                ? 'bg-blue-700 text-white'
                : 'bg-gray-200 hover:bg-blue-100 text-gray-700'
            }`}
        >
          {f}
        </button>
      ))}
    </div>
  );
};

// Technician Row Component
interface TechnicianRowProps {
  tech: Technician;
  onUpdate: (id: number, key: keyof Technician, value: any) => void;
}
const TechnicianRow: React.FC<TechnicianRowProps> = ({ tech, onUpdate }) => {
  return (
    <tr className="hover:bg-gray-50 transition">
      <td className="px-4 py-3 font-medium whitespace-nowrap">{tech.name}</td>

      <td className="px-4 py-3">
        <select
          value={tech.status}
          onChange={e => onUpdate(tech.id, 'status', e.target.value)}
          className={`px-3 py-1 rounded font-medium focus:outline-none transition 
            ${tech.status === 'Active' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
        >
          <option value="Active">Active</option>
          <option value="Unavailable">Unavailable</option>
        </select>
      </td>

      <td className="px-4 py-3">
        <input
          type="number"
          min={0}
          value={tech.tasksAssigned}
          onChange={e => onUpdate(tech.id, 'tasksAssigned', e.target.value)}
          className="w-20 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </td>

      <td className="px-4 py-3">
        <select
          value={tech.lastShift || ''}
          onChange={e => onUpdate(tech.id, 'lastShift', e.target.value)}
          className="px-3 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">N/A</option>
          <option value="Day">Day</option>
          <option value="Night">Night</option>
        </select>
      </td>

      <td className="px-4 py-3 text-sm text-gray-600 max-w-xs">
        {tech.status === 'Active'
          ? '✅ Available for new assignments.'
          : '❌ Cannot assign tasks when unavailable.'}
      </td>
    </tr>
  );
};

// Technician Table Component
interface TechnicianTableProps {
  technicians: Technician[];
  onUpdate: (id: number, key: keyof Technician, value: any) => void;
}
const TechnicianTable: React.FC<TechnicianTableProps> = ({ technicians, onUpdate }) => (
  <div className="w-full overflow-x-auto rounded-xl shadow-sm border border-gray-200">
    <table className="w-full text-sm text-left text-gray-800 min-w-[768px]">
      <thead className="bg-blue-100 sticky top-0 z-10">
        <tr>
          <th className="px-4 py-3 font-semibold">Name</th>
          <th className="px-4 py-3 font-semibold">Status</th>
          <th className="px-4 py-3 font-semibold">Tasks Assigned</th>
          <th className="px-4 py-3 font-semibold">Last Shift</th>
          <th className="px-4 py-3 font-semibold">Rules / Notes</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100 bg-white">
        {technicians.map(tech => (
          <TechnicianRow key={tech.id} tech={tech} onUpdate={onUpdate} />
        ))}
      </tbody>
    </table>
  </div>
);

// Main Page Component
const ResourceAvailabilityPage: React.FC = () => {
  const [techs, setTechs] = useState<Technician[]>(sampleTechs);
  const [filter, setFilter] = useState<'All' | Status>('All');

  const handleUpdate = (id: number, key: keyof Technician, value: any) => {
    setTechs(prev =>
      prev.map(t =>
        t.id === id ? { ...t, [key]: key === 'tasksAssigned' ? parseInt(value) || 0 : value } : t
      )
    );
  };

  const filtered = techs.filter(t => filter === 'All' || t.status === filter);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-white py-10 px-4">
      <div className="w-full max-w-[95rem] mx-auto bg-white p-6 sm:p-10 rounded-xl shadow-lg">
        <h2 className="text-4xl font-extrabold mb-6 text-blue-800 flex items-center gap-2">
          🛠 Resource Availability
        </h2>

        <FilterButtons currentFilter={filter} onChange={setFilter} />

        <TechnicianTable technicians={filtered} onUpdate={handleUpdate} />

        {filtered.length === 0 && (
          <p className="mt-6 text-center text-gray-500">No technicians found.</p>
        )}
      </div>
    </div>
  );
};

export default ResourceAvailabilityPage;
