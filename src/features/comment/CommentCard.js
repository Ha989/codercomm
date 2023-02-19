import React from "react";
import { Avatar, Box, IconButton, Menu, Paper, Stack, Typography, Button } from "@mui/material";
import { fDate } from "../../utils/formatTime";
import CommentReaction from "./CommentReaction";
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from "react-redux";
import { deleteComment } from "./commentSlice";


function CommentCard({ comment }) {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteComment = () => {
    console.log("comment:", comment);
    dispatch(deleteComment({ commentId: comment._id, postId: comment.post}));
  }

  const renderMenu = (
    <Menu
    anchorEl={anchorEl}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    keepMounted
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    open={isMenuOpen}
    onClose={handleMenuClose}
  > 
    <Stack width={200} textAlign="center">
      <Typography variant="h8" p={1}>
        Do you want to delete this comment?
      </Typography>
      <Stack direction="row" justifyContent="space-between">
        <Button onClick={handleDeleteComment}>
          Yes
        </Button>
        <Button onClick={handleMenuClose}>
          Cancel
        </Button>
      </Stack>
    </Stack>
  </Menu>
  )
  return (
    <Stack direction="row" spacing={2}>
    <Avatar alt={comment.author?.name} src={comment.author?.avatarUrl} />
      <Paper sx={{ p: 1.5, flexGrow: 1 , bgcolor: "rgba(16, 15, 15, 0.1)"  }}>
        <Stack
          direction="row"
          alignItems={{ sm: "center" }}
          justifyContent="space-between"
          sx={{ mb: 0.5 }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {comment.author?.name}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.disabled" }}>
            {fDate(comment.createdAt)}
          </Typography>
        </Stack>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {comment.content}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <CommentReaction comment={comment} />
          <IconButton onClick={handleProfileMenuOpen}>
            <DeleteIcon 
            />
          </IconButton>
          {renderMenu}
      </Box>
      </Paper>
    </Stack>
  );
}

export default CommentCard;