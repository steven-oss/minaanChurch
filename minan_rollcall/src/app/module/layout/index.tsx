import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import {  useNavigate } from 'react-router-dom';

interface Props{
  children: React.ReactNode;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      fontSize:'1.5rem'
    },
    button: {
      fontSize: '1.25rem',  // 调整字体大小
    },
  }),
);

export default function Layout({ children }: Props) {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };
  
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            民安教會後台管理
          </Typography>
          <Button color="inherit" className={classes.button}>點名表</Button>
          <Button color="inherit" className={classes.button}>人數統計表</Button>
          <Button color="inherit" onClick={() => handleNavigate('/MemberManagement')} className={classes.button}>會友管理</Button>
        </Toolbar>
      </AppBar>
      {children}
    </div>
  );
}

