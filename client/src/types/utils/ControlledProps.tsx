import { ControllerProps, FieldValues } from 'react-hook-form';

export interface ControlledProps<FormValues extends FieldValues>
  extends Pick<ControllerProps<FormValues>, 'name' | 'control'> {
  controllerProps?: Omit<ControllerProps<FormValues>, 'render' | 'name' | 'control'>;
}
