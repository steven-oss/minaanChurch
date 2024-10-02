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

  const handleFormSubmit = (values: any) => {
    console.log("Submitted values:", values);
    // 在這裡可以添加任何需要的邏輯，比如 API 請求或狀態更新
    // 例如，您可以在這裡將表單數據傳遞給父組件進行進一步處理
    // onCreateButtonSave(values);
    handleCancel(); // 提交後關閉對話框
  };

  return (
    <Dialog open={open} onClose={handleCancel} fullWidth maxWidth="sm">
      <DialogTitle>
        <Typography variant="h6" component="span">
          {selectedMember ? "編輯會友" : "新增會友"}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <MemberManagementForm selectedMember={selectedMember} onSubmit={handleFormSubmit} />
      </DialogContent>
      <DialogActions>
        <MemberManagementButton actionName={"取消"} onClick={handleCancel}/>
      </DialogActions>
    </Dialog>
  );
}
