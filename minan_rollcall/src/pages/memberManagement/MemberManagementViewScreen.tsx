import React, { useState } from "react";
import { Backdrop, Box, createStyles, Fade, Grid, makeStyles, Modal, Paper, Theme } from "@material-ui/core";
import MemberManagementTable from "../../components/memberManagement/MemberManagementTable.tsx";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
    }),
  );
  
export default function MemberManagementViewScreen() {
    const classes = useStyles();

    const [open,setOpen] = useState(false)
    
    const handleButtonClick = (name:string)=>{
        setOpen(true);
      };
    const handleModalClose=()=>{
        setOpen(false);
    }
    return(
        <>
        <MemberManagementTable onButtonClick={(name:string)=>handleButtonClick(name)}/>
        
        </>
    )
}