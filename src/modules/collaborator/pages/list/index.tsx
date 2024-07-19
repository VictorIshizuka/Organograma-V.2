import { Box, Paper } from "@mui/material";
import {
  CollaboratorsTeam,
  TeamItem,
} from "@/modules/collaborator/components/TeamItem";

const teams: CollaboratorsTeam[] = [
  {
    color: "#007fff",
    name: "FRONTEND",
    id: "12345",
    collaborators: [
      {
        id: "6275aa18-7506-4034-8ba6-ee734d9f087f",
        name: "Miguel",
        role: "estudante",
        email: "v",
        team: "Front-End",
      },
      {
        id: "6275aa18-7506-4034-8ba6-ee734d9f087f",
        name: "Miguel",
        email: "v",
        role: "estudante",
        image: "https://github.com/Ishizuka13.png",
        team: "Front-End",
      },
      {
        id: "6275aa18-7506-4034-8ba6-ee734d9f087f",
        name: "Miguel",
        email: "v",
        role: "estudante",

        image: "https://github.com/Ishizuka13.png",
        team: "Front-End",
      },
      {
        id: "6275aa18-7506-4034-8ba6-ee734d9f087f",
        name: "Miguel",
        email: "v",
        role: "estudante",
        image: "https://github.com/Ishizuka13.png",
        team: "Front-End",
      },
      {
        id: "6275aa18-7506-4034-8ba6-ee734d9f087f",
        name: "Miguel",
        role: "estudante",
        email: "v",
        image: "https://github.com/Ishizuka13.png",
        team: "Front-End",
      },
      {
        id: "6275aa18-7506-4034-8ba6-ee734d9f087f",
        name: "Miguel",
        role: "estudante",
        email: "v",
        image: "https://github.com/Ishizuka13.png",
        team: "Front-End",
      },
      {
        id: "6275aa18-7506-4034-8ba6-ee734d9f087f",
        name: "Miguel",
        role: "estudante",
        email: "v",
        image: "https://github.com/Ishizuka13.png",
        team: "Front-End",
      },
      {
        id: "6275aa18-7506-4034-8ba6-ee734d9f087f",
        name: "Miguel",
        role: "estudante",
        email: "v",
        image: "https://github.com/Ishizuka13.png",
        team: "Front-End",
      },
      {
        id: "6275aa18-7506-4034-8ba6-ee734d9f087f",
        name: "Miguel",
        role: "estudante",
        email: "v",
        image: "https://github.com/Ishizuka13.png",
        team: "Front-End",
      },
    ],
  },
  {
    color: "#20c200",
    name: "PROGRAMAÇÃO",
    id: "12345",
    collaborators: [
      {
        id: "6275aa18-7506-4034-8ba6-ee734d9f087f",
        name: "Miguel",
        email: "v",
        role: "estudante",
        image: "https://github.com/Ishizuka13.png",
        team: "Front-End",
      },
      {
        name: "Victor",
        role: "Estudante",
        email: "v",
        image: "https://github.com/VictorIshizuka.png",
        team: "Front-End",
        id: "30b082f2-3db9-4155-809f-d8e6a3781816",
      },
    ],
  },
];

export function ListCollaboratorsPage() {
  return (
    <Box margin={4}>
      {/* <Box paddingBottom={2}>
        <ButtonComponent>Adicionar</ButtonComponent>
      </Box> */}
      <Paper>
        {teams.map((team, index) => {
          return (
            <TeamItem
              key={index}
              name={team.name}
              collaborators={team.collaborators}
              color={team.color}
              id={team.id}
            />
          );
        })}
      </Paper>
    </Box>
  );
}
