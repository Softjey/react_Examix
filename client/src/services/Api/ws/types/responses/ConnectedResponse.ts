import { DetailedTest } from '../../../../../types/api/entities/detailedTest';
import { WithMessage } from '../../../types/utils';

type ConnectedResponse = WithMessage<{ test: DetailedTest }>;

export default ConnectedResponse;
