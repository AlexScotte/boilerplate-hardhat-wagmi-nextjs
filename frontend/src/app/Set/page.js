"use client";

import { Stack, Button, TextField, Typography } from "@mui/material";

export default function Set() {
  return (
    <div>
      <Stack alignItems="center">
        <Typography>Simple storage 1</Typography>
        <Stack direction="row">
          <TextField label="New stored number" type="number" variant="filled" />
          <Button variant="contained">Set</Button>
        </Stack>

        <Typography marginTop="20px">Simple storage 2</Typography>
        <Stack direction="row">
          <TextField label="New stored number" type="number" variant="filled" />
          <Button variant="contained">Set</Button>
        </Stack>
      </Stack>
    </div>
  );
}
