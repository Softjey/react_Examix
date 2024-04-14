export type AuthorizeStudentStatus = 'reconnected' | 'new' | 'error';
export type AuthorizeStudentReturnType = Promise<
  readonly [status: AuthorizeStudentStatus, studentId: string | null]
>;
