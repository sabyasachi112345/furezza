// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { Calendar, Phone, Mail, Smartphone, Clock, MapPin, User, Building2, Settings, Users } from 'lucide-react';

// interface ProfileData {
//   name: string;
//   type: string;
//   manager: string;
//   department: string;
//   center: string;
//   calendarUntil: string;
//   lastSync: string;
//   currentStatus: string;
//   currentFreeCapacity: string;
//   timeZone: string;
//   resourceTime: string;
//   startLocation: string;
//   currentLocation: string;
//   endLocation: string;
//   phone: string;
//   email: string;
//   mobilePhone: string;
//   fullDayAvailable: string;
//   skills: string[];
// }

// import { initialPatrollers } from '../data/patrollers';

// // Adapter to add mock fields needed for UI
// const patrollers = initialPatrollers.map((p, idx) => ({
//   id: p.id,
//   name: p.name,
//   type: 'Patroller',
//   manager: 'Hashim',
//   department: [
//     'Security',
//     'Traffic',
//     'Crowd Control',
//     'Surveillance',
//   ][idx] || 'Security',
//   center: 'Main HQ',
//   calendarUntil: '27 Jul 2025',
//   lastSync: '05 Jul 2025 17:33:42',
//   currentStatus: p.status === 'Online' ? 'Active' : 'Inactive',
//   currentFreeCapacity: '00:00',
//   timeZone: 'GMT+08:00 China Standard Time',
//   resourceTime: '25 Jun 2025 19:43',
//   startLocation: p.location,
//   currentLocation: 'N / D',
//   endLocation: p.location,
//   phone: p.phone,
//   email: p.email || [
//     'john@gmail.com',
//     'sarah.connor@gmail.com',
//     'mike.johnson@gmail.com',
//     'lisa.wang@gmail.com',
//   ][idx] || `${p.name.toLowerCase().replace(/ /g, '.')}@gmail.com`,
//   mobilePhone: p.phone,
//   fullDayAvailable: '08:30 - 18:00',
//   skills: [
//     ['Security Patrol', 'Emergency Response'],
//     ['Traffic Management', 'First Aid'],
//     ['Crowd Control', 'Fire Safety'],
//     ['Surveillance', 'Communication'],
//   ][idx] || ['General Duty'],
// }));

// const ProfileInterface: React.FC = () => {
//   const { id } = useParams();

//   // Try to find patroller by id, else fallback to original mock
//   const patroller = patrollers.find((p: any) => String(p.id) === String(id));

//   const [profileData] = useState<ProfileData>(patroller ? {
//     name: patroller.name,
//     type: patroller.type,
//     manager: patroller.manager,
//     department: patroller.department,
//     center: patroller.center,
//     calendarUntil: patroller.calendarUntil,
//     lastSync: patroller.lastSync,
//     currentStatus: patroller.currentStatus,
//     currentFreeCapacity: patroller.currentFreeCapacity,
//     timeZone: patroller.timeZone,
//     resourceTime: patroller.resourceTime,
//     startLocation: patroller.startLocation,
//     currentLocation: patroller.currentLocation,
//     endLocation: patroller.endLocation,
//     phone: patroller.phone,
//     email: patroller.email,
//     mobilePhone: patroller.mobilePhone,
//     fullDayAvailable: patroller.fullDayAvailable,
//     skills: patroller.skills
//   } : {
//     name: "Tom Mike (Mike)",
//     type: "Paroller EMTR",
//     manager: "Hashim",
//     department: "Fiber Cut",
//     center: "Fiber Cut Section",
//     calendarUntil: "27 Jul 2025",
//     lastSync: "05 Jul 2025 17:33:42",
//     currentStatus: "Resource is currently - Logged In",
//     currentFreeCapacity: "00:00",
//     timeZone: "GMT+08:00 China Standard Time",
//     resourceTime: "25 Jun 2025 19:43",
//     startLocation: "2 KALLANG SECTOR, MALAYSIA, 349347, MALAYSIA",
//     currentLocation: "N / D",
//     endLocation: "2 KALLANG SECTOR, MALAYSIA, 349347, MALAYSIA",
//     phone: "+65697773",
//     email: "Tommikel2@gmail.com",
//     mobilePhone: "+656398939",
//     fullDayAvailable: "08:30 - 18:00",
//     skills: ["EMTR - Meter Investigation"]
//   });

//   const [selectedDate, setSelectedDate] = useState(25);
//   const [currentMonth] = useState("June 2025");

//   // Calendar data for June 2025
//   const calendarDays = [
//     { day: 26, isOtherMonth: true }, { day: 27, isOtherMonth: true }, { day: 28, isOtherMonth: true }, 
//     { day: 29, isOtherMonth: true }, { day: 30, isOtherMonth: true }, { day: 31, isOtherMonth: true }, { day: 1 },
//     { day: 2 }, { day: 3 }, { day: 4 }, { day: 5 }, { day: 6 }, { day: 7 }, { day: 8 },
//     { day: 9 }, { day: 10 }, { day: 11 }, { day: 12 }, { day: 13 }, { day: 14 }, { day: 15 },
//     { day: 16 }, { day: 17 }, { day: 18 }, { day: 19 }, { day: 20 }, { day: 21 }, { day: 22 },
//     { day: 23 }, { day: 24 }, { day: 25, isSelected: true }, { day: 26 }, { day: 27 }, { day: 28 }, { day: 29 },
//     { day: 30 }, { day: 1, isOtherMonth: true }, { day: 2, isOtherMonth: true }, 
//     { day: 3, isOtherMonth: true }, { day: 4, isOtherMonth: true }, { day: 5, isOtherMonth: true }
//   ];

//   const InfoRow: React.FC<{ label: string; value: string; isStatus?: boolean; isLink?: boolean }> = ({ 
//     label, 
//     value, 
//     isStatus = false, 
//     isLink = false 
//   }) => (
//     <div className="flex py-1">
//       <div className="w-32 text-sm font-medium text-gray-700">{label}</div>
//       <div className={`text-sm ${isStatus ? 'text-green-600' : isLink ? 'text-blue-600 underline cursor-pointer' : 'text-gray-900'}`}>
//         {value}
//       </div>
//     </div>
//   );

//   return (
//     <div className="max-w-6xl mx-auto bg-white shadow-lg">
//       {/* Header */}
//       <div className="bg-blue-50 px-6 py-3 border-b flex items-center">
//         <User className="w-5 h-5 text-blue-600 mr-2" />
//         <h1 className="text-lg font-semibold text-gray-800">Profile of {profileData.name}</h1>
//       </div>

//       <div className="flex">
//         {/* Main Content */}
//         <div className="flex-1 p-6">
//           {/* Basic Information */}
//           <div className="mb-6">
//             <InfoRow label="Type" value={profileData.type} />
//             <InfoRow label="Manager" value={profileData.manager} />
//             <InfoRow label="Department" value={profileData.department} />
//             <InfoRow label="Center" value={profileData.center} />
//             <InfoRow label="Calendar Until" value={profileData.calendarUntil} />
//             <InfoRow label="Last Sync" value={profileData.lastSync} />
//             <InfoRow label="Current Status" value={profileData.currentStatus} isStatus={true} />
//             <InfoRow label="Current Free Capacity" value={profileData.currentFreeCapacity} />
//             <InfoRow label="Time Zone" value={profileData.timeZone} />
//             <InfoRow label="Resource time" value={profileData.resourceTime} />
//           </div>

//           {/* Locations */}
//           <div className="mb-6">
//             <div className="flex py-1">
//               <div className="w-32 text-sm font-medium text-gray-700">Start Location</div>
//               <div className="text-sm text-blue-600 underline cursor-pointer">{profileData.startLocation}</div>
//             </div>
//             <div className="flex py-1">
//               <div className="w-32 text-sm font-medium text-gray-700">Current Location</div>
//               <div className="text-sm text-gray-900">{profileData.currentLocation}</div>
//             </div>
//             <div className="flex py-1">
//               <div className="w-32 text-sm font-medium text-gray-700">End Location</div>
//               <div className="text-sm text-blue-600 underline cursor-pointer">{profileData.endLocation}</div>
//             </div>
//           </div>

//           {/* Contact Information */}
//           <div className="mb-6">
//             <h3 className="text-blue-600 font-medium mb-3 cursor-pointer underline">Contact Information</h3>
//             <div className="flex items-center py-1">
//               <Phone className="w-4 h-4 text-gray-500 mr-2" />
//               <div className="w-28 text-sm font-medium text-gray-700">Phone</div>
//               <div className="text-sm text-gray-900">{profileData.phone}</div>
//             </div>
//             <div className="flex items-center py-1">
//               <Mail className="w-4 h-4 text-gray-500 mr-2" />
//               <div className="w-28 text-sm font-medium text-gray-700">Email</div>
//               <div className="text-sm text-blue-600 underline cursor-pointer">{profileData.email}</div>
//             </div>
//             <div className="flex items-center py-1">
//               <Smartphone className="w-4 h-4 text-gray-500 mr-2" />
//               <div className="w-28 text-sm font-medium text-gray-700">Mobile Phone</div>
//               <div className="text-sm text-gray-900">{profileData.mobilePhone}</div>
//             </div>
//           </div>

//           {/* Calendar Section */}
//           <div className="mb-6">
//             <h3 className="text-blue-600 font-medium mb-3 cursor-pointer underline">Calendar</h3>
//             <InfoRow label="Full day Available" value={profileData.fullDayAvailable} />
//           </div>

//           {/* Zones Section */}
//           <div className="mb-6">
//             <h3 className="text-blue-600 font-medium mb-3 cursor-pointer underline">Zones</h3>
//             <button className="text-blue-600 underline text-sm hover:text-blue-800">Update Zones</button>
//           </div>

//           {/* Skills Section */}
//           <div className="mb-6">
//             <h3 className="text-blue-600 font-medium mb-3 cursor-pointer underline">Skills</h3>
//             <div className="text-sm text-gray-900 mb-2">{profileData.skills.join(", ")}</div>
//             <button className="text-blue-600 underline text-sm hover:text-blue-800">Update Skills</button>
//           </div>
//         </div>

//         {/* Calendar Widget */}
//         <div className="w-80 bg-gray-50 p-4 border-l">
//           <div className="bg-white rounded-lg shadow-sm p-4">
//             <div className="flex justify-between items-center mb-4">
//               <button className="text-gray-500 hover:text-gray-700">&lt;</button>
//               <h4 className="font-medium text-gray-800">{currentMonth}</h4>
//               <button className="text-gray-500 hover:text-gray-700">&gt;</button>
//             </div>
            
//             <div className="grid grid-cols-7 gap-1 mb-2">
//               {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
//                 <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
//                   {day}
//                 </div>
//               ))}
//             </div>
            
//             <div className="grid grid-cols-7 gap-1">
//               {calendarDays.map((date, index) => (
//                 <button
//                   key={index}
//                   onClick={() => !date.isOtherMonth && setSelectedDate(date.day)}
//                   className={`
//                     h-8 w-8 text-sm rounded hover:bg-blue-100 transition-colors
//                     ${date.isOtherMonth ? 'text-gray-300' : 'text-gray-700'}
//                     ${date.isSelected ? 'bg-green-500 text-white hover:bg-green-600' : ''}
//                   `}
//                 >
//                   {date.day}
//                 </button>
//               ))}
//             </div>
            
//             <div className="mt-4 text-right">
//               <div className="text-xs text-blue-600">Today: 25 Jun</div>
//               <div className="text-xs text-blue-600">2025</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileInterface;

import React, { useState, useEffect } from "react";
import { useParams ,link } from "react-router-dom";
import { Phone, Mail, Smartphone, User } from "lucide-react";
import { initialPatrollers } from "../data/patrollers";

interface ProfileData {
  name: string;
  type: string;
  manager: string;
  department: string;
  center: string;
  calendarUntil: string;
  lastSync: string;
  currentStatus: string;
  currentFreeCapacity: string;
  timeZone: string;
  resourceTime: string;
  startLocation: string;
  currentLocation: string;
  endLocation: string;
  phone: string;
  email: string;
  mobilePhone: string;
  fullDayAvailable: string;
  skills: string[];
}

// Adapt patrollers mock data
const patrollers = initialPatrollers.map((p, idx) => ({
  id: p.id,
  name: p.name,
  type: "Patroller",
  manager: "Hashim",
  department: ["Security", "Traffic", "Crowd Control", "Surveillance"][idx] || "Security",
  center: "Main HQ",
  calendarUntil: "27 Jul 2025",
  lastSync: "05 Jul 2025 17:33:42",
  currentStatus: p.status === "Online" ? "Active" : "Inactive",
  currentFreeCapacity: "00:00",
  timeZone: "GMT+08:00 China Standard Time",
  resourceTime: "25 Jun 2025 19:43",
  startLocation: p.location,
  currentLocation: "N / D",
  endLocation: p.location,
  phone: p.phone,
  email:
    p.email ||
    ["john@gmail.com", "sarah.connor@gmail.com", "mike.johnson@gmail.com", "lisa.wang@gmail.com"][idx] ||
    `${p.name.toLowerCase().replace(/ /g, ".")}@gmail.com`,
  mobilePhone: p.phone,
  fullDayAvailable: "08:30 - 18:00",
  skills:
    [
      ["Security Patrol", "Emergency Response"],
      ["Traffic Management", "First Aid"],
      ["Crowd Control", "Fire Safety"],
      ["Surveillance", "Communication"],
    ][idx] || ["General Duty"],
}));

const UserRoleManagement:React.FC =() => {
  const { id } = useParams();
  const patroller = patrollers.find((p: any) => String(p.id) === String(id));

  const [profileData, setProfileData] = useState<ProfileData>(
    patroller || {
      name: "Tom Mike (Mike)",
      type: "Paroller EMTR",
      manager: "Hashim",
      department: "Fiber Cut",
      center: "Fiber Cut Section",
      calendarUntil: "27 Jul 2025",
      lastSync: "05 Jul 2025 17:33:42",
      currentStatus: "Resource is currently - Logged In",
      currentFreeCapacity: "00:00",
      timeZone: "GMT+08:00 China Standard Time",
      resourceTime: "25 Jun 2025 19:43",
      startLocation: "2 KALLANG SECTOR, MALAYSIA, 349347, MALAYSIA",
      currentLocation: "N / D",
      endLocation: "2 KALLANG SECTOR, MALAYSIA, 349347, MALAYSIA",
      phone: "+65697773",
      email: "Tommikel2@gmail.com",
      mobilePhone: "+656398939",
      fullDayAvailable: "08:30 - 18:00",
      skills: ["EMTR - Meter Investigation"],
    }
  );

  // 🚀 Function that runs when user clicks User Role Management
  const handleUserRoleLoad = () => {
    console.log("UserRoleManagement page opened ✅");
   // alert(`Welcome to User Role Management: ${profileData.name}`);
    // Here you can also fetch data from backend, update state, etc.
  };

  // Run when component mounts
  useEffect(() => {
    handleUserRoleLoad();
  }, [id]);

  const InfoRow: React.FC<{ label: string; value: string; isStatus?: boolean }> = ({
    label,
    value,
    isStatus = false,
  }) => (
    <div className="flex py-1">
      <div className="w-32 text-sm font-medium text-gray-700">{label}</div>
      <div
        className={`text-sm ${
          isStatus ? "text-green-600 font-semibold" : "text-gray-900"
        }`}
      >
        {value}
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg">
      {/* Header */}
      <div className="bg-blue-50 px-6 py-3 border-b flex items-center">
        <User className="w-5 h-5 text-blue-600 mr-2" />
        <h1 className="text-lg font-semibold text-gray-800">
          User Role Management - {profileData.name}
        </h1>
      </div>

      <div className="flex">
        {/* Main Info */}
        <div className="flex-1 p-6">
          <h3 className="text-gray-800 font-medium mb-3">Basic Information</h3>
          <InfoRow label="Type" value={profileData.type} />
          <InfoRow label="Manager" value={profileData.manager} />
          <InfoRow label="Department" value={profileData.department} />
          <InfoRow label="Center" value={profileData.center} />
          <InfoRow label="Calendar Until" value={profileData.calendarUntil} />
          <InfoRow label="Last Sync" value={profileData.lastSync} />
          <InfoRow label="Current Status" value={profileData.currentStatus} isStatus />
          <InfoRow label="Free Capacity" value={profileData.currentFreeCapacity} />
          <InfoRow label="Time Zone" value={profileData.timeZone} />
          <InfoRow label="Resource Time" value={profileData.resourceTime} />

          {/* Contact */}
          <h3 className="text-gray-800 font-medium mt-6 mb-3">Contact Information</h3>
          <div className="flex items-center py-1">
            <Phone className="w-4 h-4 text-gray-500 mr-2" />
            <span className="text-sm">{profileData.phone}</span>
          </div>
          <div className="flex items-center py-1">
            <Mail className="w-4 h-4 text-gray-500 mr-2" />
            <span className="text-sm text-blue-600 underline cursor-pointer">{profileData.email}</span>
          </div>
          <div className="flex items-center py-1">
            <Smartphone className="w-4 h-4 text-gray-500 mr-2" />
            <span className="text-sm">{profileData.mobilePhone}</span>
          </div>

          {/* Skills */}
          <h3 className="text-gray-800 font-medium mt-6 mb-2">Skills</h3>
          <div className="text-sm text-gray-900">{profileData.skills.join(", ")}</div>
          <button className="mt-2 text-blue-600 underline text-sm hover:text-blue-800">
            Update Skills
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserRoleManagement;
