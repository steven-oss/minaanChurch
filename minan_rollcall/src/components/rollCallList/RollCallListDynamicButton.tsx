import React from "react";
import { Button, Grid } from "@mui/material";

interface ButtonItem {
    key: number;
    modeName?: string; // Optional for mode
    sessionName?: string; // Optional for session
}

interface Props {
    dynamicButton: Array<ButtonItem>;
    universalIndex: number | null;
    onClick: (key: number) => void;
}

export default function RollCallListDynamicButton(props: Props) {
    const { dynamicButton, onClick, universalIndex } = props;

    // Determine the column span based on the number of items
    const gridSize = dynamicButton.length < 4 ? 12 / dynamicButton.length : 3;

    const buttonStyle = {
        width: dynamicButton.length === 2 ? '150px' : '100%', // Set a smaller maxWidth for 2 buttons
    };

    return (
        <Grid container spacing={2} justifyContent="center">
            {dynamicButton.map((item) => (
                <Grid item xs={12} sm={gridSize} md={gridSize} key={item.key}>
                    <Button
                        variant={universalIndex === item.key ? "contained" : "outlined"} // MUI button variant
                        sx={buttonStyle}
                        onClick={() => onClick(item.key)} // Pass the item's key
                    >
                        {item.modeName || item.sessionName} {/* Display the correct label */}
                    </Button>
                </Grid>
            ))}
        </Grid>
    );
}
