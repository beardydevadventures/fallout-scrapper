import React, { useState } from 'react';
import 'typeface-roboto';

import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, makeStyles, useTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Overseer from './Fonts/Fonts.js';
import JunkFilters from './JunkFilters/JunkFilters';
import JunkTable from './JunkTable/JunkTable';

import JunkItems from './Data/JunkItems';

const drawerWidth = 240;
const junkData = JunkItems;

const muiTheme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [Overseer, "Roboto"],
      },
    },
  },
  palette: {
    primary: {
      light: '#5b799e',
      main: '#325886',
      dark: '#233d5d',
      contrastText: '#fff',
    },
    secondary: {
      light: '#fef483',
      main: '#fef265',
      dark: '#b1a946',
      contrastText: '#000',
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  title: {
    color: muiTheme.palette.secondary.main,
    fontFamily: 'Overseer, Arial',
    fontSize: 36,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const App = ({ props }) => {
  const classes = useStyles();
  const theme = useTheme();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [junkItems] = useState({
    junkList: junkData
  });
  const [filterItems, setFilterItems] = useState({
    filterKeys: []
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap className={classes.title}>
              Fallout Scrap Finder
          </Typography>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          <Hidden smUp implementation="css">
            <Drawer
              container={props}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              <ListItem button key='Close' onClick={handleDrawerToggle}>
                <ListItemIcon><MenuIcon /></ListItemIcon>
                <ListItemText primary='Close' />
              </ListItem>
              <JunkFilters filterItems={filterItems.filterKeys} setFilterItems={setFilterItems} />
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              <JunkFilters filterItems={filterItems.filterKeys} setFilterItems={setFilterItems} />
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <JunkTable junkComponents={junkItems.junkList} filterItems={filterItems.filterKeys} setFilterItems={setFilterItems} />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;