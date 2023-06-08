'use client';
import * as React from 'react';
import { useContext, useState } from 'react';
import {
  Box,
  Collapse,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Tooltip
} from '@mui/material';
import { ExpandLess, ExpandMore, People } from '@mui/icons-material';
import LockIcon from '@mui/icons-material/Lock';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import CalendarIcon from '@mui/icons-material/CalendarMonth';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
//import { AbilityContext } from 'context/ability.context';
//import { accessRules } from 'routes/access_rules';
//import StyledLink from 'components/StyledLink';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import Link from 'next/link';

type MenuItem = {
  title: string;
  icon: JSX.Element;
  link?: string;
  name: string;
  children?: MenuItem[];
};

const Sidebar: React.FC<{}> = (props) => {
  const isSidebarOpened = true;
  const [menuOpened, setMenuOpened] = useState('');

  const menuItems: MenuItem[] = [
    {
      name: 'profile',
      title: 'Profile',
      icon: <PersonIcon />,
      link: '/profile'
    },
    {
      name: 'managers',
      title: 'Managers',
      icon: <AccountTreeIcon />,
      link: '/managers'
    },
    {
      title: 'People',
      name: 'people',
      icon: <SearchIcon />,
      link: '/people',
      children: []
    },
    {
      title: 'User management',
      name: 'user_management',
      icon: <PeopleIcon />,
      children: [
        { name: 'users', title: 'Users', icon: <People />, link: '/entity/users' },
        {
          name: 'employment_types',
          title: 'Employment Types',
          icon: <LockIcon />,
          link: '/entity/employment_types'
        },
        {
          name: 'cost_centers',
          title: 'Cost Centers',
          icon: <People />,
          link: '/entity/cost_centers'
        }
      ]
    },
    {
      name: 'manage_permissions',
      title: 'Manage permissions',
      icon: <LockIcon />,
      children: [
        {
          name: 'assign_permissions',
          title: 'Assign permissions',
          icon: <People />,
          link: '/permissions/manage'
        },
        {
          name: 'permissions',
          title: 'Edit permissions',
          icon: <People />,
          link: '/entity/permissions'
        },
        { name: 'roles', title: 'Manage roles', icon: <People />, link: '/entity/roles' }
      ]
    },
    {
      title: 'Manage events',
      name: 'events_root',
      icon: <CalendarIcon />,
      children: [
        {
          name: 'events_calendar',
          title: 'Event calendar',
          icon: <PersonIcon />,
          link: '/events-calendar'
        },
        {
          name: 'events_scheduler',
          title: 'Event scheduler',
          icon: <CalendarIcon />,
          link: '/events-planner'
        },
        {
          name: 'event_types',
          title: 'Manage events',
          icon: <CalendarIcon />,
          link: '/entity/eventTypes'
        },
        {
          name: 'event_fields',
          title: 'Manage fields',
          icon: <CalendarIcon />,
          link: '/entity/eventFields'
        },
        {
          name: 'event_type_fields',
          title: 'Manage type fields',
          icon: <CalendarIcon />,
          link: '/entity/eventTypeFields'
        }
      ]
    }
  ];

  const handleMenuItemClick = (menuItem: string) => {
    setMenuOpened((prev) => (prev === menuItem ? '' : menuItem));
  };

  const logout = async () => {
    //navigate('/logout');
  };

  return (
    <Stack height="100vh" justifyContent="space-between">
      <Box>
        {menuItems
          //.filter((menuItem) => auth(menuItem))
          .map((menuItem) => {
            return (
              <React.Fragment key={menuItem.title}>
                <ListItemButton onClick={() => handleMenuItemClick(menuItem.title)}>
                  <ListItemIcon>{menuItem.icon}</ListItemIcon>
                  {menuItem.link ? (
                    <Link prefetch={false} href={{ pathname: menuItem.link }}>
                      <ListItemText primary={menuItem.title} />
                    </Link>
                  ) : (
                    <ListItemText primary={menuItem.title} />
                  )}
                  {menuItem.children && menuItem.children.length ? (
                    menuItem.title === menuOpened ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )
                  ) : null}
                </ListItemButton>

                <Collapse in={menuItem.title === menuOpened} timeout="auto" >
                  <List component="div" disablePadding>
                    {menuItem.children ?
                      menuItem.children
                        .map((item) =>
                          isSidebarOpened ? (
                            <ListItemButton key={item.title} sx={{ pl: 11 }}>
                              {item.link ? (
                                <Link prefetch={false} href={{ pathname: item.link }}>
                                  <ListItemText primary={item.title} />
                                </Link>
                              ) : (
                                <ListItemText primary={item.title} />
                              )}
                            </ListItemButton>
                          ) : (
                            <Tooltip key={item.title} title={item.title} placement="right" arrow>
                              <ListItemButton sx={{ pl: 4 }}>
                                <Link prefetch={false} href={{ pathname: item.link }}>
                                  <ListItemIcon >{item.icon}</ListItemIcon>
                                </Link>
                              </ListItemButton>
                            </Tooltip>
                          )
                        ) : null}
                  </List>

                </Collapse>
                <Divider />
              </React.Fragment>
            );
          })}
      </Box>

      <Box>
        <Divider />
        <ListItemButton onClick={logout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Log Out" />
        </ListItemButton>
      </Box>
    </Stack>
  );
};

export default Sidebar;
