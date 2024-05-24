import Subject from '../types/api/Subject';

export default function getSubjectImgPath(subject: Subject): string {
  return `./icons/subjects/${subject}.svg`;
}
