import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import SvgIcon from '@material-ui/core/SvgIcon';

import CreateAccount from './CreateAccount';
import BalanceTransfer from './BalanceTransfer';
import BondTransfer from './BondTransfer';
import TradeShare from './TradeShare';
import PurchaseBond from './PurchaseBond';
import GetAccount from './GetAccount';
import Pricing from './Pricing';
import Initialization from './Initializiation';
import BondMarket from './BondMarket';
import SideMenu from './SideMenu';
import Home from './home';

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    'box-shadow': '0 0 15px #00214B'
  },
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    height: '94%',
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  button: {
    zIndex: theme.zIndex.drawer + 1,
    background: '#3f51b5',
    color: 'white',
    border: '0px'
  },
  bottomBar: {
    background: '#3f51b5',
    position: 'fixed',
    bottom: 0,
    width: '100%',
    height: '5%',
    'box-shadow': '0 0 15px #00214B'
  }
}));
function HomeIcon() {
  return (
    <SvgIcon>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

export default function Manager() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.bottomBar}></div>
      <Router>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar >
          <HomeIcon/>
          <Link to='/'>
          <button type='button' className={classes.button}>
            <h1> Nash Stablecoin</h1>
            </button>
            </Link>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
         <SideMenu />
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
      <div>
        <Switch>
          <Route path="/NewAccount">
            <CreateAccount />
          </Route>
          <Route path="/BalanceTransfer">
            <BalanceTransfer />
          </Route>
          <Route path="/BondTransfer">
            <BondTransfer />
          </Route>
          <Route path="/TradeShare">
            <TradeShare />
          </Route>
          <Route path="/BondMarket">
            <BondMarket />
          </Route>
          <Route path="/PurchaseBond">
            <PurchaseBond />
          </Route>
          <Route path="/Account">
            <GetAccount />
          </Route>
          <Route path="/Pricing">
            <Pricing />
          </Route>
          <Route path="/Initializiation">
            <Initialization />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
      </main>
    </Router>
    </div>
  );
}
