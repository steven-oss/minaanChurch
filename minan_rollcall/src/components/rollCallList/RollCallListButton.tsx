import { Button } from "@mui/material";
import React from "react";

interface Props {
  actionName: string;
  onClick: () => void;
}

export default function RollCallListButton(props: Props) {
  const { actionName, onClick } = props;
  return (
    <Button variant="contained" color="primary" onClick={onClick}>
      {actionName}
    </Button>
  );
}
