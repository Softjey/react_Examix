import { Dayjs } from 'dayjs';
import { Controller, FieldValues } from 'react-hook-form';
import { MobileDatePicker, MobileDatePickerProps } from '@mui/x-date-pickers/MobileDatePicker';
import { ControlledProps } from '../../types/utils/ControlledProps';

type OmittedProps = 'name' | 'onClose' | 'onAccept' | 'ref' | 'value' | 'disabled';

interface Props<T extends FieldValues>
  extends ControlledProps<T>,
    Omit<MobileDatePickerProps<Dayjs>, OmittedProps> {}

const DatePicker = <T extends FieldValues>(props: Props<T>) => {
  const { control, name, controllerProps, ...restProps } = props;

  return (
    <Controller
      {...controllerProps}
      name={name}
      control={control}
      render={({ field }) => {
        const { onBlur, onChange, ref, value, disabled } = field;

        return (
          <MobileDatePicker
            name={name}
            onClose={onBlur}
            onAccept={onChange}
            ref={ref}
            value={value}
            disabled={disabled}
            slotProps={{ actionBar: { actions: ['clear', 'cancel', 'accept'] } }}
            {...restProps}
          />
        );
      }}
    />
  );
};

export default DatePicker;
