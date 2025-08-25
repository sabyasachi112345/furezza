// import React, { useEffect, useRef, useState } from "react";
// import {
//   Menu, ChevronDown, ChevronRight, Briefcase, Users, Building,
//   Calendar, Truck, BarChart2, FileUp, UserCheck,
//   ClipboardList, Clock3, UserPlus, Share2, X
// } from "lucide-react";
// import { useNavigate, useLocation } from "react-router-dom";

// // ---------- Modal: Job Feedback ----------
// const FeedbackFormModal = ({ onSubmit, onClose }) => {
//   const [feedback, setFeedback] = useState("");
//   const [rating, setRating] = useState(5);
//   const [attachments, setAttachments] = useState<File[]>([]);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setAttachments(Array.from(e.target.files));
//     }
//   };

//   const handleSubmit = () => {
//     onSubmit({ feedback, rating, attachments });
//   };

//   return (
//     <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center p-6">
//       <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full space-y-4">
//         <h2 className="text-lg font-semibold">Job Completion / Feedback</h2>
//         <textarea
//           className="w-full border rounded p-2"
//           placeholder="Enter feedback..."
//           value={feedback}
//           onChange={(e) => setFeedback(e.target.value)}
//         />
//         <div>
//           <label className="block text-sm">Rating (1-10)</label>
//           <input
//             type="number"
//             className="w-full border rounded p-1"
//             min={1}
//             max={10}
//             value={rating}
//             onChange={(e) => setRating(Number(e.target.value))}
//           />
//         </div>
//         <input
//           type="file"
//           multiple
//           onChange={handleFileChange}
//           className="block"
//         />
//         <div className="flex justify-end gap-2">
//           <button className="bg-gray-300 px-3 py-1 rounded" onClick={onClose}>Cancel</button>
//           <button className="bg-blue-600 text-white px-3 py-1 rounded" onClick={handleSubmit}>
//             Submit
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ---------- Modal: Job Upload ----------
// const JobUploadModal = ({ onSubmit, onClose }) => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [files, setFiles] = useState<File[]>([]);

//   const handleUpload = () => {
//     onSubmit({ title, description, files });
//   };

//   return (
//     <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center p-6">
//       <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full space-y-4">
//         <h2 className="text-lg font-semibold">Job File Upload</h2>
//         <input
//           type="text"
//           className="w-full border rounded p-2"
//           placeholder="Job Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <textarea
//           className="w-full border rounded p-2"
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />
//         <input
//           type="file"
//           multiple
//           onChange={(e) => e.target.files && setFiles(Array.from(e.target.files))}
//         />
//         <div className="flex justify-end gap-2">
//           <button className="bg-gray-300 px-3 py-1 rounded" onClick={onClose}>Cancel</button>
//           <button className="bg-green-600 text-white px-3 py-1 rounded" onClick={handleUpload}>Upload</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ---------- Modal: Integration Config (Stub) ----------
// const IntegrationModal = ({ onClose }) => (
//   <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center p-6">
//     <div className="bg-white p-6 rounded-lg shadow max-w-md w-full space-y-4">
//       <h2 className="text-lg font-semibold">Integration Configuration</h2>
//       <p className="text-sm text-gray-600">This section is under development.</p>
//       <div className="flex justify-end">
//         <button className="bg-gray-300 px-3 py-1 rounded" onClick={onClose}>Close</button>
//       </div>
//     </div>
//   </div>
// );

// // ---------- Sidebar Component ----------
// const SideBarMenu: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [showFeedback, setShowFeedback] = useState(false);
//   const [showUpload, setShowUpload] = useState(false);
//   const [showIntegration, setShowIntegration] = useState(false);
//   const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});
//   const menuRef = useRef<HTMLDivElement>(null);
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const handler = (e: MouseEvent) => {
//       if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
//         setIsOpen(false);
//       }
//     };
//     if (isOpen) document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, [isOpen]);

//   const openRoute = (route: string) => {
//     setIsOpen(false);
//     navigate(route);
//   };

//   const sections = [
//     {
//       title: "MANAGEMENT",
//       items: [
//         { label: "Jobs", icon: <Briefcase size={14} />, route: "/jobs" },
//         { label: "Technicians", icon: <Users size={14} />, route: "/technicians" },
//         { label: "Customers", icon: <Building size={14} />, route: "/customers" },
//         { label: "Job Completion/Feedback", icon: <ClipboardList size={14} />, onClick: () => setShowFeedback(true) },
//       ],
//     },
//     {
//       title: "OPERATIONS",
//       items: [
//         { label: "Schedules", icon: <Calendar size={14} />, route: "/schedules" },
//         { label: "Dispatch", icon: <Truck size={14} />, route: "/dispatch" },
//         { label: "User & Role Management", icon: <UserPlus size={14} />, route: "/user-role-management" },
//       ],
//     },
//     {
//       title: "ATTENDANCE & LEAVE MANAGEMENT (Supervisor)",
//       items: [
//         { label: "Supervisor Approval", icon: <UserCheck size={14} />, route: "/supervisor-approval" },
//         { label: "Attendance Logs", icon: <Clock3 size={14} />, route: "/attendance-logs" },
//         { label: "Leave Requests", icon: <Calendar size={14} />, route: "/leave-requests" },
//       ],
//     },
//     {
//       title: "DASHBOARD & REPORTS",
//       items: [
//         { label: "Individual Performance", icon: <BarChart2 size={14} />, route: "/individual-performance" },
//         { label: "Job Tracking", icon: <Briefcase size={14} />, route: "/job-tracking" },
//         { label: "Workforce Activity Monitor", icon: <Users size={14} />, route: "/workforce-activity" },
//         { label: "Live OPS & History Trends", icon: <BarChart2 size={14} />, route: "/live-ops-history" },
//       ],
//     },
//     {
//       title: "FIELD FORCE MANAGEMENT",
//       items: [
//         { label: "Patroller Status", icon: <UserCheck size={14} />, route: "/patroller-status" },
//         { label: "Resource Availability", icon: <Share2 size={14} />, route: "/resource-availability" },
//       ],
//     },
//     {
//       title: "JOB CREATION",
//       items: [
//         { label: "File Upload", icon: <FileUp size={14} />, onClick: () => setShowUpload(true) },
//       ],
//     },
//     {
//       title: "INTEGRATIONS & CONFIGURATION",
//       items: [
//         { label: "API Integrations (OSS/BSS/ERP/GIS)", icon: <Share2 size={14} />, onClick: () => setShowIntegration(true) },
//       ],
//     },
//     {
//       title: "ROUTE MANAGEMENT",
//       items: [
//         { label: "Route Creation / Halt Addition", icon: <Truck size={14} />, route: "/route-creation" },
//         { label: "Route Assignment Roster", icon: <ClipboardList size={14} />, route: "/route-assignment" },
//         { label: "Planned vs Actual Route Viewer", icon: <BarChart2 size={14} />, route: "/planned-vs-actual" },
//         { label: "Live GPS Map View", icon: <BarChart2 size={14} />, route: "/gps-map" },
//       ],
//     },
//   ];

//   return (
//     <>
//       <button onClick={() => setIsOpen(true)} className="p-2 m-2 text-gray-700 hover:text-blue-600">
//         <Menu size={22} />
//       </button>

//       <nav
//         ref={menuRef}
//         className={`fixed top-0 left-0 z-40 w-64 h-full bg-white border-r shadow transition-transform ${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         <div className="p-4 overflow-y-auto h-full">
//           {sections.map((sec) => (
//             <div key={sec.title} className="mb-4">
//               <button
//                 className="flex items-center w-full text-left font-medium text-gray-800 hover:text-blue-600"
//                 onClick={() =>
//                   setOpenSections((ps) => ({ ...ps, [sec.title]: !ps[sec.title] }))
//                 }
//               >
//                 {openSections[sec.title] ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
//                 <span className="ml-1">{sec.title}</span>
//               </button>
//               {openSections[sec.title] && (
//                 <ul className="mt-2 ml-4 space-y-1">
//                   {sec.items.map((item) => {
//                     const active = item.route && location.pathname.startsWith(item.route);
//                     return (
//                       <li
//                         key={item.label}
//                         className={`flex items-center gap-2 cursor-pointer p-1 rounded ${
//                           active ? "text-blue-600 bg-blue-50 font-semibold" : "text-gray-700 hover:text-blue-600"
//                         }`}
//                         onClick={() =>
//                           item.route ? openRoute(item.route) : item.onClick?.()
//                         }
//                         role="menuitem"
//                       >
//                         {item.icon}
//                         <span>{item.label}</span>
//                       </li>
//                     );
//                   })}
//                 </ul>
//               )}
//             </div>
//           ))}
//         </div>
//       </nav>

//       {/* Modals */}
//       {showFeedback && (
//         <FeedbackFormModal
//           onSubmit={(d) => {
//             console.log("Feedback Submitted:", d);
//             setShowFeedback(false);
//           }}
//           onClose={() => setShowFeedback(false)}
//         />
//       )}
//       {showUpload && (
//         <JobUploadModal
//           onSubmit={(d) => {
//             console.log("File Uploaded:", d);
//             setShowUpload(false);
//           }}
//           onClose={() => setShowUpload(false)}
//         />
//       )}
//       {showIntegration && <IntegrationModal onClose={() => setShowIntegration(false)} />}
//     </>
//   );
// };

// export default SideBarMenu;


import React, { useEffect, useRef, useState } from "react";
import {
  Menu, ChevronDown, ChevronRight, Briefcase, Users, Building,
  Calendar, Truck, BarChart2, FileUp, UserCheck,
  ClipboardList, Clock3, UserPlus, Share2, X
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';

<Link to="/user-role-management">User Role Management</Link>


// ---------- Modal: Job Feedback ----------
const FeedbackFormModal = ({ onSubmit, onClose }) => {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(5);
  const [attachments, setAttachments] = useState([]);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setAttachments(Array.from(e.target.files));
    }
  };

  const handleSubmit = () => {
    onSubmit({ feedback, rating, attachments });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full space-y-4">
        <h2 className="text-lg font-semibold">Job Completion / Feedback</h2>
        <textarea
          className="w-full border rounded p-2"
          placeholder="Enter feedback..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <div>
          <label className="block text-sm">Rating (1-10)</label>
          <input
            type="number"
            className="w-full border rounded p-1"
            min={1}
            max={10}
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          />
        </div>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="block"
        />
        <div className="flex justify-end gap-2">
          <button className="bg-gray-300 px-3 py-1 rounded" onClick={onClose}>Cancel</button>
          <button className="bg-blue-600 text-white px-3 py-1 rounded" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

// ---------- Modal: Job Upload ----------
const JobUploadModal = ({ onSubmit, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [dragging, setDragging] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files) {
      setFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleUpload = () => {
    const totalSize = files.reduce((acc, file) => acc + file.size, 0);
    const fileData = files.map(file => ({
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`
    }));
    onSubmit({ title, description, files, totalSize, fileData });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full space-y-4">
        <h2 className="text-lg font-semibold">Job File Upload</h2>
        <input
          type="text"
          className="w-full border rounded p-2"
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full border rounded p-2"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={`border-2 p-4 text-center rounded cursor-pointer transition ${dragging ? 'bg-blue-50 border-blue-400' : 'border-dashed'}`}
        >
          Drag & Drop files here or click below
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="block w-full mt-2"
          />
        </div>

        {files.length > 0 && (
          <div className="mt-4 text-sm text-gray-700">
            <strong>Total Files:</strong> {files.length}<br />
            <strong>Total Size:</strong> {(files.reduce((acc, f) => acc + f.size, 0) / 1024 / 1024).toFixed(2)} MB
            <ul className="mt-2 list-disc ml-5">
              {files.map((file, idx) => (
                <li key={idx}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex justify-end gap-2">
          <button className="bg-gray-300 px-3 py-1 rounded" onClick={onClose}>Cancel</button>
          <button className="bg-green-600 text-white px-3 py-1 rounded" onClick={handleUpload}>Upload</button>
        </div>
      </div>
    </div>
  );
};

// ---------- Modal: Integration Config (Stub) ----------
const IntegrationModal = ({ onClose }) => (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center p-6">
    <div className="bg-white p-6 rounded-lg shadow max-w-md w-full space-y-4">
      <h2 className="text-lg font-semibold">Integration Configuration</h2>
      <p className="text-sm text-gray-600">This section is under development.</p>
      <div className="flex justify-end">
        <button className="bg-gray-300 px-3 py-1 rounded" onClick={onClose}>Close</button>
      </div>
    </div>
  </div>
);

// ---------- Sidebar Component ----------
const SideBarMenu = ({ showMenuButton = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [showIntegration, setShowIntegration] = useState(false);
  const [openSections, setOpenSections] = useState({});
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  const openRoute = (route) => {
    setIsOpen(false);
    navigate(route);
  };

  const sections = [
    {
      title: "MANAGEMENT",
      items: [
        { label: "Jobs", icon: <Briefcase size={18} />, route: "/jobs" },
  { label: "Technicians", icon: <Users size={18} />, route: "/technicians" },
  { label: "Customers", icon: <Building size={18} />, route: "/customers" },
  { label: "User Role Management", icon: <Building size={18} />, route: "/user-role-management" },
  { label: "Job Completion/Feedback", icon: <ClipboardList size={18} />, route: "/job-feedback" },
      ],
    },
   
    {
      title: "ATTENDANCE & LEAVE MANAGEMENT (Supervisor)",
      items: [
        { label: "Supervisor Approval", icon: <UserCheck size={14} />, route: "/supervisor-approval" },
        { label: "Attendance Logs", icon: <Clock3 size={14} />, route: "/attendance-logs" },
      ],
    },
    {
      title: "DASHBOARD & REPORTS",
      items: [
        { label: "Individual Performance", icon: <BarChart2 size={14} />, route: "/individual-performance" },
        { label: "Job Tracking", icon: <Briefcase size={14} />, route: "/job-tracking" },
        { label: "Workforce Activity Monitor", icon: <Users size={14} />, route: "/workforce-activity" },
        { label: "Live OPS & History Trends", icon: <BarChart2 size={14} />, route: "/live-ops-history" },
      ],
    },
    {
      title: "FIELD FORCE MANAGEMENT",
      items: [
        { label: "Patroller Status", icon: <UserCheck size={14} />, route: "/patroller-status" },
        { label: "Resource Availability", icon: <Share2 size={14} />, route: "/resource-availability" },
      ],
    },
    {
      title: "JOB CREATION",
      items: [
        { label: "File Upload", icon: <FileUp size={14} />, onClick: () => setShowUpload(true) },
      ],
    },
    {
      title: "INTEGRATIONS & CONFIGURATION",
      items: [
        { label: "API Integrations (OSS/BSS/ERP/GIS)", icon: <Share2 size={14} />, onClick: () => setShowIntegration(true) },
      ],
    },
    {
      title: "ROUTE MANAGEMENT",
      items: [
        { label: "Route Creation / Halt Addition", icon: <Truck size={14} />, route: "/route-creation" },
        { label: "Route Assignment Roster", icon: <ClipboardList size={14} />, route: "/route-assignment" },
        { label: "Planned vs Actual Route Viewer", icon: <BarChart2 size={14} />, route: "/planned-vs-actual" },
        { label: "Live GPS Map View", icon: <BarChart2 size={14} />, route: "/gps-map" },
      ],
    },
  ];

  return (
    <>
      {showMenuButton && (
        <button onClick={() => setIsOpen(true)} className="p-2 m-2 text-gray-700 hover:text-blue-600">
          <Menu size={22} />
        </button>
      )}

      <nav
        ref={menuRef}
        className={`fixed top-0 left-0 z-40 w-64 h-full bg-white border-r shadow transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 overflow-y-auto h-full">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-800">Menu</h3>
            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-gray-100 rounded">
              <X size={18} />
            </button>
          </div>

          {sections.map((sec) => (
            <div key={sec.title} className="mb-4">
              <button
                className="flex items-center w-full text-left font-medium text-gray-800 hover:text-blue-600"
                onClick={() => setOpenSections((ps) => ({ ...ps, [sec.title]: !ps[sec.title] }))}
              >
                {openSections[sec.title] ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                <span className="ml-1">{sec.title}</span>
              </button>
              {openSections[sec.title] && (
                <ul className="mt-2 ml-4 space-y-1">
                  {sec.items.map((item) => {
                    const active = item.route && location.pathname.startsWith(item.route);
                    return (
                      <li
                        key={item.label}
                        className={`flex items-center gap-2 cursor-pointer p-1 rounded ${
                          active ? "text-blue-600 bg-blue-50 font-semibold" : "text-gray-700 hover:text-blue-600"
                        }`}
                        onClick={() => item.route ? openRoute(item.route) : item.onClick?.()}
                        role="menuitem"
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          ))}
        </div>
      </nav>

      {showFeedback && (
        <FeedbackFormModal
          onSubmit={(d) => {
            console.log("Feedback Submitted:", d);
            setShowFeedback(false);
          }}
          onClose={() => setShowFeedback(false)}
        />
      )}
      {showUpload && (
        <JobUploadModal
          onSubmit={(d) => {
            console.log("File Uploaded:", d);
            setShowUpload(false);
          }}
          onClose={() => setShowUpload(false)}
        />
      )}
      {showIntegration && <IntegrationModal onClose={() => setShowIntegration(false)} />}
    </>
  );
};
export default SideBarMenu;

