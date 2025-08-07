import React from "react";
import { User, Briefcase } from "lucide-react";

const technicians = [
  { name: "John Smith", status: "online", jobs: 0 },
  { name: "Sarah Johnson", status: "offline", jobs: 0 },
  { name: "Mike Davis", status: "online", jobs: 0 },
  { name: "Lisa Wilson", status: "online", jobs: 0 },
  { name: "Emily Clark", status: "online", jobs: 0 },
  { name: "Daniel Evans", status: "offline", jobs: 0 },
  { name: "Olivia Martin", status: "online", jobs: 0 },
  { name: "James Moore", status: "online", jobs: 0 },
  { name: "Mia Jackson", status: "online", jobs: 0 },
  { name: "Liam White", status: "offline", jobs: 0 },
  { name: "Sophia Harris", status: "online", jobs: 0 },
  { name: "Jack Martinez", status: "online", jobs: 0 },
];

const statusColor = {
  online: "bg-green-500",
  offline: "bg-gray-400",
};

const TechnicianList: React.FC = () => {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">All Technicians</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {technicians.map((tech, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition duration-300 border border-gray-100"
          >
            <div className="flex items-center gap-4 mb-2">
              <div className="relative">
                <div className="bg-blue-100 p-2 rounded-full">
                  <User className="text-blue-600 w-5 h-5" />
                </div>
                <span
                  className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border border-white ${statusColor[tech.status]}`}
                ></span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{tech.name}</h3>
                <p className="text-sm text-gray-500">Technician</p>
              </div>
            </div>
            <div className="flex items-center text-sm text-blue-600 mt-2 gap-2">
              <Briefcase size={16} />
              <span>Jobs assigned: {tech.jobs}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechnicianList;
