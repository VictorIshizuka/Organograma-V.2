import Button, { ButtonProps } from "@mui/material/Button";

export function ButtonComponent({ children }: ButtonProps): JSX.Element {
  return (
    <Button type="button" variant="contained" sx={{ textTransform: "unset" }}>
      {children}
    </Button>
  );
}
