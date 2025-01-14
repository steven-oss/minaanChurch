import { Checkbox } from "@mui/material";
import React from "react";

interface Props {
  onChange: () => void;
  checked:boolean;
}

export default function RollCallListCheckbox(props: Props) {
  const { onChange,checked } = props;

  return <Checkbox onChange={onChange} checked={checked}/>;
}
