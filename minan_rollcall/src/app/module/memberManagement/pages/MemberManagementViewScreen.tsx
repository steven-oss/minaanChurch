import React, { useState } from "react";
import MemberManagementTable from "../components/MemberManagementTable.tsx";
import { Backdrop, Box, createStyles, Fade, Grid, makeStyles, Modal, Paper, Theme } from "@material-ui/core";

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
        <Grid container>
            <Grid container item xs={2}>

            </Grid>
            <Grid container item xs={10}>
                <MemberManagementTable onButtonClick={(name:string)=>handleButtonClick(name)}/>
            </Grid>
        </Grid>
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >        
      <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Transition modal</h2>
            <p id="transition-modal-description">react-transition-group animates me.</p>
          </div>
        </Fade>
        </Modal>
        </>
    )
}