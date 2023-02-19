import React, { useCallback } from 'react';
import { FormProvider, FTextField, FUploadImage } from '../../components/form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { alpha, Box, Stack, Button, Card} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { editPost } from './postSlice';
import { useDispatch, useSelector } from 'react-redux';



const yupSchema = Yup.object().shape({
    content: Yup.string().required("Content is required"),
  });
  


function EditPostForm({ postId, handleCloseEdit, handleMenuClose }) {
    
    const dispatch = useDispatch();
    const {isLoading} = useSelector((state) => state.post);

    const defaultValues = {
      content: "",
      image: "",
    } 

    const methods = useForm({
        resolver: yupResolver(yupSchema),
        defaultValues,
      });
      const {
        handleSubmit,
        reset,
        setValue,
        formState: { isSubmitting },
      } = methods;
  
      const onSubmit = (data) => {
        dispatch(editPost({ postId: postId, ...data })).then(() => reset());
        handleCloseEdit();
        handleMenuClose();
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
            placeholder="Edit content"
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
            <Button variant="outlined" size="small" onClick={handleCloseEdit}>
              Cancel
            </Button>
          </Box>
        </Stack>
        </FormProvider>
        </Card>
      </>
  )
}

export default EditPostForm