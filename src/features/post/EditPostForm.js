import React, { useCallback} from 'react';
import { FormProvider, FTextField, FUploadImage } from '../../components/form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { alpha, Box, Stack, Card, FormHelperText } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { editPost } from './postSlice';
import { useDispatch, useSelector } from 'react-redux';





const yupSchema = Yup.object().shape({
    content: Yup.string().required("Content is required"),
  });
  


function EditPostForm({ postId }) {
    
    const dispatch = useDispatch();
    const {isLoading} = useSelector((state) => state.post);
    const post = useSelector((state) => state.post.postsById[postId]);
   
    const defaultValues = {
      content: post.content || "",
      image: post.image || "",
    };


    const methods = useForm({
        resolver: yupResolver(yupSchema),
        defaultValues,
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
            placeholder={post.content}
            sx={{
              "& fieldset": {
                borderWidth: `1px !important`,
                borderColor: alpha("#919EAB", 0.32),
              },
            }}
            />

             <FUploadImage
            name="image"
            accept="image/*"
            maxSize={3145728}
            onDrop={handleDrop}
            helperText={
                <FormHelperText info sx={{ px: 2 }}>
                  Drop or select image to change
                </FormHelperText>
            }
          /> 
 
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