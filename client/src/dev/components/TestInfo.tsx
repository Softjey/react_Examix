import { useState } from 'react';
import { Box } from '@mui/material';
import Subject from '../../types/api/Subject';
import { Nullable } from '../../types/utils/Nullable';
import SubjectSelect from './SubjectSelect';
import TestNameInput from './TestNameInput';
import TestDescriptionInput from './TestDescriptionInput';

interface Props {}

const TestInfo: React.FC<Props> = () => {
  const [selectedSubject, setSelectedSubject] = useState<Nullable<Subject>>(null);
  const [testName, setTestName] = useState('');
  const [testDescription, setTestDescription] = useState('');

  const onSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSelectedSubject(value !== '' ? (value as Subject) : null);
  };

  return (
    <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap="12px" sx={{ width: '100%' }}>
      <TestNameInput
        testName={testName}
        onChange={(e) => setTestName(e.target.value)}
        sx={{ gridColumn: 'span 8' }}
      />
      <SubjectSelect
        selectedSubject={selectedSubject}
        onChange={onSubjectChange}
        sx={{ gridColumn: 'span 4' }}
      />
      <TestDescriptionInput
        testDescription={testDescription}
        onChange={(e) => setTestDescription(e.target.value)}
        sx={{ gridColumn: 'span 9' }}
      />
    </Box>
  );
};

export default TestInfo;
