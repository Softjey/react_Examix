enum Message {
  CONNECTED = 'connected',
  DISCONNECT = 'disconnect',
  RECONNECTED = 'reconnected',
  EXCEPTION = 'exception',

  STUDENT_JOINED = 'student-joined',
  STUDENT_RECONNECTED = 'student-reconnected',
  STUDENT_DISCONNECTED = 'student-disconnected',

  QUESTION = 'question',
  RESULTS = 'results',

  EXAM_STARTED = 'exam-started',
  EXAM_FINISHED = 'exam-finished',
  EXAM_DELETED = 'exam-deleted',

  STUDENT_KICKED = 'student-kicked',
}

export default Message;
