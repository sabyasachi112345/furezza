// import React, { useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import {
//   Box, Button, Typography, Grid, Chip, Paper, Divider, Avatar, Checkbox,
//   Tabs, Tab, IconButton, Tooltip, TextField
// } from '@mui/material';
// import {
//   AccessTime, Phone, Email, LocationOn, MoreVert, AttachFile, AddPhotoAlternate
// } from '@mui/icons-material';
// import type { Job, Technician } from '../../types';

// interface Props {
//   jobs: Job[];
//   technicians: Technician[];
// }

// const formatDate = (value?: string | null) =>
//   value ? new Date(value).toLocaleDateString('en-US', {
//     year: 'numeric', month: 'long', day: 'numeric'
//   }) : '—';

// const formatTime = (value?: string | null) =>
//   value ? new Date(value).toLocaleTimeString('en-US', {
//     hour: '2-digit', minute: '2-digit'
//   }) : '—';

// const JobDetailPage: React.FC<Props> = ({ jobs, technicians }) => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const job = jobs.find((j) => j.id === Number(id));

//   const [tab, setTab] = useState(0);
//   const [stepStatus, setStepStatus] = useState([true, false, false]);
//   const [notes, setNotes] = useState('');
//   const [attachments, setAttachments] = useState<File[]>([]);
//   const [images, setImages] = useState<(string | ArrayBuffer | null)[]>([]);

//   if (!job) return <Typography variant="h6" p={4}>Job not found.</Typography>;

//   const technician = technicians.find(t => t.id === job.technicianId);
//   const technicianName = technician ? `${technician.firstName} ${technician.lastName}` : `#${job.technicianId}`;

//   const priorityColor =
//     job.priority === 'HIGH' ? 'error' :
//     job.priority === 'MEDIUM' ? 'warning' : 'default';

//   const statusColor =
//     job.status === 'COMPLETED' ? 'success' :
//     job.status === 'IN_PROGRESS' ? 'primary' : 'default';

//   const handleStepToggle = (index: number) => {
//     setStepStatus(prev => prev.map((s, i) => i === index ? !s : s));
//   };

//   const handleAttachmentUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files) {
//       setAttachments([...attachments, ...Array.from(event.target.files)]);
//     }
//   };

//   const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files) {
//       Array.from(event.target.files).forEach(file => {
//         const reader = new FileReader();
//         reader.onloadend = () => setImages(prev => [...prev, reader.result]);
//         reader.readAsDataURL(file);
//       });
//     }
//   };

//   return (
//     <Box sx={{ width: '100vw', height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', bgcolor: '#f9fafb' }}>
//       <Box sx={{ px: 3, py: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: '#e3f2fd', boxShadow: 1 }}>
//         <Box display="flex" alignItems="center" gap={2}>
//           <Typography color="primary" fontWeight="bold">🔔 Fault Details</Typography>
//           <Chip label={`ID: ${job.id}`} color="info" size="small" />
//           <Chip label={`${job.priority} Priority`} color={priorityColor} size="small" />
//           <Chip label={job.status} color={statusColor} size="small" />
//         </Box>
//         <Button variant="contained" color="primary" onClick={() => navigate(-1)}>Go Back</Button>
//       </Box>

//       <Grid container spacing={0} sx={{ flexGrow: 1, height: '100%' }}>
//         <Grid item xs={12} md={3} sx={{ height: '100%', bgcolor: '#e8f0fe' }}>
//           <Paper sx={{ m: 2, p: 3, height: 'calc(100% - 32px)', borderRadius: 3, overflowY: 'auto' }}>
//             <Typography color="primary" fontWeight="bold" textAlign="center" mb={2}>🔄 30% Progress</Typography>
//             <Divider sx={{ mb: 2 }} />
//             <Typography fontWeight="bold">⏰ Time</Typography>
//             <Typography>{formatTime(job.scheduledStart)} - {formatTime(job.scheduledEnd)}</Typography>
//             <Typography fontWeight="bold" mt={2}>⏳ Duration</Typography>
//             <Typography>{job.estimatedDuration} Minutes</Typography>
//             <Typography fontWeight="bold" mt={2}>📅 Start Date</Typography>
//             <Typography>{formatDate(job.scheduledStart)}</Typography>
//             <Typography fontWeight="bold" mt={2}>📅 End Date</Typography>
//             <Typography>{formatDate(job.scheduledEnd)}</Typography>
//             <Typography fontWeight="bold" mt={2}>✅ Steps Completed</Typography>
//             <Typography>{stepStatus.filter(Boolean).length} / 3</Typography>
//           </Paper>
//         </Grid>

//         <Grid item xs={12} md={9} sx={{ height: '100%' }}>
//           <Paper sx={{ m: 2, p: 3, height: 'calc(100% - 32px)', borderRadius: 3, overflowY: 'auto' }}>
//             <Tabs value={tab} onChange={(e, v) => setTab(v)} textColor="primary" indicatorColor="primary">
//               <Tab label="Fault Summary" />
//               <Tab label="Working Time" />
//               <Tab label="View Activities" />
//               <Tab label="Report Activity" />
//             </Tabs>

//             <Box mt={3} display="flex" justifyContent="space-between" flexWrap="wrap">
//               <Typography fontWeight="bold" variant="h5">{job.title}</Typography>
//               <Box display="flex" gap={1}>
//                 <Tooltip title="Status"><Chip icon={<AccessTime />} label={job.status} color={statusColor} /></Tooltip>
//                 <Tooltip title="Upload Attachments">
//                   <IconButton component="label">
//                     <AttachFile />
//                     <input type="file" hidden multiple onChange={handleAttachmentUpload} />
//                   </IconButton>
//                 </Tooltip>
//               </Box>
//             </Box>

//             <Box mt={1}>
//               <Typography color="textSecondary">📃 {job.description}</Typography>
//               {attachments.length > 0 && (
//                 <Box mt={1}>
//                   <Typography fontWeight="bold">📎 Attachments:</Typography>
//                   <ul>
//                     {attachments.map((file, i) => <li key={i}>{file.name}</li>)}
//                   </ul>
//                 </Box>
//               )}
//             </Box>

//             <Grid container spacing={4} mt={3}>
//               <Grid item xs={12} sm={6}>
//                 <Typography variant="h6">👥 Customer Info</Typography>
//                 <Typography>🏢 {job.customerName}</Typography>
//                 <Typography><Phone fontSize="small" /> (303) 555-0105</Typography>
//                 <Typography><Email fontSize="small" /> henry@builderq.com</Typography>
//                 <Typography><LocationOn fontSize="small" /> {job.locationAddress}</Typography>
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <Typography variant="h6">👨‍🔧 Engineer Info</Typography>
//                 <Typography>👤 {technicianName}</Typography>
//                 <Typography><Phone fontSize="small" /> {technician?.phone ?? '(—)'}</Typography>
//                 <Typography><Email fontSize="small" /> henry@builderq.com</Typography>
//               </Grid>
//             </Grid>

//             <Box display="flex" alignItems="center" gap={5} mt={4}>
//               <Box textAlign="center">
//                 <Typography fontSize={14}>Project Manager</Typography>
//                 <Avatar src="https://randomuser.me/api/portraits/men/32.jpg" />
//               </Box>
//               <Box textAlign="center">
//                 <Typography fontSize={14}>Field Engineer</Typography>
//                 <Avatar src="https://randomuser.me/api/portraits/men/82.jpg" />
//               </Box>
//             </Box>

//             <Box mt={4}>
//               <Typography fontWeight="bold">🧾 Task Steps</Typography>
//               {['Take before pictures', 'Complete the work', 'Take after pictures'].map((step, i) => (
//                 <Box key={i} display="flex" alignItems="center">
//                   <Checkbox checked={stepStatus[i]} onChange={() => handleStepToggle(i)} />
//                   <Typography>{step}</Typography>
//                 </Box>
//               ))}
//             </Box>

//             <Grid container spacing={2} mt={3}>
//               {[1, 2].map(num => (
//                 <Grid item key={num} xs={6} sm={3} textAlign="center">
//                   <Typography mb={1}>📸 Photo {num}</Typography>
//                   <IconButton color="primary" component="label">
//                     <AddPhotoAlternate fontSize="large" />
//                     <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
//                   </IconButton>
//                 </Grid>
//               ))}
//             </Grid>

//             {images.length > 0 && (
//               <Box mt={2}>
//                 <Typography fontWeight="bold">🖼 Uploaded Images:</Typography>
//                 <Grid container spacing={2} mt={1}>
//                   {images.map((src, i) => (
//                     <Grid item key={i} xs={6} sm={3}>
//                       <img src={src as string} alt={`Upload ${i}`} style={{ width: '100%', borderRadius: 8 }} />
//                     </Grid>
//                   ))}
//                 </Grid>
//               </Box>
//             )}

//             <Box mt={3}>
//               <Typography fontWeight="bold">📝 Notes</Typography>
//               <TextField
//                 fullWidth
//                 multiline
//                 minRows={4}
//                 placeholder="Add notes about the task..."
//                 value={notes}
//                 onChange={(e) => setNotes(e.target.value)}
//               />
//             </Box>
//           </Paper>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default JobDetailPage;



import React, { useState, useEffect, useRef } from 'react';
import {
  Box, Typography, Chip, Checkbox, Paper, Grid, TextField, Button, Stack,
  Avatar, List, ListItem, ListItemIcon, ListItemText, LinearProgress, IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions, Tooltip, Tabs, Tab, Divider
} from '@mui/material';
import {
  AttachFile, LocationOn, Phone, Email, Person, Delete, Comment, Timer, Description, Checklist
} from '@mui/icons-material';
import { Job } from '../../types';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

type Props = {
  job: Job;
  userRole: 'manager' | 'technician';
};

const formatDate = (iso: string | null) =>
  iso ? new Date(iso).toLocaleDateString() : '—';
const formatTime = (iso: string | null) =>
  iso ? new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—';

const stepsList = ['Take before pictures', 'Complete the work', 'Take after pictures'];

const JobDetailPage: React.FC<Props> = ({ job, userRole }) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [checkedSteps, setCheckedSteps] = useState<boolean[]>([false, false, false]);
  const [activeTab, setActiveTab] = useState(0);
  const [comments, setComments] = useState<{ text: string; time: string }[]>([]);
  const [newComment, setNewComment] = useState('');
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [notesValue, setNotesValue] = useState(job.notes || '');
  const [openDialog, setOpenDialog] = useState(false);

  const completedSteps = checkedSteps.filter(Boolean).length;
  const progress = (completedSteps / stepsList.length) * 100;

  useEffect(() => {
    const saved = localStorage.getItem(`job-${job.id}`);
    if (saved) {
      const s = JSON.parse(saved);
      setCheckedSteps(s.checkedSteps);
      setNotesValue(s.notesValue);
      setElapsedTime(s.elapsedTime);
      setComments(s.comments || []);
    }
  }, [job.id]);

  useEffect(() => {
    localStorage.setItem(`job-${job.id}`, JSON.stringify({
      checkedSteps, notesValue, elapsedTime, comments
    }));
  }, [checkedSteps, notesValue, elapsedTime, comments, job.id]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerRunning) {
      interval = setInterval(() => setElapsedTime(s => s + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  const formatElapsed = (s: number) => {
    const h = String(Math.floor(s / 3600)).padStart(2, '0');
    const m = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
    const sec = String(s % 60).padStart(2, '0');
    return `${h}:${m}:${sec}`;
  };

  const handleStepChange = (i: number) =>
    setCheckedSteps(prev => {
      const updated = [...prev];
      updated[i] = !updated[i];
      return updated;
    });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachedFiles(prev => [...prev, ...Array.from(e.target.files)]);
    }
  };

  const removeFile = (i: number) =>
    setAttachedFiles(prev => prev.filter((_, index) => index !== i));

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    setComments(prev => [{ text: newComment.trim(), time: new Date().toLocaleString() }, ...prev]);
    setNewComment('');
  };

  const exportPdf = async () => {
    if (!panelRef.current) return;
    const canvas = await html2canvas(panelRef.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'pt', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`job-${job.id}-summary.pdf`);
  };

  return (
    <Box p={2}>
      <Paper elevation={3} sx={{ p: 2, mb: 3, backgroundColor: '#e8f5e9' }}>
        <Typography variant="h5" fontWeight="bold">
          Fault ID #{job.id} <Chip label={`${job.priority} (${job.status})`} color="success" size="small" />
        </Typography>
      </Paper>

      <Grid container spacing={2}>
        {/* Sidebar */}
        <Grid item xs={12} md={3}>
          <Paper elevation={1} sx={{ p: 2, height: '100%', background: '#e3f2fd' }}>
            <Typography color="primary" fontWeight="bold">{Math.round(progress)}% Complete</Typography>
            <LinearProgress variant="determinate" value={progress} sx={{ my: 1 }} />

            <Divider sx={{ my: 1 }} />

            <Typography variant="subtitle2">START–END</Typography>
            <Typography>{formatTime(job.scheduledStart)} – {formatTime(job.scheduledEnd)}</Typography>

            <Typography mt={1} variant="subtitle2">DURATION</Typography>
            <Typography>{job.estimatedDuration} Min</Typography>

            <Typography mt={1} variant="subtitle2">DATES</Typography>
            <Typography>Start: {formatDate(job.scheduledStart)}</Typography>
            <Typography>End: {formatDate(job.scheduledEnd)}</Typography>

            <Typography mt={2} variant="subtitle2">STEPS</Typography>
            <Typography>{completedSteps}/{stepsList.length} Completed</Typography>
          </Paper>
        </Grid>

        {/* Main Panel */}
        <Grid item xs={12} md={9}>
          <Paper elevation={2} sx={{ p: 3 }} ref={panelRef}>
            <Tabs value={activeTab} onChange={(e, newVal) => setActiveTab(newVal)} textColor="primary">
              <Tab icon={<Checklist />} label="Fault Summary" />
              <Tab icon={<Timer />} label="Working Time" />
              <Tab icon={<Description />} label="Activities" />
              <Tab icon={<Comment />} label="Report" />
            </Tabs>

            {/* Fault Summary Tab */}
            {activeTab === 0 && (
              <Box mt={2}>
                <Typography variant="h6">{job.title}</Typography>
                <Typography color="text.secondary">{job.description}</Typography>

                <Grid container spacing={2} mt={1}>
                  <Grid item xs={6}>
                    <Typography fontWeight="bold">Customer</Typography>
                    <Typography><Person fontSize="small" /> {job.customerName}</Typography>
                    <Typography><Phone fontSize="small" /> (303) 555-0105</Typography>
                    <Typography><Email fontSize="small" /> henry@builderq.com</Typography>
                    <Typography><LocationOn fontSize="small" /> {job.locationAddress}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography fontWeight="bold">Engineer</Typography>
                    <Typography><Person fontSize="small" /> {job.technicianFirstName} {job.technicianLastName}</Typography>
                    <Typography><Phone fontSize="small" /> (303) 555-0105</Typography>
                    <Typography><Email fontSize="small" /> henry@builderq.com</Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography fontWeight="bold">Steps</Typography>
                    {stepsList.map((s, i) => (
                      <Stack key={i} direction="row" alignItems="center">
                        <Checkbox
                          disabled={userRole !== 'manager'}
                          checked={checkedSteps[i]}
                          onChange={() => handleStepChange(i)}
                        />
                        <Typography>{s}</Typography>
                      </Stack>
                    ))}
                  </Grid>

                  <Grid item xs={12}>
                    <Typography fontWeight="bold">Notes</Typography>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      value={notesValue}
                      onChange={e => setNotesValue(e.target.value)}
                      disabled={userRole !== 'manager'}
                    />
                  </Grid>
                </Grid>
              </Box>
            )}

            {/* Working Time Tab */}
            {activeTab === 1 && (
              <Box mt={2}>
                <Typography>Elapsed Time: <strong>{formatElapsed(elapsedTime)}</strong></Typography>
                <Stack direction="row" spacing={2} mt={2}>
                  <Button variant="contained" onClick={() => setTimerRunning(true)} disabled={timerRunning}>Start</Button>
                  <Button variant="outlined" onClick={() => setTimerRunning(false)} disabled={!timerRunning}>Pause</Button>
                </Stack>
              </Box>
            )}

            {/* Activities Tab */}
            {activeTab === 2 && (
              <Box mt={2}>
                {comments.length === 0 ? <Typography>No activities yet.</Typography> :
                  <List dense>{comments.map((c, i) => (
                    <ListItem key={i}><ListItemText primary={c.text} secondary={c.time} /></ListItem>
                  ))}</List>
                }
              </Box>
            )}

            {/* Report Tab */}
            {activeTab === 3 && userRole === 'manager' && (
              <Box mt={2}>
                <TextField
                  multiline fullWidth rows={3}
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                />
                <Button
                  sx={{ mt: 1 }}
                  variant="contained"
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                >
                  Submit Comment
                </Button>
              </Box>
            )}

            {/* File Upload & Actions */}
            <Box mt={4}>
              <Button variant="outlined" component="label">
                Upload Files
                <input type="file" hidden multiple onChange={handleFileChange} />
              </Button>
              <List dense>
                {attachedFiles.map((file, i) => (
                  <ListItem key={i}
                    secondaryAction={
                      <IconButton onClick={() => removeFile(i)}><Delete /></IconButton>
                    }>
                    <ListItemIcon><AttachFile /></ListItemIcon>
                    <ListItemText primary={file.name} secondary={`${(file.size / 1024).toFixed(1)} KB`} />
                  </ListItem>
                ))}
              </List>
            </Box>

            {/* Footer Buttons */}
            <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
              <Tooltip title="Export to PDF"><Button variant="outlined" onClick={exportPdf}>PDF</Button></Tooltip>
              <Tooltip title="Submit Summary"><Button variant="contained" onClick={() => setOpenDialog(true)}>Submit</Button></Tooltip>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Job Summary</DialogTitle>
        <DialogContent dividers>
          <Typography><strong>ID:</strong> {job.id}</Typography>
          <Typography><strong>Title:</strong> {job.title}</Typography>
          <Typography><strong>Description:</strong> {job.description}</Typography>
          <Typography><strong>Start:</strong> {formatTime(job.scheduledStart)}</Typography>
          <Typography><strong>End:</strong> {formatTime(job.scheduledEnd)}</Typography>
          <Typography><strong>Elapsed:</strong> {formatElapsed(elapsedTime)}</Typography>
          <Typography><strong>Steps:</strong> {completedSteps}/{stepsList.length}</Typography>
          <Typography><strong>Notes:</strong> {notesValue || '—'}</Typography>
          {attachedFiles.length > 0 && (
            <>
              <Typography mt={2}><strong>Attachments:</strong></Typography>
              <ul>{attachedFiles.map((f, i) => <li key={i}>{f.name}</li>)}</ul>
            </>
          )}
          {comments.length > 0 && (
            <>
              <Typography mt={2}><strong>Comments:</strong></Typography>
              <ul>{comments.map((c, i) => <li key={i}>{c.time}: {c.text}</li>)}</ul>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default JobDetailPage;
