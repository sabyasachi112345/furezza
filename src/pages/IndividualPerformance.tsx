// src/pages/IndividualPerformance.tsx
import React, { useState } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { technicianPerformance } from "../data/individualPerformanceData";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const IndividualPerformance: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedTechIndex, setSelectedTechIndex] = useState<number | null>(null);

  const handleOpen = (index: number) => {
    setSelectedTechIndex(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTechIndex(null);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Individual Performance Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {technicianPerformance.map((tech, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all cursor-pointer text-center"
            onClick={() => handleOpen(index)}
          >
            <h3 className="text-xl font-semibold text-blue-600 hover:underline">
              {tech.name}
            </h3>
            <p className="text-sm text-gray-500 mt-2">Click to view performance</p>
          </div>
        ))}
      </div>

      {/* Modal Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle sx={{ m: 0, p: 2 }}>
          <Typography variant="h6">
            {selectedTechIndex !== null && technicianPerformance[selectedTechIndex].name}'s Performance
          </Typography>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          {selectedTechIndex !== null && (() => {
            const tech = technicianPerformance[selectedTechIndex];

            const barData = {
              labels: tech.dates,
              datasets: [
                {
                  label: "Jobs Completed",
                  data: tech.jobsCompleted,
                  backgroundColor: "#4ade80",
                },
              ],
            };

            const lineData = {
              labels: tech.dates,
              datasets: [
                {
                  label: "Efficiency (%)",
                  data: tech.efficiency,
                  borderColor: "#60a5fa",
                  backgroundColor: "#bfdbfe",
                  tension: 0.4,
                },
              ],
            };

            return (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
                <div>
                  <h4 className="text-md font-semibold text-gray-700 mb-3">Jobs Completed</h4>
                  <Bar data={barData} />
                </div>

                <div>
                  <h4 className="text-md font-semibold text-gray-700 mb-3">Efficiency Over Time</h4>
                  <Line data={lineData} />
                </div>
              </div>
            );
          })()}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IndividualPerformance;
