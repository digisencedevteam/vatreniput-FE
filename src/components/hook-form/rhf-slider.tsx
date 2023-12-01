import { useFormContext, Controller } from 'react-hook-form';
import FormHelperText from '@mui/material/FormHelperText';
import Slider, { SliderProps } from '@mui/material/Slider';

type Props = SliderProps & {
  name: string;
  helperText?: React.ReactNode;
};

const RHFSlider = ({ name, helperText, ...other }: Props) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <Slider {...field} valueLabelDisplay='auto' {...other} />

          {(!!error || helperText) && (
            <FormHelperText error={!!error}>
              {error ? error?.message : helperText}
            </FormHelperText>
          )}
        </>
      )}
    />
  );
};
export default RHFSlider;
