import { Paper, PaperProps } from '@mui/material';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

export type FormObject<T extends string = string> = Record<T, FormDataEntryValue>;

export interface Props extends PaperProps<'form'> {
  onFiltersSubmit?: (formObject: FormObject, formData: FormData) => void;
}

const Filters: React.FC<Props> = ({ children, onSubmit, onFiltersSubmit, ...rest }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formObject: FormObject = {};
    const newSearchParams = new URLSearchParams(searchParams);
    const formData = new FormData(event.target as HTMLFormElement);

    formData.forEach((value, key) => {
      if (value) {
        formObject[key] = value;
        newSearchParams.set(key, value.toString());
      }

      if (value === '') {
        newSearchParams.delete(key);
      }
    });

    setSearchParams(newSearchParams);
    onFiltersSubmit?.(formObject, formData);
    onSubmit?.(event);
  };

  return (
    <Paper component="form" onSubmit={handleSubmit} {...rest}>
      {children}
    </Paper>
  );
};

export default Filters;
