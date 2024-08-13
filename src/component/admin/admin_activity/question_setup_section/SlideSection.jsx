import * as React from "react";
import { Box, Button } from "@mui/material";
import Slide from "./Slide";
import AddIcon from "@mui/icons-material/Add";

const SlideSection = ({setQuestions, addQuestion, questions }) => {
  return (
    <Box sx={{ px: 2, minWidth: "100%" }}>
      {questions?.map((item, index) => (
        <Slide key={index} index={index} setQuestions={setQuestions} item={item} />
      ))}
      <Button
        aria-label="add slide"
        size="small"
        variant="contained"
        color="primary"
        endIcon={<AddIcon />}
        onClick={addQuestion}
      >
        Add Slide
      </Button>
    </Box>
  );
};

export default SlideSection;
