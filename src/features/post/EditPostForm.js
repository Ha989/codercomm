import React, { useCallback, useState } from 'react';
import { FormProvider, FTextField, FUploadImage } from '../../components/form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { alpha, Box, Stack, Card, FormHelperText, IconButton} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { LoadingButton } from '@mui/lab';
import { editPost } from './postSlice';
import { useDispatch, useSelector } from 'react-redux';





const yupSchema = Yup.object().shape({
    content: Yup.string().required("Content is required"),
  });
  
  

function EditPostForm({ postId }) {
    
    const dispatch = useDispatch();
    const {isLoading} = useSelector((state) => state.post);
    const content = useSelector((state) => state.post.postsById[postId].content);
    const image = useSelector((state) => state.post.postsById[postId].image);
    const [img, setImg] = useState(image);
    
    const defaultValues = {
      content: content,
      image: image
    }
  
    const methods = useForm({
        resolver: yupResolver(yupSchema),
        defaultValues
      });
      const {
        handleSubmit,
        setValue,
        formState: { isSubmitting },
      } = methods;
  
      const onSubmit = (data) => {
        dispatch(editPost({ postId: postId, ...data }));
      };
      
      const handleDrop = useCallback(
        (acceptedFiles) => {
          const file = acceptedFiles[0];
    
          if (file) {
            setValue(
              "image",
              Object.assign(file, {
                preview: URL.createObjectURL(file),
              })
            );
          }
        },
        [setValue]
      );

      const handleRemove = () => {
        setImg("")
        dispatch(editPost({ postId: postId, content, ...img}));
      }


  return (
    <>
        <Card sx={{ p: 3}}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}
            >
            <FTextField
            name="content"
            multiline
            fullWidth
            rows={4}
            placeholder={content}
            sx={{
              "& fieldset": {
                borderWidth: `1px !important`,
                borderColor: alpha("#919EAB", 0.32),
              },
            }}
            />
             <Box >
              <IconButton 
                onClick={handleRemove} 
                position="absoblute"
                sx={{ ml: 20, mb: -10, zIndex: 99 }}>
                <ClearIcon />
              </IconButton>
             <FUploadImage
            name="image"
            accept="image/*"
            maxSize={3145728}
            onDrop={handleDrop}
            helperText={
                <FormHelperText sx={{ px: 2 }}>
                  Drop or select image to change
                </FormHelperText>
            }
          /> 
          </Box>
 
            <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <LoadingButton
              type="submit"
              variant="outlined"
              size="small"
              loading={isSubmitting || isLoading}
            >
              Save Changes
            </LoadingButton>
          </Box>
        </Stack>
        </FormProvider>
        </Card>
      </>
  )
}

export default EditPostForm