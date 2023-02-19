import { Box, Button,Typography } from '@mui/material';
import React from 'react';

const style = {
    alignItems:"center",
    position: "absolute",
    top: "60%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "30vw",
    bgcolor: "#ffff",
    borderRadius: 1,
    p: 2,
  };


function DeletePostConfirm({ handleDeleteConfirm, handleCloseDelete }, ref ) {
   
  return (
        <Box sx={{ ...style, width: 300}}>
          <Typography variant="h6">
            Do you want to delete this post?
          </Typography>
          <Box display="flex" justifyContent="space-between">
          <Button variant='outlined' onClick={handleDeleteConfirm}>Yes</Button >
          <Button variant='outlined' onClick={handleCloseDelete}>Cancel</Button >
          </Box>
        </Box>
  )
}

export default DeletePostConfirm;