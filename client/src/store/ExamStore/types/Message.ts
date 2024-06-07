enum Message {
  CONNECTED = 'connected',
  DISCONNECT = 'disconnect',
  RECONNECTED = 'reconnected',

  STUDENT_JOINED = 'student-joined',
  STUDENT_RECONNECTED = 'student-reconnected',

  EXCEPTION = 'exception',

  RESULTS = 'results',

  EXAM_STARTED = 'exam-started',
  QUESTION = 'question',

  EXAM_FINISHED = 'exam-finished',
  STUDENT_KICKED = 'student-kicked',
}

export default Message;
