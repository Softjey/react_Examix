import React, { useState } from 'react';
import Button from './UI/buttons/Button';
import ResetPasswordModal from './ResetPasswordModal';

const ChangePasswordButton: React.FC = () => {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsPasswordModalOpen(true)}>Change</Button>

      <ResetPasswordModal
        open={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </>
  );
};

export default ChangePasswordButton;
