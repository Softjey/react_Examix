enum Message {
  CONNECTED = 'connected',
  DISCONNECT = 'disconnect',
  RECONNECTED = 'reconnected',

  STUDENT_JOINED = 'student-joined',
  STUDENT_RECONNECTED = 'student-reconnected',

  EXCEPTION = 'exception',

  EXAM_STARTED = 'exam-started',
  EXAM_FINISHED = 'exam-finished',
  QUESTION = 'question',
  STUDENT_KICKED = 'student-kicked',
  RESULTS = 'results',
}

export default Message;
