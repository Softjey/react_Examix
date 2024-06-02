import { Box, BoxProps } from '@mui/material';
import { FieldArrayWithId, UseFieldArrayRemove } from 'react-hook-form';
import QuestionType from '../../../types/api/enums/Type';
import { CreateTestForm } from '../interfaces';
import AnswerItem from './AnswerItem';

interface Props extends BoxProps {
  questionType: QuestionType;
  questionIndex: number;
  fields: FieldArrayWithId<CreateTestForm, `questions.${number}.answers`, 'id'>[];
  remove: UseFieldArrayRemove;
}

const AnswersGroup: React.FC<Props> = ({
  fields,
  questionType,
  questionIndex,
  remove,
  ...boxProps
}) => {
  /*  const [answers, setAnswers] =
    useState<FieldArrayWithId<CreateTestForm, `questions.${number}.answers`, 'id'>[]>(fields);

  useEffect(() => {
    if (questionType === QuestionType.SINGLE_CHOICE) {
      // устанавливаем всем кроме нажатого false
    }
  }, [questionType]); */

  // const updateCorrect = (index: number) => {
  //   if (questionType === QuestionType.SINGLE_CHOICE) {
  //     // устанавливаем всем кроме нажатого false
  //     setAnswers((prev) => {
  //       return prev.map((item, i) => {
  //         console.log(item);
  //         if (i === index) {
  //           return {
  //             ...item,
  //             isCorrect: true,
  //           };
  //         }
  //         return {
  //           ...item,
  //           isCorrect: false,
  //         };
  //       });
  //     });
  //   }
  // };

  return (
    <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2} {...boxProps}>
      {fields.map((item, index) => (
        /* <Checkbox
          key={item.id}
          {...register(`questions.${questionIndex}.answers.${index}.isCorrect`)}
          checked={watch(`questions.${questionIndex}.answers.${index}.isCorrect`)}
          onChange={(e) =>
            setValue(`questions.${questionIndex}.answers.${index}.isCorrect`, e.target.checked)
          }
        /> */

        <AnswerItem
          onDelete={() => remove(index)}
          answerIndex={index}
          questionIndex={questionIndex}
          key={item.id}
          type={questionType}
        />
      ))}
    </Box>
  );
};

export default AnswersGroup;
