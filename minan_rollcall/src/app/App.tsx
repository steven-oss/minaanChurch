import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Layout from './module/layout/index.tsx';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import MemberManagement from './module/memberManagement/index.tsx';
import HomePage from './pages/HomePage.tsx';

export default function App() {

  return (
    <Layout>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/MemberManagement/*" element={<MemberManagement />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </Layout>
  );
}

