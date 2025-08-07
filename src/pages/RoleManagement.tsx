import React, { useState } from 'react';
import { initialPatrollers } from '../data/patrollers';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Info, ExternalLink } from 'lucide-react';

interface Patroller {
  id: number; // Use number for consistency with initialPatrollers
  name: string;
  status: 'Active' | 'Inactive';
  address: string;
  email: string;
  contactNo: string;
  skills: string[];
}

interface ZoneSkill {
  id: string;
  name: string;
}

const RoleManagement: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPatroller, setSelectedPatroller] = useState<string>('');
  const [selectedZoneSkill1, setSelectedZoneSkill1] = useState<string>('');
  const [selectedZoneSkill2, setSelectedZoneSkill2] = useState<string>('');
  const [filteredPatrollers, setFilteredPatrollers] = useState<Patroller[]>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);


// Adapter to add mock fields needed for UI
const patrollers: Patroller[] = initialPatrollers.map((p, idx) => ({
  id: p.id,
  name: p.name,
  status: p.status === 'Online' ? 'Active' : 'Inactive',
  address: p.location,
  email: p.email || [
    'john@gmail.com',
    'sarah.connor@gmail.com',
    'mike.johnson@gmail.com',
    'lisa.wang@gmail.com',
  ][idx] || `${p.name.toLowerCase().replace(/ /g, '.')}@gmail.com`,
  contactNo: p.phone,
  skills: [
    ['Security Patrol', 'Emergency Response'],
    ['Traffic Management', 'First Aid'],
    ['Crowd Control', 'Fire Safety'],
    ['Surveillance', 'Communication'],
  ][idx] || ['General Duty'],
}));

  // Enhanced patrollers data with skills for filtering
  const patrollersWithSkills = [
    { ...patrollers[0], skills: ['Security Patrol', 'Emergency Response'] },
    { ...patrollers[1], skills: ['Traffic Management', 'First Aid'] },
    { ...patrollers[2], skills: ['Crowd Control', 'Fire Safety'] },
    { ...patrollers[3], skills: ['Surveillance', 'Communication'] }
  ];

  const zoneSkills: ZoneSkill[] = [
    { id: '1', name: 'Security Patrol' },
    { id: '2', name: 'Traffic Management' },
    { id: '3', name: 'Emergency Response' },
    { id: '4', name: 'First Aid' },
    { id: '5', name: 'Crowd Control' },
    { id: '6', name: 'Fire Safety' },
    { id: '7', name: 'Surveillance' },
    { id: '8', name: 'Communication' }
  ];

  const getSelectedPatroller = (): Patroller | undefined => {
    return patrollers.find(p => p.id === Number(selectedPatroller));
  };

  const handleSubmit = () => {
    let results = [...patrollers];
    
    // Filter by selected patroller
    if (selectedPatroller) {
      results = results.filter(p => p.id === Number(selectedPatroller));
    }
    
    // Filter by zone/skills
    if (selectedZoneSkill1 || selectedZoneSkill2) {
      const selectedSkills = [];
      if (selectedZoneSkill1) {
        const skill1 = zoneSkills.find(z => z.id === selectedZoneSkill1)?.name;
        if (skill1) selectedSkills.push(skill1);
      }
      if (selectedZoneSkill2) {
        const skill2 = zoneSkills.find(z => z.id === selectedZoneSkill2)?.name;
        if (skill2) selectedSkills.push(skill2);
      }
      
      // Filter patrollers who have at least one of the selected skills
      results = results.filter(p => 
        selectedSkills.some(skill => p.skills.includes(skill))
      );
    }
    
    setFilteredPatrollers(results);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setSelectedPatroller('');
    setSelectedZoneSkill1('');
    setSelectedZoneSkill2('');
    setFilteredPatrollers([]);
    setIsSubmitted(false);
  };

  const handleRowClick = (patroller: any) => {
    navigate(`/user-role-management/${patroller.id}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-10 py-8 bg-white rounded-lg border border-gray-200">
      
      {/* Original Profile Details Form */}
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full border-2 border-blue-500 flex items-center justify-center">
              <Info className="w-4 h-4 text-blue-500" />
            </div>
            <h2 className="text-lg font-medium text-gray-700">Profile details</h2>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleReset}
              className="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Reset
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700 transition-colors"
            >
              Submit
            </button>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          {/* Patroller Name Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Patroller Name
            </label>
            <div className="relative">
              <select
                value={selectedPatroller}
                onChange={(e) => setSelectedPatroller(e.target.value)}
                className="w-full px-3 py-2 text-gray-500 bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Select Patroller Name</option>
                {patrollers.map((patroller) => (
                  <option key={patroller.id} value={patroller.id}>
                    {patroller.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Zone/Skills Dropdown 1 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Zone/Skills <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={selectedZoneSkill1}
                onChange={(e) => setSelectedZoneSkill1(e.target.value)}
                className="w-full px-3 py-2 text-gray-500 bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Select Zone/Skills</option>
                {zoneSkills.map((skill) => (
                  <option key={skill.id} value={skill.id}>
                    {skill.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Zone/Skills Dropdown 2 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Zone/Skills <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={selectedZoneSkill2}
                onChange={(e) => setSelectedZoneSkill2(e.target.value)}
                className="w-full px-3 py-2 text-gray-500 bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Select Zone/Skills</option>
                {zoneSkills.map((skill) => (
                  <option key={skill.id} value={skill.id}>
                    {skill.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="mt-8">
          {isSubmitted && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
              <p className="text-sm text-green-800">
                {filteredPatrollers.length > 0 
                  ? `Showing ${filteredPatrollers.length} matching result(s)`
                  : 'No matching results found'
                }
              </p>
            </div>
          )}
          
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patroller Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Address
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact No.
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Skills
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {(isSubmitted ? filteredPatrollers : patrollers).map((patroller, index) => (
                  <tr 
                    key={patroller.id} 
                    className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 cursor-pointer transition-colors`}
                    onClick={() => handleRowClick(patroller)}
                    title="Click to manage user roles"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        {patroller.name}
                        <ExternalLink className="w-4 h-4 ml-2 text-gray-400" />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        patroller.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {patroller.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {patroller.address}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {patroller.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {patroller.contactNo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex flex-wrap gap-1">
                        {patroller.skills.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Data Display */}
        {selectedPatroller && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-sm font-medium text-blue-800 mb-2">Selected Patroller Details:</h3>
            <div className="text-sm text-blue-700">
              <p><strong>Name:</strong> {getSelectedPatroller()?.name}</p>
              <p><strong>Status:</strong> {getSelectedPatroller()?.status}</p>
              <p><strong>Address:</strong> {getSelectedPatroller()?.address}</p>
              <p><strong>Email:</strong> {getSelectedPatroller()?.email}</p>
              <p><strong>Contact:</strong> {getSelectedPatroller()?.contactNo}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoleManagement;