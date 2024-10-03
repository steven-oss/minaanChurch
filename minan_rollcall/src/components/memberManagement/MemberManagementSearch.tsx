import { TextField } from "@mui/material";
import React from "react";

interface Props{
    onSearch:(value:string)=>void;
    searchText:string;
}
export default function MemberManagementSearch(props:Props){
    const {onSearch,searchText} = props;

    return(
        <TextField
        variant="outlined"
        placeholder="搜尋會友"
        onChange={(e)=>onSearch(e.target.value)} // 即時更新
        value={searchText}
        margin="normal"
      /> 
    )
}