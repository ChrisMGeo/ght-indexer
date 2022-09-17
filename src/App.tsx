import "./App.css";
import characterData from "./data.json";
import {
  Box,
  ThemeProvider,
  CssBaseline,
  StyledEngineProvider,
  createTheme,
  Grid,
  Container,
} from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { useState } from "react";
import CharacterIndexingCard from "./components/CharacterIndexingCard";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const characters = characterData.characters;
  const [characterIndices, setCharacterIndices] = useState<
    { builds: { weaponIndices: SE[]; artifactSetIndices: SE[] }[] }[]
  >([
    ...characters.map((char) => {
      return {
        builds: [
          ...char.builds.map((_build) => {
            return {
              weaponIndices: [],
              artifactSetIndices: [],
            };
          }),
        ],
      };
    }),
  ]);
  const addSE = (
    type: "weaponIndices" | "artifactSetIndices",
    { start, end, code }: SE,
    characterIndex: number,
    buildIndex: number
  ) => {
    let chars = characterIndices;
    chars[characterIndex].builds[buildIndex][type].push({ start, end, code });
    setCharacterIndices((_prev) => chars);
    console.log(characterIndices[characterIndex].builds[buildIndex][type]);
  };
  const removeSE = (
    type: "weaponIndices" | "artifactSetIndices",
    characterIndex: number,
    buildIndex: number,
    indicesIndex: number
  ) => {
    let chars = characterIndices;
    chars[characterIndex].builds[buildIndex][type].splice(indicesIndex, 1);
    setCharacterIndices(chars);
    console.log(characterIndices[characterIndex].builds[buildIndex][type]);
  };
  return (
    <StyledEngineProvider>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Grid container direction="column" minHeight="100vh">
          <Container
            maxWidth="xl"
            sx={{ px: { xs: 0.5, sm: 1, md: 2 } }}
          ></Container>
          <Box my={1} display="flex" flexDirection="column" gap={1}>
            {characters.map((charData, characterIndex) => (
              <CharacterIndexingCard
                addSE={addSE}
                removeSE={removeSE}
                characterData={charData}
                characterIndices={characterIndices}
                characterIndex={characterIndex}
                key={`${charData.name}.${charData.element}`}
              />
            ))}
          </Box>
        </Grid>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
