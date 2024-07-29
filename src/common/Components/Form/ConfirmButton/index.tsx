import { Button, ButtonProps } from "@mui/material";
import { CircularProgress } from "@mui/material";

interface FormButtonProps {
  buttonProps?: ButtonProps;
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  component?: string;
  startIcon?: JSX.Element;
}

export const FormConfirmButton = ({
  children,
  loading,
  ...rest
}: FormButtonProps) => {
  return (
    <Button
      {...rest}
      type="submit"
      fullWidth
      variant="contained"
      sx={{ marginY: 1 }}
    >
      {loading ? <CircularProgress size={25} /> : children}
    </Button>
  );
};
