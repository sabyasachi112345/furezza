import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Tabs,
  Tab,
  Typography,
  TextField,
  Grid,
  Divider,
  IconButton,
} from "@mui/material";
import { X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const integrationTabs = ["OSS", "BSS", "ERP", "GIS"];

const ApiIntegrationModal: React.FC<Props> = ({ open, onClose }) => {
  const [tabIndex, setTabIndex] = useState(0);

  const renderFormFields = (label: string) => (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField fullWidth label={`${label} API URL`} />
      </Grid>
      <Grid item xs={12}>
        <TextField fullWidth label={`${label} API Key`} />
      </Grid>
      <Grid item xs={12}>
        <TextField fullWidth label={`${label} Token`} />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary">Save Configuration</Button>
      </Grid>
    </Grid>
  );

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        API Integrations (OSS / BSS / ERP / GIS)
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <X />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent>
        <Tabs
          value={tabIndex}
          onChange={(_, newIndex) => setTabIndex(newIndex)}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
        >
          {integrationTabs.map((label) => (
            <Tab key={label} label={label} />
          ))}
        </Tabs>

        <Box mt={3}>
          <Typography variant="h6">{integrationTabs[tabIndex]} Configuration</Typography>
          <Box mt={2}>{renderFormFields(integrationTabs[tabIndex])}</Box>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="secondary">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ApiIntegrationModal;
