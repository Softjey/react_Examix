import { InputBaseComponentProps } from '@mui/material';
import { css } from '@emotion/react';

function getHiddenInputNumberCounterStyles() {
  return css`
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &[type='number'] {
      -moz-appearance: textfield;
    }
  `;
}

export type Role = 'teacher' | 'student';

interface Fields {
  input1Placeholder: string;
  input2Placeholder: string;
  input1Label: string;
  input2Label: string;
  input2Type: React.HTMLInputTypeAttribute;
  buttonText: string;
}

interface InputProps {
  input1: InputBaseComponentProps;
  input2: InputBaseComponentProps;
}

function getInputProps(role: Role): InputProps {
  const defaultInputProps = {
    input1: {},
    input2: {},
  };

  switch (role) {
    case 'teacher':
      return defaultInputProps;
    case 'student':
      return {
        ...defaultInputProps,
        input2: { maxLength: 6, sx: getHiddenInputNumberCounterStyles() },
      };
    default:
      throw new Error('Role is unhandled');
  }
}

function getFields(role: Role): Fields {
  switch (role) {
    case 'teacher':
      return {
        input1Placeholder: 'Enter email',
        input2Placeholder: 'Enter password',
        input1Label: 'Email',
        input2Label: 'Password',
        input2Type: 'password',
        buttonText: 'Login',
      };
    case 'student':
      return {
        input1Placeholder: 'Enter name',
        input2Placeholder: 'Enter code',
        input1Label: 'Name',
        input2Label: 'Code',
        input2Type: 'number',
        buttonText: 'Join the test',
      };
    default:
      throw new Error('Role is unhandled');
  }
}

export function useLoginPage(role: Role) {
  const fields = getFields(role);
  const inputProps = getInputProps(role);
  return {
    fields,
    inputProps,
  };
}
