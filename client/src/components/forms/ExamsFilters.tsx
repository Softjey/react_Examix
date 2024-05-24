import { Button, Paper, PaperProps, SxProps, TextField, Theme, Typography } from '@mui/material';
import React from 'react';
import { Dayjs } from 'dayjs';
import { useForm } from 'react-hook-form';
import { Test } from '../../types/api/test';
import TestsAutocomplete from '../UI/TestsAutocomplete/TestsAutocomplete';
import DatePicker from '../UI/DatePicker';

export interface ExamsFiltersForm {
  search: string;
  test: Test | null;
  dateFrom: Dayjs | null;
  dateTo: Dayjs | null;
}

interface Props extends PaperProps<'form'> {
  onFiltersUpdate?: (filters: ExamsFiltersForm) => void;
}

const defaultValues: ExamsFiltersForm = {
  search: '',
  test: null,
  dateFrom: null,
  dateTo: null,
};

const formSx: SxProps<Theme> = {
  p: '32px',
  pt: '16px',
  display: 'grid',
  gap: 1,
  gridTemplateColumns: 'repeat(6, 1fr)',
};

const ExamsFilters: React.FC<Props> = ({ sx, onFiltersUpdate, ...rest }) => {
  const { register, handleSubmit, control, watch, reset } = useForm<ExamsFiltersForm>({
    defaultValues,
  });
  const dateFrom = watch('dateFrom');
  const dateTo = watch('dateTo');

  const onSubmit = (form: ExamsFiltersForm) => {
    onFiltersUpdate?.(form);
  };

  const resetForm = () => {
    reset();
    onFiltersUpdate?.(defaultValues);
  };

  return (
    <Paper component="form" onSubmit={handleSubmit(onSubmit)} sx={{ ...formSx, ...sx }} {...rest}>
      <Typography sx={{ gridColumn: '1 / -1' }} variant="h6">
        Filters:
      </Typography>

      <TextField
        {...register('search')}
        sx={{ gridColumn: 'span 4' }}
        autoComplete="off"
        component="search"
        label="Tests names, students names, etc."
      />

      <DatePicker
        name="dateFrom"
        control={control}
        sx={{ gridColumn: 'span 2' }}
        maxDate={dateTo ?? undefined}
        label="Date from"
        disableFuture
      />

      <TestsAutocomplete label="Test" name="test" sx={{ gridColumn: 'span 4' }} control={control} />

      <DatePicker
        name="dateTo"
        control={control}
        sx={{ gridColumn: 'span 2' }}
        minDate={dateFrom ?? undefined}
        label="Date to"
        disableFuture
      />

      <Button type="button" onClick={resetForm} variant="outlined" sx={{ gridColumn: 'span 1' }}>
        Reset
      </Button>

      <Button type="submit" variant="contained" sx={{ gridColumn: '6' }}>
        Filter
      </Button>
    </Paper>
  );
};

export default ExamsFilters;
