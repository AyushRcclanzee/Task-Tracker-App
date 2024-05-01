import React, { useState } from 'react';
import { Typography, TextField, Button } from '@mui/material';
import './Settings.css';

function Settings() {
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');

  const handleBackgroundColorChange = (e) => {
    setBackgroundColor(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    document.body.style.backgroundColor = backgroundColor;
  };

  return (
    <div className="settings-container">
      <Typography variant="h5" gutterBottom>
        Settings
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Background Color"
          variant="outlined"
          value={backgroundColor}
          onChange={handleBackgroundColorChange}
          style={{ marginRight: '10px' }}
        />
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
      </form>
    </div>
  );
}

export default Settings;
