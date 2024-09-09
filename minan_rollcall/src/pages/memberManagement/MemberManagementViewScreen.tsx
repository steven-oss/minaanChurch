import React, { useState } from "react";
import MemberManagementTable from "../../components/memberManagement/MemberManagementTable.tsx";
import { Col, Row } from "antd";
import MemberManagementButton from "../../components/memberManagement/MemberManagementButton.tsx";
import MemberManagementModal from "../../components/memberManagement/MemberManagementModal.tsx";
  
export default function MemberManagementViewScreen() {

    const [open,setOpen] = useState<boolean>(false)

    const handleCreateButton = ()=>{
      setOpen(true);
    };
    const handleCreateButtonOK=()=>{
      setOpen(false);
    }
    const handleCreateButtonCancel=()=>{
      setOpen(false);
    }
   
    const handleEditButton = (key:number)=>{
      setOpen(true);
      console.log(key);
    };

    return(
        <>
         <Row justify="end" style={{ marginBottom: 16 }}>
            <Col>
              <MemberManagementButton actionName="新增會友" onClick={handleCreateButton} />
            </Col>
          </Row>
          <MemberManagementTable onEditButton={(key:number)=>handleEditButton(key)}/>
          <MemberManagementModal open={open} onCreateButtonOK={handleCreateButtonOK} onCreateButtonCancel={handleCreateButtonCancel}/>
        </>
    )
}