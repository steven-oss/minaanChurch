import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import RollCallListTypography from "../../components/rollCallList/RollCallListTypography.tsx";
import RollCallListTable from "../../components/rollCallList/RollCallListTable.tsx";
import { Box, Grid } from "@mui/material";

export default function RollCallListWorshipScreen() {
    const location = useLocation();
    const navigate = useNavigate();

    const { date, modeIndex, mode } = location.state || {};
    const dateChange = moment(date.$d);
    console.log(modeIndex);
    
    // Convert to yyyy-mm-dd format
    const formattedDate = dateChange.format('YYYY-MM-DD');

    const selectedMode = mode.find(item => item.key === modeIndex);
    const modeName = selectedMode ? selectedMode.modeName : 'Unknown Mode';
    
    const handleOnchangeCheck = (key: number) => {
        console.log(key);
    };

    const handleBackPage = () => {
        navigate(-1);
    };

    return (
        <>
            <Grid container justifyContent="center">
                <Grid item>
                    <RollCallListTypography titleName={`${formattedDate} ${modeName} 點名表`} />
                </Grid>
            </Grid>
            <RollCallListTable onChangeCheck={handleOnchangeCheck} onBackPage={handleBackPage} />
        </>
    );
}
