"use client";

import { Stack, Button, TextField, Typography } from "@mui/material";

export default function Get() {
  return (
    <div>
      <Stack alignItems="center">
        <Typography>Simple storage 1</Typography>
        <Stack direction="row">
          <Button variant="contained">Get</Button>
          <TextField
            label="Stored number"
            type="number"
            InputProps={{
              readOnly: true,
            }}
            variant="filled"
          />
        </Stack>

        <Typography marginTop="20px">Simple storage 2</Typography>
        <Stack direction="row">
          <Button variant="contained">Get</Button>
          <TextField
            label="Stored number"
            type="number"
            InputProps={{
              readOnly: true,
            }}
            variant="filled"
          />
        </Stack>
      </Stack>
    </div>
  );
}
