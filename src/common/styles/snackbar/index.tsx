import { useRef } from "react";

import {
  SnackbarProvider as NotistackSnackbarProvider,
  SnackbarKey,
} from "notistack";

import { IconButton, styled } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Snackbar = styled(NotistackSnackbarProvider)({
  maxWidth: "20rem",
  maxHeight: "7rem",
  overflow: "hidden",
});

export const SnackbarProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const snackRef = useRef<NotistackSnackbarProvider>(null);
  return (
    <Snackbar
      ref={snackRef}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      maxSnack={3}
      preventDuplicate
      action={(key: SnackbarKey | undefined) => (
        <IconButton
          size="small"
          sx={{ position: "absolute", top: 9, right: 2 }}
          onClick={() => snackRef.current?.closeSnackbar(key)}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      )}
    >
      {children}
    </Snackbar>
  );
};
