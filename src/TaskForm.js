import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import { motion } from 'framer-motion';

function TaskForm({ addTask }) {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskName.trim() || !taskDescription.trim()) return;
    addTask({ name: taskName, description: taskDescription });
    setTaskName('');
    setTaskDescription('');
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Task Name"
            variant="outlined"
            fullWidth
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Task Description"
            variant="outlined"
            fullWidth
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Add Task
          </Button>
        </Grid>
      </Grid>
    </motion.form>
  );
}

export default TaskForm;
