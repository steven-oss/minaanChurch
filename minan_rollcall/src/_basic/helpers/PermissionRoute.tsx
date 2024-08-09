import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

interface RouteConfig {
    path: string;
    element: JSX.Element;
}
export default function PermissionRoute(routesConfig: RouteConfig[]) {

  return (
    <Routes>
      {routesConfig.map((route) => {
        const { path } = route;
        return (
          <Route {...route} key={path} />
        );
      })}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}