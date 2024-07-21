import { Box, Paper } from "@mui/material";
import { TeamItem } from "@/modules/collaborator/components/TeamItem";
import { teams } from "@/modules/collaborator/data";
import { useCollaborator } from "../../hook";

export function ListCollaboratorsPage() {
  const { registers } = useCollaborator();

  return (
    <Box margin={4}>
      <Paper>
        {teams.map((team, index) => {
          return (
            <TeamItem
              key={index}
              name={team.name}
              collaborators={registers?.filter(
                collaborator => collaborator.team === team.name
              )}
              color={team.color}
              id={team.id}
            />
          );
        })}
      </Paper>
    </Box>
  );
}
