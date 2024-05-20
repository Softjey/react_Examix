import { Button } from '@mui/material';
import { TextField, Typography } from '@mui/material';
import React from 'react';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import Filters, { Props as FiltersProps, FormObject } from '../Filters';
import useExamsFilters from './useExamsFilters';
import FiltersField from './FiltersField';
import DateRange from '../DateRangePicker/DateRangeProvider';
import TestsAutocomplete from '../TestsAutocomplete/TestsAutocomplete';

interface Props extends FiltersProps {
  onFiltersSubmit?: (filters: FormObject<FiltersField>, formData: FormData) => void;
  dateFormat?: string;
}

const ExamsFilters: React.FC<Props> = ({ sx, dateFormat, ...rest }) => {
  const { initialValue, dateInitialValue } = useExamsFilters();
  const format = dateFormat ?? 'YYYY-MM-DD';
  const initialTestStr = initialValue(FiltersField.TEST_ID);
  const initialTestId = initialTestStr === '' ? undefined : +initialTestStr;

  return (
    <Filters sx={{ p: '32px', pt: '16px', ...sx }} {...rest}>
      <Typography variant="h5" sx={{ mb: '20px' }}>
        Filters:
      </Typography>

      <Grid container spacing={2}>
        <Grid xs={9}>
          <TextField
            defaultValue={initialValue(FiltersField.SEARCH)}
            label="Test names, students name, etc."
            name={FiltersField.SEARCH}
            component="search"
            autoComplete="off"
            fullWidth
          />
        </Grid>

        <DateRange format={format}>
          <Grid xs={3}>
            <DateRange.DateFromPicker
              initialValue={dateInitialValue(FiltersField.DATE_FROM)}
              name={FiltersField.DATE_FROM}
              label="Date from"
              disableFuture
            />
          </Grid>

          <Grid xs={9}>
            <TestsAutocomplete
              name={FiltersField.TEST_ID}
              initialTestId={Number.isNaN(initialTestId) ? undefined : initialTestId}
            />
          </Grid>
          <Grid xs={3}>
            <DateRange.DateToPicker
              initialValue={dateInitialValue(FiltersField.DATE_TO)}
              name={FiltersField.DATE_TO}
              label="Date to"
              disableFuture
            />
          </Grid>
        </DateRange>

        <Grid xs={12} sx={{ display: 'flex', flexDirection: 'row-reverse', gap: '20px' }}>
          <Button type="submit" variant="contained" sx={{ width: '100px' }}>
            Filter
          </Button>
        </Grid>
      </Grid>
    </Filters>
  );
};

export default ExamsFilters;
