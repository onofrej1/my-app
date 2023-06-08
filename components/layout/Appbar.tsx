'use client';
import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { Badge, Box, IconButton, Stack, Toolbar } from '@mui/material';
import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HelpIcon from '@mui/icons-material/Help';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
export const StyledAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['width', 'margin'], {
    duration: theme.transitions.duration.leavingScreen,
    easing: theme.transitions.easing.sharp,
  }),
  zIndex: theme.zIndex.drawer + 1,
  ...(open && {
    transition: theme.transitions.create(['width', 'margin'], {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.sharp,
    }),
    width: `calc(100%)`
  }),
}));

export const AppBar = () => {
  const [open, setOpen] = React.useState(true);
  const { data: session } = useSession();
  console.log(session);

  const toggleDrawer = () => {
    //setOpen(!open);
  };

  return (
    <StyledAppBar position="fixed">
      <Toolbar>
        <Stack width="100%" direction="row" justifyContent="space-between">
          <Stack direction="row">
            <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
              {open ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>
            <h3>Admin</h3>
          </Stack>
          <Stack alignItems="center" direction="row">
            <IconButton color="inherit">
              <HelpIcon />
            </IconButton>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon onClick={() => signOut()} />
              </Badge>
            </IconButton>
            <IconButton color="inherit">
              <AccountCircleIcon onClick={() => signIn()} />
            </IconButton>
          </Stack>
        </Stack>
      </Toolbar>
    </StyledAppBar>
  );
}
