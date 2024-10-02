import React, { useState } from "react";
import { Typography, Grid, Button, Box, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import RollCallListButton from "../../components/rollCallList/RollCallListButton.tsx";
import RollCallListTypography from "../../components/rollCallList/RollCallListTypography.tsx";
import RollCallListDynamicButton from "../../components/rollCallList/RollCallListDynamicButton.tsx";
import RollCallListDatePicker from "../../components/rollCallList/RollCallListDatePicker.tsx";

const ButtonRow = ({ children }: { children: React.ReactNode }) => (
    <Grid container justifyContent="center" sx={{ marginBottom: '10px' }}>
        <Grid item>{children}</Grid>
    </Grid>
);

export default function RollCallListSelectScreen() {
    const navigate = useNavigate();
    const [modeIndex, setModeIndex] = useState<number | null>(null);
    const [sessionIndex, setSessionIndex] = useState<number | null>(null);
    const [datePicker, setDatePicker] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const mode = [
        { key: 1, modeName: '華語禮拜' },
        { key: 2, modeName: '台語禮拜' },
        { key: 3, modeName: '養育班' },
        { key: 4, modeName: '門徒學校' },
        { key: 5, modeName: '門徒大學第一學期' },
        { key: 6, modeName: '門徒大學大二學期' },
    ];

    const session = [
        { key: 1, sessionName: '第一場' },
        { key: 2, sessionName: '第二場' },
    ];

    const handleModeButtonClick = (key: number) => {
        setModeIndex(modeIndex === key ? null : key);
    };

    const handleSessionButtonClick = (key: number) => {
        setSessionIndex(sessionIndex === key ? null : key);
    };

    const handleDatePickerChange = (dateString: string) => {
        setDatePicker(dateString);
    };

    const handleStartRollCall = () => {
        if (datePicker && modeIndex && sessionIndex) {
            navigate('Worship', { state: { date: datePicker, modeIndex, mode } });
        } else {
            setErrorMessage("請確保選擇了日期、聚會模式和聚會時間");
        }
    };

    return (
        <>
            {errorMessage && (
                <Box sx={{ marginBottom: 2 }}>
                    <Alert severity="error">{errorMessage}</Alert>
                </Box>
            )}
            <ButtonRow>
                <RollCallListTypography titleName="點名日期" />
            </ButtonRow>
            <ButtonRow>
                <RollCallListDatePicker onChange={handleDatePickerChange} />
            </ButtonRow>
            <ButtonRow>
                <RollCallListTypography titleName="聚會模式" />
            </ButtonRow>
            <ButtonRow>
                <RollCallListDynamicButton 
                    dynamicButton={mode} 
                    onClick={handleModeButtonClick} 
                    universalIndex={modeIndex} 
                />
            </ButtonRow>
            <ButtonRow>
                <RollCallListTypography titleName="聚會時間" />
            </ButtonRow>
            <ButtonRow>
                <RollCallListDynamicButton 
                    dynamicButton={session} 
                    onClick={handleSessionButtonClick} 
                    universalIndex={sessionIndex} 
                />
            </ButtonRow>
            <Grid container justifyContent="flex-end">
                <Grid item>
                    <RollCallListButton onClick={handleStartRollCall} actionName="開始點名" />
                </Grid>
            </Grid>
        </>
    );
}
