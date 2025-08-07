import React, { useRef, useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, Tabs, Tab, Box, Typography,
  Grid, IconButton, Avatar, Divider, LinearProgress, Tooltip
} from '@mui/material';
import { Close, Print, AttachFile } from '@mui/icons-material';
import { Job, Technician } from '../../types';
import ReactToPrint from 'react-to-print';

interface Props {
  open: boolean;
  onClose: () => void;
  job: Job | null;
  technicians: Technician[];
}

const JobDetailModal: React.FC<Props> = ({ open, onClose, job, technicians }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const printRef = useRef(null);
  const [attachment, setAttachment] = useState<File | null>(null);

  if (!job) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachment(e.target.files[0]);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <Box ref={printRef}>
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#f4f6fb',
            px: 3,
            py: 2
          }}
        >
          <Typography variant="h6">
            <strong style={{ color: '#344767' }}>Notification Details</strong> &nbsp; Fault Id{' '}
            <Typography component="span" color="primary" fontWeight="bold">{job.id}</Typography> &nbsp; • Low Priority • &nbsp;
            <Typography component="span" sx={{ color: 'green', fontWeight: 600 }}>In Progress</Typography>
          </Typography>
          <Box>
            <Tooltip title="Print">
              <ReactToPrint
                trigger={() => <IconButton color="primary"><Print /></IconButton>}
                content={() => printRef.current}
              />
            </Tooltip>
            <Tooltip title="Attach File">
              <IconButton component="label">
                <AttachFile />
                <input type="file" hidden onChange={handleFileChange} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Close">
              <IconButton onClick={onClose}><Close /></IconButton>
            </Tooltip>
          </Box>
        </DialogTitle>

        <DialogContent sx={{ px: 3 }}>
          <Grid container spacing={2}>
            {/* LEFT PANEL */}
            <Grid item xs={12} md={3} sx={{ backgroundColor: '#eef2f7', borderRadius: 2, px: 2, py: 3 }}>
              <Typography color="primary" fontWeight="bold" fontSize={16}>
                <strong>🕒 30%</strong>
              </Typography>
              <LinearProgress variant="determinate" value={30} sx={{ my: 2 }} />

              <Typography variant="subtitle2" fontWeight="bold" mt={1}>START & END</Typography>
              <Typography>{job.startTime} - {job.endTime}</Typography>

              <Typography mt={2} variant="subtitle2" fontWeight="bold">DURATION</Typography>
              <Typography>{job.duration} Min</Typography>

              <Typography mt={2} variant="subtitle2" fontWeight="bold">Start Date</Typography>
              <Typography>{job.startDate}</Typography>

              <Typography mt={2} variant="subtitle2" fontWeight="bold">End Date</Typography>
              <Typography>{job.endDate}</Typography>

              <Typography mt={2} variant="subtitle2" fontWeight="bold">STEPS</Typography>
              <Typography>{job.steps.filter(s => s.completed).length}/{job.steps.length} Completed</Typography>
            </Grid>

            {/* RIGHT CONTENT */}
            <Grid item xs={12} md={9}>
              <Tabs value={tabIndex} onChange={(_, val) => setTabIndex(val)} sx={{ mb: 2 }}>
                <Tab label="Fault Summary" />
                <Tab label="Report Activity" />
              </Tabs>

              {tabIndex === 0 && (
                <Box>
                  <Typography variant="h6" fontWeight="bold">{job.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{job.description}</Typography>

                  <Grid container spacing={2} mt={1}>
                    <Grid item xs={6}>
                      <Typography fontWeight="bold">Customer Details</Typography>
                      <Typography>🏢 {job.customer.name}</Typography>
                      <Typography>📞 {job.customer.phone}</Typography>
                      <Typography>📧 {job.customer.email}</Typography>
                      <Typography>📍 {job.customer.address}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography fontWeight="bold">Field Engineer Details</Typography>
                      <Typography>👤 {job.technician.name}</Typography>
                      <Typography>📞 {job.technician.phone}</Typography>
                      <Typography>📧 {job.technician.email}</Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography fontWeight="bold">Project Manager</Typography>
                      <Avatar src={job.projectManager.avatar} />
                    </Grid>
                    <Grid item xs={6}>
                      <Typography fontWeight="bold">Field Engineer</Typography>
                      <Avatar src={job.technician.avatar} />
                    </Grid>
                  </Grid>

                  <Typography mt={2} fontWeight="bold">Steps:</Typography>
                  <ul>
                    {job.steps.map((step, i) => (
                      <li key={i}>
                        <input type="checkbox" checked={step.completed} readOnly /> {step.label}
                      </li>
                    ))}
                  </ul>

                  <Grid container spacing={2} mt={1}>
                    <Grid item xs={6}>
                      <Typography fontWeight="bold">Photo 1</Typography>
                      <img src={job.photo1 || '/placeholder.png'} alt="Photo 1" style={{ width: '100%', borderRadius: 8 }} />
                    </Grid>
                    <Grid item xs={6}>
                      <Typography fontWeight="bold">Photo 2</Typography>
                      <img src={job.photo2 || '/placeholder.png'} alt="Photo 2" style={{ width: '100%', borderRadius: 8 }} />
                    </Grid>
                  </Grid>

                  <Typography mt={2} fontWeight="bold">Task Notes</Typography>
                  <Typography>{job.notes || 'No additional notes provided.'}</Typography>
                </Box>
              )}

              {tabIndex === 1 && (
                <Box>
                  <Typography variant="h6">Activity Report</Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    History logs, timestamps, and comments will be listed here.
                  </Typography>
                </Box>
              )}

              {attachment && (
                <Box mt={2}>
                  <Typography variant="subtitle2">Attached File:</Typography>
                  <Typography variant="body2">{attachment.name}</Typography>
                </Box>
              )}
            </Grid>
          </Grid>
        </DialogContent>
      </Box>
    </Dialog>
  );
};

export default JobDetailModal;
