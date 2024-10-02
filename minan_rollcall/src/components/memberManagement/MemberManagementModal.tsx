import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";
import MemberManagementForm from "./MemberManagementForm.tsx";
import MemberManagementButton from "./MemberManagementButton.tsx";

interface Props {
  open: boolean;
  onCreateButtonCancel: () => void;
  selectedMember: any;
}

export default function MemberManagementModal(props: Props) {
  const { open, selectedMember, onCreateButtonCancel } = props;

  const handleCancel = () => {
    onCreateButtonCancel();
  };

  return (
    <Dialog open={open} onClose={handleCancel} fullWidth maxWidth="sm">
      <DialogTitle>
        <Typography variant="h6" component="span">
          {selectedMember ? "編輯會友" : "新增會友"}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <MemberManagementForm selectedMember={selectedMember} />
      </DialogContent>
      <DialogActions>
        <MemberManagementButton actionName={"取消"} onClick={handleCancel} color="error"/>
      </DialogActions>
    </Dialog>
  );
}
