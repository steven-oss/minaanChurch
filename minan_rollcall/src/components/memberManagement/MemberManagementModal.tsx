import { Form, Modal } from "antd";
import React from "react";
import MemberManagementForm from "./MemberManagementForm.tsx";

interface Props{
    open:boolean;
    onCreateButtonCancel:()=>void;
    selectedMember:any;
}
export default function MemberManagementModal(props:Props){
    const {open,selectedMember,onCreateButtonCancel} = props;
    const [form] = Form.useForm();
    
    const handleCancel = ()=>{
        onCreateButtonCancel();
        form.resetFields();
    }
    return(
        <Modal
         title={<span style={{ fontSize: '24px' }}>{selectedMember ? "編輯會友" : "新增會友"}</span>}
         open={open} 
         onCancel={handleCancel}
         footer={null} 
         centered
         >
            <MemberManagementForm selectedMember={selectedMember} form={form}/>
        </Modal>
    )
}