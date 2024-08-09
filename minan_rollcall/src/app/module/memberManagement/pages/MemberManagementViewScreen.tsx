import React from "react";
import MemberManagementTable from "../components/MemberManagementTable.tsx";
import { Box } from "@material-ui/core";


export default function MemberManagementViewScreen() {
    return(
        <Box mt={2}>

            <MemberManagementTable/>
        </Box>
    )
}