import React from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Divider } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';

function TaskList({ tasks, deleteTask, completeTask, editTask }) {
  const variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <List>
      {tasks.map((task, index) => (
        <motion.div key={index} initial="hidden" animate="visible" variants={variants}>
          <ListItem>
            <ListItemText primary={task.name} secondary={task.description} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="edit" onClick={() => editTask(index)}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => deleteTask(index)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          {index < tasks.length - 1 && <Divider />}
        </motion.div>
      ))}
    </List>
  );
}

export default TaskList;
