import { MembersResponse } from "../pages/memberManagement/MemberManagementScreen.tsx";
import apiClient from "./apiClient.ts";

export const fetchMembers = async (page:number,pageSize:number):Promise<MembersResponse>=>{
    return apiClient<MembersResponse>({
        url:`http://localhost:8000/members/pagination?page=${page}&pageSize=${pageSize}`,
        method:'GET',
    })
}

export const postMembers = async(data:any)=>{
    return apiClient<any>({
        url:`http://localhost:8000/members`,
        method:'POST',
        data:data
    })
}

export const getMembersById =async(id:number)=>{
    return apiClient<any>({
        url:`http://localhost:8000/members/${id}`,
        method:'GET'
    })
}

export const putMembers = async(id:number,data:any) =>{
    return apiClient<any>({
        url:`http://localhost:8000/members/${id}?`,
        method:'PUT',
        data:data
    })
}

export const getSearchMembers = async(username:any,page?:number,pageSize?:number)=>{
    return apiClient<any>({
        url:`http://localhost:8000/members/search?username=${username}&page=${page}&pageSize=${pageSize}`,
        method:'GET'
    })
}