import React from "react";
import MemberManagementTable from "../components/MemberManagementTable.tsx";
import { Box, Grid, Paper } from "@material-ui/core";


export default function MemberManagementViewScreen() {
    return(
        <Grid container>
            <Grid container item xs={2}>

            </Grid>
            <Grid container item xs={10}>
                <MemberManagementTable/>
            </Grid>
        </Grid>
    )
}