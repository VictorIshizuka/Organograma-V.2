import { CircularProgress } from "@mui/material";
import { Button, ButtonProps } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface FormButtonProps {
  buttonProps?: ButtonProps;
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  component?: string;
  startIcon?: JSX.Element;
}

export const FormCancelButton = ({
  children,
  loading,
  ...rest
}: FormButtonProps) => {
  const navigate = useNavigate();
  return (
    <Button
      {...rest}
      onClick={() => navigate(-1)}
      fullWidth
      variant="outlined"
      color="error"
      sx={{ marginY: 1 }}
    >
      {loading ? <CircularProgress size={25} /> : children}
    </Button>
  );
};
