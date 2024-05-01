import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import Settings from './Settings';
import CompletedTaskList from './CompletedTaskList';
import { Grid, Paper, Typography, AppBar, Toolbar, Container, CssBaseline, Tab, Tabs } from '@mui/material';
import { Settings as SettingsIcon, CheckCircle as CheckCircleIcon } from '@mui/icons-material';
import './App.css';
import './CompletedTaskList.css';

const styles = {
  mainContainer: {
    marginTop: '20px',
  },
  paper: {
    padding: '20px',
    minHeight: '80vh',
  },
  tab: {
    color: '#fff',
  },
  title: {
    flexGrow: 1,
    textAlign: 'left', // Aligning "Task Tracker" to the left
  },
  icon: {
    color: '#fff', // Icon color
  },
};

function TaskTrackerApp() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [value, setValue] = useState(0);
  const [editIndex, setEditIndex] = useState(null);
  const [editTaskData, setEditTaskData] = useState(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
    const storedCompletedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];
    setCompletedTasks(storedCompletedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
  }, [completedTasks]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const completeTask = (index) => {
    const taskToComplete = { ...tasks[index], completed: true, completedDate: Date.now() };
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    setCompletedTasks([...completedTasks, taskToComplete]);
  };

  const editTask = (index) => {
    setEditIndex(index);
    setEditTaskData(tasks[index]);
  };

  const saveEditedTask = (editedTask) => {
    const updatedTasks = [...tasks];
    updatedTasks[editIndex] = editedTask;
    setTasks(updatedTasks);
    setEditIndex(null);
    setEditTaskData(null);
  };

  return (
    <div>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={styles.title}>
            Task Tracker
          </Typography>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab
              label="Tasks"
              icon={<CheckCircleIcon sx={value === 0 ? styles.icon : {}} />}
              sx={value === 0 ? styles.tab : {}}
            />
            <Tab
              label="Completed Tasks"
              icon={<CheckCircleIcon sx={value === 1 ? styles.icon : {}} />}
              sx={value === 1 ? styles.tab : {}}
            />
            <Tab
              label="Settings"
              icon={<SettingsIcon sx={value === 2 ? styles.icon : {}} />}
              sx={value === 2 ? styles.tab : {}}
            />
          </Tabs>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" style={styles.mainContainer}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Paper style={styles.paper}>
              <Typography variant="h5" gutterBottom>
                {editIndex !== null ? 'Edit Task' : 'Add Task'}
              </Typography>
              <TaskForm addTask={addTask} editTaskData={editTaskData} saveEditedTask={saveEditedTask} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper style={styles.paper}>
              <Typography variant="h5" gutterBottom>
                {value === 0 ? 'Tasks' : value === 1 ? 'Completed Tasks' : 'Settings'}
              </Typography>
              {value === 0 && (
                <TaskList tasks={tasks} deleteTask={deleteTask} completeTask={completeTask} editTask={editTask} />
              )}
              {value === 1 && <CompletedTaskList tasks={completedTasks} />}
              {value === 2 && <Settings />}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default TaskTrackerApp;
