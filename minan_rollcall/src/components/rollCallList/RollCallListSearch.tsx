import { TextField } from "@mui/material";
import React from "react";

interface Props{
    onSearch:(value:string)=>void;
    searchText:string;
}
export default function RollCallListSearch(props:Props){
    const {onSearch,searchText} = props;
    return(
        <TextField
              label="搜尋會友"
              variant="outlined"
              value={searchText}
              onChange={(e) => onSearch(e.target.value)} // Update search on change
            />
    );
}