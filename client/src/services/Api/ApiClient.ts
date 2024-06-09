import axiosCLient from 'axios';
import { AuthResponse } from './types/auth';
import { CreateUserDto, CreateUserResponse } from './types/create-user';
import { WithMessage } from './types/utils';
import { GlobalSearchResponse } from './types/global-search';
import { ExamsParams, ExamsResponse } from './types/exams';
import { TestsFilters, TestsResponse } from './types/tests';
import { DetailedTest } from '../../types/api/entities/detailedTest';
import { User } from '../../types/api/entities/user';
import { Exam } from '../../types/api/entities/exam';
import { Test } from '../../types/api/entities/test';
import { DetailedExam } from '../../types/api/entities/detailedExam';
import ApiError from './ApiError';
import { CreateQuestionDto, CreateQuestionsResponse } from './types/create-questions';
import { CreateTestDto, CreateTestResponse } from './types/create-test';
import { QuestionsParams, QuestionsRepsonse } from './types/questions';
import { UpdateMeDto, UpdateMeResponse } from './types/update-me';
import { ResetPasswordDto, ResetPasswordResponse } from './types/reset-password';
import { CreateExamResponse } from './types/create-exam';
import { ForgotPasswordDto } from './types/forgot-password';

const axios = axiosCLient.create({
  baseURL: import.meta.env.VITE_SERVER_HTTP_URL,
  withCredentials: true,
  // FIXME problem: while no internet connection the request pending infinitly
  timeout: 5000,
  timeoutErrorMessage: 'The request took too long to complete.',
});

export class RawApiClient {
  static async authenticate() {
    const { data } = await axios.get<AuthResponse>('/auth');

    return data.user;
  }

  static async login(email: User['email'], password: string) {
    const { data } = await axios.post<AuthResponse>('/auth/login', {
      email,
      password,
    });

    return data.user;
  }

  static async logout() {
    const { data } = await axios.get<WithMessage>('/auth/logout');

    return data.message;
  }

  static async createUser({ email, password, name, role }: CreateUserDto) {
    const { data } = await axios.post<CreateUserResponse>('/users', {
      email,
      password,
      name,
      role,
    });

    return data;
  }

  static async globalSearch(query: string, limit: number = 9) {
    const { data } = await axios.get<GlobalSearchResponse>('/search', {
      params: { query, limit },
    });

    return data.results;
  }

  static async getExams(filters: ExamsParams = {}) {
    const { data } = await axios.get<ExamsResponse>('/exams', {
      params: filters,
    });

    return data;
  }

  static async getTests(filters: TestsFilters = {}) {
    const { data } = await axios.get<TestsResponse>('/tests', {
      params: filters,
    });

    return data;
  }

  static async getTestName(id: Test['id']) {
    const { data } = await axios.get<Pick<Test, 'name'>>(`/tests/name/${id}`);

    return data.name;
  }

  static async getDetailedTest(id: DetailedTest['id']) {
    const { data } = await axios.get<DetailedTest>(`/tests/${id}`);

    return data;
  }

  static async createQuestions(questions: CreateQuestionDto[]) {
    const { data } = await axios.post<CreateQuestionsResponse>('/questions/many', questions);

    return data;
  }

  static async createTest(testData: CreateTestDto) {
    const { data } = await axios.post<CreateTestResponse>('/tests', testData);

    return data.test;
  }

  static async getExamById(id: Exam['id']) {
    const { data } = await axios.get<DetailedExam>(`/exams/${id}`);

    return data;
  }

  static async getQuestions(params: QuestionsParams = {}) {
    const { data } = await axios.get<QuestionsRepsonse>('/questions', {
      params,
    });

    return data;
  }

  static async updateMe(dto: UpdateMeDto) {
    const { data } = await axios.patch<UpdateMeResponse>('/users/me', dto);

    return data.user;
  }

  static async resetPassword(dto: ResetPasswordDto) {
    const { data } = await axios.post<ResetPasswordResponse>('/auth/reset-password', dto);

    return data.message;
  }

  static async forgotPassword(dto: ForgotPasswordDto) {
    const { data } = await axios.post<WithMessage>('/auth/forgot-password', dto);

    return data.message;
  }

  static async createExam(testId: Test['id']) {
    const { data } = await axios.post<CreateExamResponse>('/exams', { testId });

    return data;
  }
}

const ApiClient = new Proxy(RawApiClient, {
  get(target, propKey: string | symbol) {
    const prop = propKey as keyof typeof RawApiClient;

    if (typeof target[prop] === 'function') {
      return (...args: unknown[]) => {
        const originalFn = target[prop] as (...args: unknown[]) => Promise<unknown>;

        return originalFn.apply(target, args).catch((error: Error) => {
          throw new ApiError(error);
        });
      };
    }

    return target[prop];
  },
});

export default ApiClient;
