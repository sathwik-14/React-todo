import React from "react";
import { Grid, Typography, TextField, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/AddCircle";
export function Hero({
  e,
  setInput,
  input,
  handleSubmit
}) {
  return <Grid container style={{
    justifyContent: "space-around",
    alignItems: "center"
  }}>
    <Grid xs={12} lg={6} md={6} item>
      <Typography variant="h4" gutterBottom mt={2}>
        Todo Application
      </Typography>
    </Grid>
    <Grid xs={12} lg={6} md={6} item>
      <div style={{
        marginTop: "2rem",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <TextField onChange={e => setInput(e.target.value)} value={input} id="outlined-multiline-flexible" label="Add Task" maxRows={4} />
        <IconButton onClick={handleSubmit} aria-label="add">
          <AddIcon style={{
            color: "#757ce8"
          }} fontSize="large" />
        </IconButton>
      </div>
    </Grid>
  </Grid>;
}
