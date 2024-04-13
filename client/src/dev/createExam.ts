/* eslint-disable */

export const login = () => {
  return fetch('http://localhost:3005/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      email: 'example@gmail.com',
      password: 'password',
    }),
  }).then((res) => res.json());
};

export interface Response {
  message: string;
  examCode: string;
  authorToken: string;
}

export const createExam = async (testId: number) => {
  return fetch('http://localhost:3005/exams', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ testId }),
  }).then((res) => res.json()) as Promise<Response>;
};
