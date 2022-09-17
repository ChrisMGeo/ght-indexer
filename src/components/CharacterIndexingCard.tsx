import {
  Typography,
  Stack,
  TextField,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { Fragment, useRef } from "react";
interface CharacterIndexingCardProps {
  characterIndices: {
    builds: { weaponIndices: SE[]; artifactSetIndices: SE[] }[];
  }[];
  characterData: any;
  characterIndex: number;
  addSE: (
    type: "weaponIndices" | "artifactSetIndices",
    { start, end }: SE,
    characterIndex: number,
    buildIndex: number
  ) => void;
  removeSE: (
    type: "weaponIndices" | "artifactSetIndices",
    characterIndex: number,
    buildIndex: number,
    indicesIndex: number
  ) => void;
}
const CharacterIndexingCard = ({
  addSE,
  removeSE,
  characterData,
  characterIndices,
  characterIndex,
}: CharacterIndexingCardProps) => {
  const weaponRefs = useRef<any[]>(
    characterData.builds.map((_: any) => {
      return {};
    })
  );
  const artifactRefs = useRef<any[]>(
    characterData.builds.map((_: any) => {
      return {};
    })
  );
  return (
    <Card sx={{ borderRadius: 4 }}>
      <CardContent>
        <Typography variant="h4">{characterData.name}</Typography>
        {characterData.builds.map((buildData: any, buildIndex: number) => (
          <Fragment key={buildData.name}>
            <Typography variant="h6">{buildData.name}</Typography>
            <Stack direction="row" spacing={2}>
              <TextField
                inputRef={(el) => (weaponRefs.current[buildIndex] = el)}
                multiline
                rows={buildData.weapons.split("\n").length + 2}
                InputProps={{ readOnly: true }}
                defaultValue={buildData.weapons}
                sx={{ flex: 3 }}
              />
              <List dense sx={{ flex: 2 }}>
                {characterIndices[characterIndex].builds[
                  buildIndex
                ].weaponIndices.map(
                  (indices: { start: number; end: number }, indicesIndex) => (
                    <ListItem key={indicesIndex} sx={{ display: "list-item" }}>
                      <ListItemText
                        primary={`${indicesIndex + 1}. [${indices.start}-${
                          indices.end
                        }): ${buildData.weapons.slice(
                          indices.start,
                          indices.end
                        )}`}
                      />
                    </ListItem>
                  )
                )}
              </List>
            </Stack>
            <Button
              onClick={() => {
                const { selectionStart, selectionEnd, value } =
                  weaponRefs.current[buildIndex];
                addSE(
                  "weaponIndices",
                  {
                    start: selectionStart,
                    end: selectionEnd,
                    code: value.substring(selectionStart, selectionEnd),
                  },
                  characterIndex,
                  buildIndex
                );
              }}
            >
              Add Selection
            </Button>
            <Stack direction="row" spacing={2}>
              <TextField
                ref={(el) => (artifactRefs.current[buildIndex] = el)}
                multiline
                rows={buildData.artifact_sets.split("\n").length + 2}
                InputProps={{ readOnly: true }}
                defaultValue={buildData.artifact_sets}
                sx={{ flex: 3 }}
              />
              <List dense sx={{ flex: 2 }}></List>
            </Stack>
          </Fragment>
        ))}
      </CardContent>
    </Card>
  );
};
export default CharacterIndexingCard;
