import { useCallback } from "react";

import { Control, Controller, FieldValues, Path } from "react-hook-form";

import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";

interface FormSelectProps<Model extends FieldValues> {
  name: Path<Model>;
  control: Control<Model>;
  options?: string[];
  required?: boolean;
  label: string;
  onChange?: (newValue: string | null) => void;
  error?: string;
  loading?: boolean;
  disabled?: boolean;
  inputBox?: "filled" | "outlined" | "standard";
  helperText?: string;
}

export const FormSelect = <Model extends FieldValues>({
  name,
  control,
  required,
  options,
  inputBox = "outlined",
  label,
  onChange,
  disabled,
  error,
}: FormSelectProps<Model>) => {
  const handleChange = useCallback(
    (e: SelectChangeEvent, fieldOnChange: (param?: string) => void) => {
      const newValue = e.target.value as string;
      fieldOnChange(newValue as string);
      if (onChange) {
        onChange(newValue);
      }
    },
    [onChange]
  );

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControl
          error={!!error}
          fullWidth
          variant={inputBox}
          disabled={disabled}
          {...field}
        >
          <InputLabel>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              {label}
              {!!required && (
                <Typography color="error" sx={{ marginLeft: "0.2rem" }}>
                  *
                </Typography>
              )}
            </Box>
          </InputLabel>
          <Select
            onChange={event => handleChange(event, field.onChange)}
            value={field.value ?? ""}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {options?.map((item, index) => {
              return (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              );
            })}
          </Select>
          {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};
