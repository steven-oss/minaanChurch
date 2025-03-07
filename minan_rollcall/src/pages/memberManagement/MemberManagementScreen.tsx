import React, { useEffect, useState } from "react";
import MemberManagementTable from "../../components/memberManagement/MemberManagementTable.tsx";
import MemberManagementButton from "../../components/memberManagement/MemberManagementButton.tsx";
import MemberManagementModal from "../../components/memberManagement/MemberManagementModal.tsx";
import { Box, Grid, Grid2 } from "@mui/material";
import MemberManagementSearch from "../../components/memberManagement/MemberManagementSearch.tsx";
import useApi from "../../hook/useApi.ts";
import { fetchGenderData } from "../../api/genderApi.ts";
import { fetchMembers, getMembersById, getSearchMembers } from "../../api/membersApi.ts";

export interface DataType {
  id: number;
  username: string;
  gender: number;
  isAdult: boolean;
  notes: string;
  street: string;
  phone: string;
  createdAt:string;
  updateAt:string;
  check?:boolean;
}
export interface GenderType{
  message:string;
  data: Array<{ id: number; gender: string }>;
}

export interface DataPagination{
  totalMembers: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export interface MembersResponse {
  message: string;
  data: DataType[];
  pagination:DataPagination;
}



export default function MemberManagementScreen() {  
    const [open,setOpen] = useState<boolean>(false)
    const [selectedMember, setSelectedMember] = useState<any>(null); 
    const [searchText, setSearchText] = useState(''); // 存儲搜尋文字
    const [page, setPage] = useState(0); // Current page state
    const [membersData, setMembersData] = useState<DataType[]>([]);
    const [pagination,setPagination] = useState<DataPagination>({
      currentPage:1,
      pageSize:1,
      totalMembers:1,
      totalPages:1
    })
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const { data: genderData, loading, error } = useApi(fetchGenderData);

    const fetchData = async (currentPage: number,rowsPerPage:number) => {
      const result = await fetchMembers(currentPage + 1, rowsPerPage);
      setPagination(result.pagination);
      setMembersData(result.data); 
    };

    useEffect(() => {
        fetchData(page,rowsPerPage);
    }, []);

    const handleCreateButton = ()=>{
      setOpen(true);
      setSelectedMember(null);  
    };
    const handleCreateButtonCancel=()=>{
      setOpen(false);
    }
   
    const handleEditButton = async(id:number)=>{
      setOpen(true);
      const memberData = await getMembersById(id);
      setSelectedMember(memberData.data);
    };

      // 分頁變更處理
    const handleChangePage = async(event: unknown, newPage: number) => {
      setPage(newPage);
      const result = await fetchMembers(newPage + 1, rowsPerPage);
      setPagination(result.pagination);
      setMembersData(result.data); 
    };

      // 行數變更處理
    const handleChangeRowsPerPage = async(event: React.ChangeEvent<HTMLInputElement>) => {
      if(!searchText){
        const result = await fetchMembers(1, parseInt(event.target.value, 10));
        setPagination(result.pagination);
        setMembersData(result.data);
      }else{
        const result = await getSearchMembers(searchText,1, parseInt(event.target.value, 10));
        setPagination(result.pagination);
        setMembersData(result.data);
      }
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

      // 當輸入框改變時觸發的函數
    const handleSearch = async(value: string) => {
      setSearchText(value);
      const result = await getSearchMembers(value);
      setPagination(result.pagination);
      setMembersData(result.data);
      setPage(0);
    };

    return(
        <>
        <Grid container alignItems={'center'}>
          <Grid item xs={6}>
            <MemberManagementSearch onSearch={(value:string)=>handleSearch(value)} searchText={searchText}/>
          </Grid>
          <Grid item xs={6} textAlign={'right'}>
            <MemberManagementButton actionName="新增會友" onClick={handleCreateButton} color="primary"/>
            </Grid>
        </Grid>
          <MemberManagementTable onEditButton={handleEditButton} data={membersData} page={page} pagination={pagination} rowsPerPage={rowsPerPage} onChangePage={(event:unknown,newPage:number)=>handleChangePage(event,newPage)} onChangeRowsPerPage={(event:React.ChangeEvent<HTMLInputElement>)=>handleChangeRowsPerPage(event)}/>
          <MemberManagementModal open={open} onCreateButtonCancel={handleCreateButtonCancel} selectedMember={selectedMember} genderData={genderData} pagination={pagination} rowsPerPage={rowsPerPage} setPagination={setPagination} setMembersData={setMembersData}/>
        </>
    )
}