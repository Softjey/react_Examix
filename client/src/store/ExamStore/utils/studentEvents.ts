import { runInAction } from 'mobx';
import { Socket } from 'socket.io-client';
import Message from '../types/Message';
import Student from '../types/Student';
// eslint-disable-next-line import/no-cycle
import { ExamStore } from '../types/ExamStore';

export function onStudentJoined(this: ExamStore, socket: Socket) {
  socket.on(Message.STUDENT_JOINED, (student: Student) => {
    runInAction(() => {
      if (!this.exam) return;
      this.exam.students = [...this.exam.students, student];
    });
  });
}

export function onStudentReconnected(this: ExamStore, socket: Socket) {
  socket.on(Message.STUDENT_RECONNECTED, (student: Student) => {
    runInAction(() => {
      if (!this.exam) return;
      this.exam.students = this.exam.students.map((currStudent) => {
        return currStudent.studentId === student.studentId ? student : currStudent;
      });
    });
  });
}

export function onStudentLeave(this: ExamStore, socket: Socket) {
  socket.on(Message.STUDENT_DISCONNECTED, ({ studentId }: { studentId: string }) => {
    runInAction(() => {
      if (!this.exam) return;
      this.exam.students = this.exam.students.filter((student) => student.studentId !== studentId);
    });
  });
}
