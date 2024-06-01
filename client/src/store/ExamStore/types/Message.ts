enum Message {
  CONNECTED = 'connected',
  DISCONNECT = 'disconnect',

  EXCEPTION = 'exception',
  TEST_INFO = 'test-info',
  STUDENT_RECONNECTED = 'student-reconnected',
  STUDENT_JOINED = 'student-joined',
  EXAM_STARTED = 'exam-started',
  EXAM_FINISHED = 'exam-finished',
  QUESTION = 'question',
  STUDENT_KICKED = 'student-kicked',
  RESULTS = 'results',
}

export default Message;
