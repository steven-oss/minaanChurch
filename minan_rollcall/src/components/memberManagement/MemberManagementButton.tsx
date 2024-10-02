import { Button } from "@mui/material";
import React from "react";

interface Props {
    actionName: string;
    color?:'primary'|'error'|'success'|'secondary'|'warning';
    onClick: () => void;
}

export default function MemberManagementButton(props: Props) {
    const { actionName, onClick,color } = props;
    return (
        <Button variant="contained" color={color} onClick={onClick}>
            {actionName}
        </Button>
    );
}
