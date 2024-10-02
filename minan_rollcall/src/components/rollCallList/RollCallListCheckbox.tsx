import { Checkbox } from "@mui/material";
import React from "react";

interface Props {
  onChange: () => void;
}

export default function RollCallListCheckbox(props: Props) {
  const { onChange } = props;
  return <Checkbox onChange={onChange} />;
}
