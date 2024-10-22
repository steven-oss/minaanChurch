import { MembersResponse } from "../pages/memberManagement/MemberManagementScreen.tsx";
import apiClient from "./apiClient.ts";

export const fetchMembers = async (page:number,pageSize:number):Promise<MembersResponse>=>{
    return apiClient<MembersResponse>({
        url:`http://localhost:8000/members/pagination?page${page}&pageSize=${pageSize}`,
        method:'GET',
    })
}