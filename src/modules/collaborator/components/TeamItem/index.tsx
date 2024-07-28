import { Box, Grid, Typography } from "@mui/material";
import { CollaboratorWithoutPasswordModel } from "../../types";
import CollaboratorItem from "../CollaboratorItem";
import hexToRgba from "hex-to-rgba";

export interface CollaboratorsTeam {
  id: string;
  collaborators?: CollaboratorWithoutPasswordModel[];
  name: string;
  color: string;
}

export const TeamItem = ({
  collaborators,
  name,
  color,
}: CollaboratorsTeam): JSX.Element | boolean => {
  return (
    collaborators!.length > 0 && (
      <Box
        bgcolor={hexToRgba(color, 0.8)}
        flexDirection="column"
        borderRadius="2px"
        padding="0 10px 20px 10px"
      >
        <Box
          justifyContent="center"
          alignContent="center"
          color="#fff"
          display="flex"
        >
          <Typography
            fontFamily="monospace"
            paddingTop="10px"
            component="h4"
            variant="h4"
          >
            {name}
          </Typography>
        </Box>
        <Grid container columnSpacing={2} columns={{ xs: 8, sm: 12, md: 12 }}>
          {collaborators?.map((collaborator, index) => (
            <Grid item xs={4} sm={4} md={2.4} key={index}>
              <CollaboratorItem
                key={index}
                name={collaborator.name}
                role={collaborator.role}
                image={collaborator.image}
                color={color}
                id={collaborator._id}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    )
  );
};
