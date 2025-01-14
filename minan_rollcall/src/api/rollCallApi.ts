import apiClient from "./apiClient.ts"


export const getRollCallPagination = async (date:string,page:number,pageSize:number):Promise<any>=>{
    return apiClient<any>({
        url:`http://localhost:8000/roll-call/pagination?date=${date}&page=${page}&pageSize=${pageSize}`,
        method:'GET',
    })
}

export const postRollCall = async(data:any)=>{
    return apiClient<any>({
        url:`http://localhost:8000/roll-call`,
        method:'POST',
        data:data
    })
}

export const putRollCall = async(id:number,data:any)=>{
    return apiClient<any>({
        url:`http://localhost:8000/roll-call/update-check/${id}?`,
        method:'PUT',
        data:data
    })
}