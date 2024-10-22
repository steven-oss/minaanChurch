import React, { useEffect, useState } from "react";
import MemberManagementTable from "../../components/memberManagement/MemberManagementTable.tsx";
import MemberManagementButton from "../../components/memberManagement/MemberManagementButton.tsx";
import MemberManagementModal from "../../components/memberManagement/MemberManagementModal.tsx";
import { Box, Grid, Grid2 } from "@mui/material";
import MemberManagementSearch from "../../components/memberManagement/MemberManagementSearch.tsx";
import useApi from "../../hook/useApi.ts";
import { fetchGenderData } from "../../api/genderApi.ts";
import { fetchMembers } from "../../api/membersApi.ts";

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
    // const [filteredData, setFilteredData] = useState<DataType[]>([]); // 存儲篩選後的數據
    const [page, setPage] = useState(0); // Current page state
    const pageSize = 5;
    const [membersData, setMembersData] = useState<DataType[]>([]);
    const [pagination,setPagination] = useState<DataPagination>({
      currentPage:1,
      pageSize:1,
      totalMembers:1,
      totalPages:1
    })

    const { data: genderData, loading, error } = useApi(fetchGenderData);

    useEffect(() => {
      const fetchData = async () => {
        console.log(page,pageSize)
          const result = await fetchMembers(page, pageSize);
          console.log(result)
          setPagination(result.pagination);
          setMembersData(result.data); // Assuming result is of type DataType[]
      };

      fetchData();
    }, []);

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
      // 當輸入框改變時觸發的函數
    const handleSearch = (value: string) => {
      setSearchText(value);
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
          <MemberManagementTable onEditButton={handleEditButton} data={membersData} searchText={searchText} setPage={setPage} page={page} pagination={pagination}/>
          <MemberManagementModal open={open} onCreateButtonCancel={handleCreateButtonCancel} selectedMember={selectedMember} genderData={genderData}/>
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