import React, { memo } from "react";
import PermissionRoute from "../../../_basic/helpers/PermissionRoute.tsx";
import MemberManagementViewScreen from "./pages/MemberManagementViewScreen.tsx";

interface RouteConfig {
    path: string;
    element: JSX.Element;
}

const routesConfig:RouteConfig[] = [
    {
        path:'/',
        element:<MemberManagementViewScreen/>
    },
    {
        path:'/MemberManagement',
        element:<MemberManagementViewScreen/>
    }
]

const MemberManagement = () => PermissionRoute(routesConfig);

export default memo(MemberManagement)