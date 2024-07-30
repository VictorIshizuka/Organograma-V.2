import { ImageComponent } from "@/common/components/Image";

import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCollaborator } from "../../hook";
import { CollaboratorRemoveHook } from "../../types";
import { useAuth } from "@/modules/auth/hook";

export interface CollaboratorProps {
  id: string;
  image?: string;
  role: string;
  name: string;
  color: string;
}

export default function CollaboratorItem({
  id,
  name,
  role,
  image,
  color,
}: CollaboratorProps) {
  const { collaboratorRemove } = useCollaborator();
  const { admin } = useAuth();

  return (
    <Box
      height={210}
      padding="10px, 10px"
      margin=" 10px"
      borderRadius="2px"
      bgcolor="#fff"
      sx={{ xs: 2, sm: 3, md: 12 }}
    >
      <Box
        borderRadius="2px 2px 0px 0px"
        display="flex"
        flexDirection="column"
        bgcolor={color}
        alignItems="center"
      >
        <ImageComponent
          name={name}
          image={`https://github.com/${image}.png`}
          sx={{
            width: "70px",
            height: "70px",
            borderRadius: "50%",
            position: "relative",
            bottom: "-30px",
          }}
        />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        padding="20px"
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
          }}
        >
          <Typography variant="body2" color="text.primary">
            <Box sx={{ display: "flex", justifyContent: "center" }}>{name}</Box>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              10/10/2024
            </Box>
          </Typography>

          <Typography variant="body2" color="text.secondary">
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                color: "#7c73e6",
                fontWeight: 600,
              }}
            >
              {role}
            </Box>
          </Typography>
          {admin && (
            <IconButton
              aria-label="delete"
              onClick={() =>
                collaboratorRemove(id as unknown as CollaboratorRemoveHook)
              }
            >
              <DeleteIcon />
            </IconButton>
          )}
        </CardContent>
      </Box>
    </Box>
  );
}
