import Subject from '../types/api/enums/Subject';

export default function isSubject(value: unknown): value is Subject {
  return typeof value === 'string' && value in Subject;
}
