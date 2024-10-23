import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, Alert } from "@mui/material";
import MemberManagementForm from "./MemberManagementForm.tsx";
import MemberManagementButton from "./MemberManagementButton.tsx";
import { DataPagination, GenderType } from "../../pages/memberManagement/MemberManagementScreen.tsx";

interface Props {
  open: boolean;
  onCreateButtonCancel: () => void;
  selectedMember: any;
  genderData:GenderType|null;
  pagination:DataPagination;
  rowsPerPage:number;
  setPagination: (page: DataPagination) => void;
  setMembersData:(data:any)=>void;
}

export default function MemberManagementModal(props: Props) {
  const { open, selectedMember, onCreateButtonCancel,genderData,pagination,rowsPerPage,setPagination,setMembersData } = props;
  const [errorMessage, setErrorMessage] = useState<string | null>("");

  const handleCancel = () => {
    onCreateButtonCancel();
    setErrorMessage("");
  };

  return (
    <Dialog open={open} onClose={handleCancel} fullWidth maxWidth="sm">
      {errorMessage && (
          <Box>
              <Alert severity="error">{errorMessage}</Alert>
          </Box>
      )} 
      <DialogTitle>
        <Typography variant="h6" component="span">
          {selectedMember ? "編輯會友" : "新增會友"}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <MemberManagementForm selectedMember={selectedMember} genderData={genderData} setErrorMessage={setErrorMessage} onCancel={handleCancel} pagination={pagination} rowsPerPage={rowsPerPage} setPagination={setPagination} setMembersData={setMembersData}/>
      </DialogContent>
      <DialogActions>
        <MemberManagementButton actionName={"取消"} onClick={handleCancel} color="error"/>
      </DialogActions>
    </Dialog>
  );
}
