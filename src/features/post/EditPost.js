import React, { useState } from "react";
import { Button,IconButton, Typography, Box, Modal, Stack} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditPostForm from "./EditPostForm";



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  bgcolor: 'background.paper',
  borderRadius: 1,
  p: 2,
};

function EditPost({ postId, handleDelete }) {

  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

 
  const handleDeleteOpen = () => {
    setOpenDelete(true);
  };

  const handleDeleteClose = () => {
    setOpenDelete(false);
  };
 
  const handleEditClose = () => {
    setOpenEdit(false);
  };

  const handleEditOpen = () => {
    setOpenEdit(true);
  };

  return (
    <>
    <Box display="flex" flexDirection="row" >
      <IconButton onClick={handleEditOpen}>
        <EditIcon fontSize="small"/>
      </IconButton>
      <Modal
            open={openEdit}
            onClose={handleEditClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style} width={{ xs: 300, md: 600 }} textAlign="center">
             <EditPostForm postId={postId} />
            </Box>
        </Modal>
      <IconButton onClick={handleDeleteOpen}>
        <DeleteIcon fontSize="small"/>
      </IconButton>
         <Modal
            open={openDelete}
            onClose={handleDeleteClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style} width={300} textAlign="center">
            <Typography variant="h6">
              Do you want to delete this post?
            </Typography>
                <Stack direction="row" justifyContent="space-between"> 
                  <Button
                    autoFocus
                    variant="outlined"
                    fontSize="small"
                    onClick={handleDelete}
                  >
                    Yes
                  </Button>
                  <Button
                    autoFocus
                    variant="outlined"
                    fontSize="small"
                    onClick={handleDeleteClose}
                  >
                    Cancel
                  </Button>
                </Stack>
             </Box>
        </Modal>
      </Box>
    </>
  );
}

export default EditPost;