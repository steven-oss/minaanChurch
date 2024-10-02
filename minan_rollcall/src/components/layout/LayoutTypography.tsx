import React from "react";
import { Typography } from "@mui/material";

interface Props{
    text:string;
    variant:"h4"| "body2";
    sx?:any;
    color?:string;
}
export default function LayoutTypography(props:Props) {
    const {text,variant,sx,color} = props;
    return (
        <Typography>
            <Typography
                variant={variant} // Equivalent to AntD's Title
                sx={sx}
                color={color}
                component={'span'} 
            >
                {text}
            </Typography>
        </Typography>
    );
}
