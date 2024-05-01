import React from 'react';
import { List, ListItem, ListItemText, Divider, Typography, Box } from '@mui/material';

function CompletedTaskList({ tasks }) {
  return (
    <div>
      {tasks.length === 0 ? (
        <Box textAlign="center" pt={3} color="text.disabled">
          <Typography variant="subtitle1">No Assignments</Typography>
        </Box>
      ) : (
        <List>
          {tasks.map((task, index) => (
            <div key={index}>
              <ListItem>
                <ListItemText
                  primary={task.name}
                  secondary={`Completed on: ${new Date(task.completedDate).toLocaleDateString()}`}
                  style={{ textDecoration: 'line-through', color: '#888' }}
                />
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      )}
    </div>
  );
}

export default CompletedTaskList;
