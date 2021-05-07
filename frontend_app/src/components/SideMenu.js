import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { green, blue, orange, purple, red, brown } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import { Divider } from '@material-ui/core/'
import NavigateNextRoundedIcon from '@material-ui/icons/NavigateNextRounded';
import SyncRoundedIcon from '@material-ui/icons/SyncRounded';
import PowerSettingsNewRoundedIcon from '@material-ui/icons/PowerSettingsNewRounded';

const menuItems = [
    { key: 'NewAccount', text: 'Default Accounts', icon: <NavigateNextRoundedIcon style={{ color: green[500] }}/> },
    { key: 'BalanceTransfer', text: 'Transfer Balance', icon: <NavigateNextRoundedIcon style={{ color: green[500] }} />},
    { key: 'TradeShare', text: 'Trade Share', icon: <NavigateNextRoundedIcon style={{ color: green[500] }} />},
    { key: 'BondTransfer', text: 'Bond Transfer', icon: <NavigateNextRoundedIcon  style={{ color: green[500] }} />},
    { key: 'BondMarket', text: 'Bond Market', icon: <NavigateNextRoundedIcon style={{ color: green[500] }} />},
    { key: 'PurchaseBond', text: 'Purchase Bond', icon: <NavigateNextRoundedIcon style={{ color: green[500] }} />},
    { key: 'Account', text: 'Account Info', icon: <NavigateNextRoundedIcon style={{ color: green[500] }} />}
];

const secondaryMenu = [
    { key: 'Pricing', text: 'Pricing', icon: <SyncRoundedIcon style={{ color: blue[500] }} />},
    { key: 'Initializiation', text: 'Initializiation', icon: <PowerSettingsNewRoundedIcon style={{ color: blue[500] }} />},
];

const useStyles = makeStyles(() => ({
    button: {
      width: '95%',
      background: 'white',
      border:'0px'
    },
  }));

export default function SideMenu() {
    const classes = useStyles();
    return (
        <div>
            <List>
                {menuItems.map((item) => (
                    <Link to={item.key}>
                        <button type='button' className={classes.button}>
                            <ListItem button key={item.key}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItem>
                        </button>
                    </Link>
                ))}
            </List>
            <Divider />
            <List>
                {secondaryMenu.map((item) => (
                    <Link to={item.key}>
                        <button type='button' className={classes.button}>
                            <ListItem button key={item.key}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItem>
                        </button>
                    </Link>
                ))}
            </List>
            <div className="border" />
        </div>
    );
}
