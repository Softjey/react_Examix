/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { UseFormRegister, Control, useFieldArray } from 'react-hook-form';
import { TestForm } from './interfaces';

interface AnswerProps {
  control: Control<TestForm>;
  register: UseFormRegister<TestForm>;
  questionIndex: number;
}

const AnswerField: React.FC<AnswerProps> = ({ control, register, questionIndex }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${questionIndex}.answers` as const,
  });

  return (
    <div>
      {fields.map((field, index) => (
        <div key={field.id}>
          <label>Answer Title</label>
          <input {...register(`questions.${questionIndex}.answers.${index}.title` as const)} />

          <label>Is Correct</label>
          <input
            type="checkbox"
            {...register(`questions.${questionIndex}.answers.${index}.isCorrect` as const)}
          />

          <button type="button" onClick={() => remove(index)}>
            Remove Answer
          </button>
        </div>
      ))}
      <button type="button" onClick={() => append({ title: '', isCorrect: false })}>
        Add Answer
      </button>
    </div>
  );
};

export default AnswerField;
