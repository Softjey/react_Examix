import { useState, useEffect, SyntheticEvent } from 'react';
import useTestName from '../../../hooks/queries/useTestName';
import useTests from '../../../hooks/queries/useTests';
import { Test } from '../../../types/api/test';

export default function useTestsAutocomplete(initialTestId?: Test['id']) {
  const { testName, isSuccess } = useTestName(initialTestId);
  const [query, setQuery] = useState<string>('');
  const [testId, setTestId] = useState<Test['id'] | undefined>(initialTestId);
  const { tests, isPending, refetch } = useTests({ search: query, limit: 10 });

  useEffect(() => {
    if (isSuccess && testName) {
      setQuery(testName);
    }
  }, [isSuccess, testName]);

  useEffect(() => {
    refetch();
  }, [query, refetch]);

  const onChange = (
    _: SyntheticEvent<Element, Event>,
    test: NonNullable<string | Test> | (string | Test)[] | null,
  ) => {
    if (Array.isArray(test) || typeof test === 'string') {
      throw new Error('Test should be a single value and an object');
    }

    setTestId(test ? test.id : undefined);
  };

  const updateInput = (_: React.SyntheticEvent<Element, Event>, newQuery: string) => {
    setQuery(newQuery);
  };

  return { query, tests, isPending, testId, onChange, updateInput };
}
