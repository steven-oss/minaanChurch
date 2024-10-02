import React from "react";
import { Typography } from "@mui/material";

interface Props {
    titleName: string;
}

export default function RollCallListTypography(props: Props) {
    const { titleName } = props;

    return (
        <Typography variant="h5">
            {titleName}
        </Typography>
    );
}
