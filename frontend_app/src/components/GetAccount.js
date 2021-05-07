/* global BigInt */

import React, { useState } from 'react';
import {Grid, TextField, CssBaseline, Button, Container, Paper} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import { fetchAccountInfo } from '../api';
import { cryptography } from '@liskhq/lisk-client';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'inline-block',
    alignContent: 'center',
    marginTop: theme.spacing(3),
    width: '80%'
  },
  form: {
    width: '80%',
    marginTop: theme.spacing(3),
    display: 'inline-block'
  },
  root: {
    backgroundColor: grey[200],
    flexGrow: 1
  }
}));

export default function GetAccount() {
  const classes = useStyles();

  const [data, setData] = useState({
    accountAddress: '',
    enableText: 'none',
    result: {
        token: {
          balance: '0',
        },
        nashStablecoin: {
          nash: {
            balance: 0,
          },
          bonds:{
            list:[],
          },
          share: {
            balance: 0,
            lastNonce: 0,
          },
        }
    },
    severity: 'success',
  });

  const handleChange = (event) => {
    event.persist();
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSend = async (event) => {
    event.preventDefault();
    try {
        const result = await fetchAccountInfo(cryptography.getAddressFromBase32Address(data.accountAddress).toString("hex"));
        
        if (result.error) {
            setData({ severity: 'error', result: result.error, enableText: '' });
        } else {
            setData({ severity: 'success', result, enableText: ''  });
        }

    } catch (error) {
      console.log(error)
    }

    console.log(data.result.nashStablecoin.bonds.list)
  };

  return (
    <div>
      <div className={classes.paper} id="wrapper">
        <form className={classes.form} noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="accountAddress"
                label="accountAddress"
                id="accountAddress"
                onChange={handleChange}
              />
            </Grid>
          <Button
            onClick={handleSend}
            fullWidth
            variant="contained"
            color="primary"
          >
            Get Account
          </Button>
          </Grid>
        </form>
      <div style={{ display: data.enableText }}>
          <Container component="main" className={classes.paper}>
          <CssBaseline />
          <div className={classes.root}>
          <Grid>
          <Grid item xl={'auto'}>
              <Paper>
              <h3>Balance (LSK)</h3>
              <b>{data.result.token.balance/100000000}</b>
              </Paper>
            </Grid>
            </Grid>
            <Grid item xl={'auto'}>
              <Paper>
              <h3>Nash Properties</h3>
              <b>Owned Bonds IDs:</b>
              <br/>
              {JSON.stringify(data.result.nashStablecoin.bonds.list)}
              <br/>
              <b>Nash Balance:  </b><i>{data.result.nashStablecoin.nash.balance}<br/></i>
              <b>Share Balance: </b><i>{data.result.nashStablecoin.share.balance}<br/></i>
              <b>Last Nonce:  </b><i>{data.result.nashStablecoin.share.lastNonce}<br/></i>
              </Paper>
            </Grid>
            <Grid>
          </Grid>
        </div>
        </Container>
      </div>
      </div>
    </div>
  );
}
