import React from 'react';
import { BoxProps } from '@mui/material';
import { UseFormSetValue, FieldValues } from 'react-hook-form';
import { useCreateTest } from '../../pages/CreateTestPage/CreateTestContext';
import useCreateTestForm from '../../hooks/useCreateTestForm';
import ImageLinkUploader from '../UI/inputs/ImageLinkUploader';

interface Props extends BoxProps {}

const CreateTestFormImageLinkUploader: React.FC<Props> = (props) => {
  const { register, watch, setValue } = useCreateTestForm();

  const { loading: disabled } = useCreateTest();

  const testImageLink = watch('testImageLink');

  return (
    <ImageLinkUploader
      disabled={disabled}
      testImageLink={testImageLink}
      registerReturn={register('testImageLink')}
      setValue={setValue as unknown as UseFormSetValue<FieldValues>}
      {...props}
    />
  );
};

export default CreateTestFormImageLinkUploader;
