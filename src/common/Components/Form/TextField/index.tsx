import { Box } from "@mui/material";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {
  FieldValues,
  Control,
  Controller,
  Path,
  PathValue,
} from "react-hook-form";

interface FormTextFieldProps<Model extends FieldValues> {
  control: Control<Model>;
  name: Path<Model>;
  required?: boolean;
  label: string;
  mask?: (value: string) => string;
  stepInput?: React.RefObject<HTMLInputElement>;
  error?: string;
  helperText?: string;
  autoFocus?: boolean;
  disabled?: boolean;
  inputProps?: TextFieldProps;
  onChange?: (newValue: string) => void;
  inputBox?: "filled" | "outlined" | "standard";
}

export const FormTextField = <Model extends FieldValues>({
  control,
  name,
  required,
  label,
  mask,
  error,
  helperText,
  inputBox,
  stepInput,
  disabled,
  autoFocus,
  onChange,
  inputProps,
}: FormTextFieldProps<Model>) => {
  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    let parsedValue = event.target.value;
    if (mask) {
      const currentCursorPosition = event.target.selectionStart;
      const newValue = event.target.value;
      const slicedValue = newValue.slice(0, currentCursorPosition ?? 0).trim();
      const slicedValueWithMask = mask(slicedValue);
      parsedValue = mask(newValue);
      const newPosition = slicedValueWithMask.length;
      event.target.value = parsedValue;
      event.target.setSelectionRange(newPosition, newPosition);
    }
    onChange?.(parsedValue);
  }

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={"" as PathValue<Model, Path<Model>>}
      render={({ field }) => (
        <TextField
          {...field}
          {...inputProps}
          onChange={event => {
            handleChange(event);
            field.onChange(event);
          }}
          label={
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              {label}
              {!!required && (
                <Typography color="error" sx={{ marginLeft: "0.2rem" }}>
                  *
                </Typography>
              )}
            </Box>
          }
          autoFocus={autoFocus}
          ref={stepInput}
          fullWidth
          error={!!error}
          helperText={error ?? helperText}
          variant={inputBox ?? "outlined"}
          disabled={disabled}
        />
      )}
    />
  );
};
