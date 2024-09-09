import { Modal } from "antd";
import React from "react";

interface Props{
    open:boolean;
    onCreateButtonOK:()=>void;
    onCreateButtonCancel:()=>void;
}
export default function MemberManagementModal(props:Props){
    const {open,onCreateButtonOK,onCreateButtonCancel} = props;
    return(
        <Modal open={open} onOk={onCreateButtonOK} onCancel={onCreateButtonCancel}>
            <p>123...</p>
        </Modal>
    )
}