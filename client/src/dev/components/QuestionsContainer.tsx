// import { useState, useRef } from 'react';
// import { Alert, Box } from '@mui/material';
// import { Question } from '../../types/api/question';

// type FormQuestion = Pick<Question, 'type' | 'subject' | 'title' | 'answers'>;

// interface Props {
//   questions: FormQuestion[];
// }

// const ids = Array.from({ length: 8 }, (_, index) => index as number);

// const QuestionsContainer: React.FC<Props> = ({ questions: questions1 }) => {
//   // eslint-disable-next-line @typescript-eslint/no-redeclare
//   const [questions, setQuestions] = useState<FormQuestion[]>(questions1);

//   const draggingItem = useRef<number>(-1);
//   const dragOverItem = useRef<number | null>(-1);

//   const handleDragStart = (position: number) => {
//     draggingItem.current = position;
//   };

//   const handleDragEnter = (position: number) => {
//     dragOverItem.current = position;
//     const questionsCopy = [...questions];
//     const draggingItemContent = questionsCopy[draggingItem.current];

//     if (draggingItem.current) {
//       questionsCopy.splice(draggingItem.current, 1);
//     }
//     questionsCopy.splice(dragOverItem.current, 0, draggingItemContent);

//     draggingItem.current = dragOverItem.current;
//     dragOverItem.current = null;
//     setQuestions(questionsCopy);
//   };
//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'center',
//         alignItems: 'center',
//         gap: '24px',
//       }}
//     >
//       {questions.map((id, index) => (
//         <Alert
//           // eslint-disable-next-line react/no-array-index-key
//           key={index}
//           draggable
//           onDragStart={() => handleDragStart(index)}
//           onDragEnter={() => handleDragEnter(index)}
//           onDragOver={(e) => e.preventDefault()}
//         >
//           {id}
//         </Alert>
//       ))}
//     </Box>
//   );
// };

// export default QuestionsContainer;
