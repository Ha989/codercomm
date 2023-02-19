import React, { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Divider, Modal, Stack } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteConfirm from "../../components/DeleteConfirm";
import EditPostForm from "./EditPostForm";

const style = {
    alignItems:"center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "#FFFF",
    borderRadius: 1,
    p: 3,
  };


function EditPost({ postId, handleDelete }) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const [editOpen, setEditOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleCloseEdit = () => {
      setEditOpen(false);
  };
  const handleOpenEdit = () => {
      setEditOpen(true);
  };
  const handleDeleteOpen = () => {
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false)
  }
 
  
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    > 
      
      <MenuItem sx={{ mx: 1 }}>
        <Box
          variant="contained"
          style={{ flexGrow: 1, display: "flex", justifyContent: "center" }}
          onClick={handleOpenEdit}
        >
          Edit post
        </Box>
        <Modal
          open={editOpen}
          onClose={handleCloseEdit}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Stack spacing={2} >
              <EditPostForm
                handleCloseEdit={handleCloseEdit}
                postId={postId}
                handleMenuClose={handleMenuClose}
              />
            </Stack>
          </Box>
        </Modal>
      </MenuItem>
      <Divider sx={{ borderStyle: "dashed" }} />
      <MenuItem sx={{ mx: 1 }}>
        <Box
          variant="contained"
          style={{ flexGrow: 1, display: "flex", justifyContent: "center" }}
          onClick={handleDeleteOpen}
        >
          Delete post
        </Box>
        <Modal
          open={openDelete}
          onClose={handleCloseDelete}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
        <DeleteConfirm props={{ handleCloseDelete, handleDelete }}/>
        </Modal>
      </MenuItem>
      
    </Menu>
  );

  return (
    <Box>
      <IconButton onClick={handleProfileMenuOpen}>
        <MoreVertIcon />
      </IconButton>
      {renderMenu}
    </Box>
  );
}

export default EditPost;