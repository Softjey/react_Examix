import CreateTestForm from '../../components/CreateTestForm/CreateTestForm';
import HomeLayout from '../../components/layouts/HomeLayout';
import CreateTestProvider from './CreateTestContext';

interface Props {}

const CreateTestPage: React.FC<Props> = () => {
  return (
    <HomeLayout centered>
      <CreateTestProvider>
        <CreateTestForm />
      </CreateTestProvider>
    </HomeLayout>
  );
};

export default CreateTestPage;
