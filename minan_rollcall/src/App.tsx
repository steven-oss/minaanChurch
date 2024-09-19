import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Layout from './pages/layout/index.tsx';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.tsx';
import MemberManagementViewScreen from './pages/memberManagement/MemberManagementViewScreen.tsx';
import Apps from './pages/layout/index.tsx';
import RollCallListViewScreen from './pages/rollCallList/RollCallListViewScreen.tsx';

export default function App() {

  return (
    <Apps>
        <Routes>
          <Route index element={<RollCallListViewScreen />} />
          <Route path="/MemberManagement/*" element={<MemberManagementViewScreen />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </Apps>
  );
}

