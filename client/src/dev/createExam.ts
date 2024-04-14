/* eslint-disable */

export interface Response {
  message: string;
  examCode: string;
  authorToken: string;
}

export const createExam = async (testId: number) => {
  return fetch(`${import.meta.env.VITE_SERVER_HTTP_URL}/exams`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ testId }),
  }).then((res) => res.json()) as Promise<Response>;
};
