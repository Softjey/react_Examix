import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, MenuItem, StackProps, TextField } from '@mui/material';
import { TestsFilters as ITestsFilters } from '../../services/Api/types/tests';
import SubjectSelect from '../UI/SubjectSelect';
import useDebouncedCallback from '../../hooks/useDebouncedCallback';
import Subject from '../../types/api/enums/Subject';

export type SubjectSelectValue = Subject | 'all';
export type TestsFiltersValues = Pick<ITestsFilters, 'search' | 'subjects'>;
export type TestsFiltersDefaultValues = Pick<TestsFiltersValues, 'search'> & {
  subject?: SubjectSelectValue;
};

export interface Props extends StackProps<'form'> {
  onFiltersChange?: (filters: TestsFiltersValues) => void;
  debounceTime?: number;
  defaultValues?: TestsFiltersDefaultValues;
}

const TestsFilters: React.FC<Props> = (props) => {
  const { onFiltersChange, debounceTime, defaultValues, ...rest } = props;
  const [search, setSearch] = useState<string>(defaultValues?.search ?? '');
  const [subjects, setSubjects] = useState<Subject[] | undefined>(undefined);

  const debouncedSearchChange = useDebouncedCallback((searchValue: string) => {
    onFiltersChange?.({ search: searchValue, subjects });
  }, debounceTime ?? 300);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setSearch(value);
    debouncedSearchChange(value);
  };

  const reactFiltersUpdate = () => {
    onFiltersChange?.({ search, subjects });
  };

  const handleSubjectChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const value = event.target.value as SubjectSelectValue;
    const newSubjects = value === 'all' ? undefined : [value];

    setSubjects(newSubjects);
    onFiltersChange?.({ search, subjects: newSubjects });
  };

  return (
    <Box
      display="grid"
      gridTemplateColumns={{ sm: '1fr', md: '9fr 3fr' }}
      gap={3}
      paddingInline={1}
      component="form"
      {...rest}
    >
      <TextField
        label="Search..."
        value={search}
        onChange={handleSearchChange}
        InputProps={{
          endAdornment: (
            <Button onClick={reactFiltersUpdate} color="inherit">
              <SearchIcon opacity={0.85} />
            </Button>
          ),
        }}
        autoComplete="off"
      />

      <SubjectSelect
        maxHeight={500}
        value={defaultValues?.subject ?? 'all'}
        otherMenuItems={<MenuItem value="all">All</MenuItem>}
        onChange={handleSubjectChange}
      />
    </Box>
  );
};

export default TestsFilters;
