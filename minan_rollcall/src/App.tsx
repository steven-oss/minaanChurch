import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import MemberManagementScreen from './pages/memberManagement/MemberManagementScreen.tsx';
import RollCallListSelectScreen from './pages/rollCallList/RollCallListSelectScreen.tsx';
import RollCallListWorshipScreen from './pages/rollCallList/RollCallListWorshipScreen.tsx';
import Apps from './pages/layout/index.tsx';

export default function App() {
  return (
    <Apps>
      <Routes>
        <Route index element={<MemberManagementScreen />} />
        {/* <Route path="/RollCallListSelectScreen" element={<RollCallListSelectScreen />}/> */}
        <Route path="/RollCallListSelectScreen/Worship" element={<RollCallListWorshipScreen />} />
        <Route path="/MemberManagement/*" element={<MemberManagementScreen />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Apps>
  );
}
