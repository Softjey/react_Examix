import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router';
import { useRef, useState } from 'react';
import {
  CreateTestFormType,
  CreateTestSchema,
  QuestionFromServer,
} from './schemas/createTestFormValidationSchemas';
import defaultValues from '../../pages/CreateTestPage/defaultValues';
import getDefaultQuestion from '../../pages/CreateTestPage/utils/getDefaultQuestion';
import getFilteredQuestions from '../../pages/CreateTestPage/utils/getFilteredQuestions';
import getPreparedTestQuestions from '../../pages/CreateTestPage/utils/getPreparedTestQuestions';
import { CreateTestDto } from '../../services/Api/types/create-test';
import { Question } from '../../types/api/entities/question';
import Subject from '../../types/api/enums/Subject';
import { AvailableQuestionType } from '../../types/api/enums/Type';
import { useCreateTest } from '../../pages/CreateTestPage/CreateTestContext';
import Routes from '../../services/Router/Routes';
import useQuestions from '../../hooks/queries/useQuestions';
import { Nullable } from '../../types/utils/Nullable';

const useCreateTestPage = () => {
  const navigate = useNavigate();

  const { reset, loading, createQuestionsMutation, createTestMutation, error } = useCreateTest();
  const { createQuestions } = createQuestionsMutation;
  const { createTest } = createTestMutation;

  const [search, setSearch] = useState<string>('');
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  const [warningMessage, setWarningMessage] = useState<Nullable<string>>(null);

  const { questions, isLoading: isQuestionsAutocompleteLoading } = useQuestions({
    search: search || undefined,
    limit: 20,
  });

  const methods = useForm<CreateTestFormType>({
    resolver: zodResolver(CreateTestSchema),
    defaultValues,
    mode: 'onBlur',
  });

  const shouldScroll = useRef<boolean>(false);

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: 'questions',
  });

  const addQuestionCard = () => {
    append(getDefaultQuestion(), { shouldFocus: false });
    shouldScroll.current = true;
  };

  const addQuestionCardFromServer = ({ type, ...question }: Question) => {
    const { maxScore, timeLimit } = getDefaultQuestion();

    const formQuestions = methods.watch('questions') as QuestionFromServer[];
    const isDuplicate = formQuestions.some((formQuestion) => formQuestion.id === question.id);

    if (isDuplicate) {
      setWarningMessage('This question has already been added');
      return;
    }

    append(
      {
        ...question,
        type: type as AvailableQuestionType,
        isFromServer: true,
        maxScore,
        timeLimit,
      },
      { shouldFocus: false },
    );

    shouldScroll.current = true;
  };

  const onSubmit = methods.handleSubmit((data) => {
    const filteredQuestions = getFilteredQuestions(data);
    const questionsFromServer = data.questions.filter((question) => question.isFromServer);

    createQuestions(filteredQuestions, {
      onSuccess: (createQuestionsResponse) => {
        const testData: CreateTestDto = {
          name: data.testName,
          description: data.testDescription,
          image: data.testImageLink,
          questions: getPreparedTestQuestions(
            createQuestionsResponse.questions,
            questionsFromServer as QuestionFromServer[],
            data.questions,
          ),
        };

        if (data.subject) {
          testData.subject = data.subject as Subject;
        }

        createTest(testData, {
          onSuccess: (test) => {
            navigate(`${Routes.TEST}/${test.id}`);
          },
        });
      },
    });
  });

  const handleQuestionsAutocompleteChange = (
    _: React.SyntheticEvent<Element, Event>,
    value: NonNullable<string | Question> | (string | Question)[] | null,
  ) => {
    addQuestionCardFromServer(value as Question);

    setSearch('');
    setIsModalOpened(false);
  };

  return {
    loading,
    isQuestionsAutocompleteLoading,
    methods,
    onSubmit,
    shouldScroll,
    fields,
    remove,
    addQuestionCard,
    isModalOpened,
    error,
    reset,
    warningMessage,
    handleWarningClose: () => setWarningMessage(null),
    questions,
    search,
    handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value),
    openQuestionsLibraryModal: () => setIsModalOpened(true),
    closeQuestionsLibraryModal: () => setIsModalOpened(false),
    handleQuestionsAutocompleteChange,
  };
};

export default useCreateTestPage;
