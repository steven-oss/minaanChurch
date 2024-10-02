import React, { useState } from "react";
import MemberManagementTable from "../../components/memberManagement/MemberManagementTable.tsx";
import MemberManagementButton from "../../components/memberManagement/MemberManagementButton.tsx";
import MemberManagementModal from "../../components/memberManagement/MemberManagementModal.tsx";
import { Box } from "@mui/material";
  
export default function MemberManagementScreen() {

    const [open,setOpen] = useState<boolean>(false)
    const [selectedMember, setSelectedMember] = useState<any>(null); 

    const handleCreateButton = ()=>{
      setOpen(true);
      setSelectedMember(null);  
    };
    const handleCreateButtonCancel=()=>{
      setOpen(false);
    }
   
    const handleEditButton = (key:number)=>{
      setOpen(true);
      console.log(key);
      const memberData = getMemberById(key);
      setSelectedMember(memberData);
    };


    return(
        <>
        <Box display="flex" justifyContent="flex-end" >
            <MemberManagementButton actionName="新增會友" onClick={handleCreateButton} color="primary"/>
        </Box>
          <MemberManagementTable onEditButton={(key:number)=>handleEditButton(key)}/>
          <MemberManagementModal open={open} onCreateButtonCancel={handleCreateButtonCancel} selectedMember={selectedMember}/>
        </>
    )
}

function getMemberById(id:number) {
  switch (id){
    case 1:
      return{
        id,
        username: "魏榮光",
        gender: "男",
        isAdult:true,
        notes:'牧師',
        phone:'+886 123456789',
        address: {
          city: 'NewTaipei',
          area: 'Sindrum',
          street: '龍安路441號5F'
        }
      };
    case 2:
      return{
        id,
        username: "李孟芹",
        gender: "女",
        isAdult:true,
        notes:'師母',
        phone:'+886 123456789',
        address: {
          city: 'NewTaipei',
          area: 'Sindrum',
          street: '龍安路441號5F'
        }
      };
    case 3:
      return{
        id,
        username: "魏蘿苡",
        gender: "女",
        isAdult:false,
        notes:'牧師的女兒',
        phone:'+886 123456789',
        address: {
          city: 'NewTaipei',
          area: 'Sindrum',
          street: '龍安路441號5F'
        }
      };
    default:
      return null;
  }
}