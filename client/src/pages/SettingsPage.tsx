import React from 'react';
import HomeLayout from '../components/layouts/HomeLayout';
import SettingsSection from '../components/SettingsSection';
import SettingsOption from '../components/SettingsOption';
import ChangeThemeSwitch from '../components/ChangeThemeSwitch';
import ChangePinCodeButton from '../components/ChangePinCodeButton';
import DeleteAccountButton from '../components/DeleteAccountButton';
import ChangePasswordButton from '../components/ChangePassword';
import MyProfileItem from '../components/UI/MyProfileItem';

const SettingsPage: React.FC = () => (
  <HomeLayout centered centeredSx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
    <SettingsSection name="Profile">
      <MyProfileItem />
    </SettingsSection>

    <SettingsSection name="Security">
      <SettingsOption
        name="Pin Code Protection"
        description="Security features help keep your Tests/Exams secure and updated."
        action={<ChangePinCodeButton />}
      />
      <SettingsOption
        name="Change Password"
        description="Ensure your account's safety by changing your password"
        action={<ChangePasswordButton />}
      />
    </SettingsSection>

    <SettingsSection name="Appearance">
      <SettingsOption
        name="Dark theme"
        description="Select a single theme and switch between your day and night themes."
        action={<ChangeThemeSwitch />}
      />
    </SettingsSection>

    <SettingsSection name="Delete Account">
      <SettingsOption
        name="Delete Account"
        description="Once you delete your account, there is no going back."
        action={<DeleteAccountButton disabled />}
      />
    </SettingsSection>
  </HomeLayout>
);

export default SettingsPage;
