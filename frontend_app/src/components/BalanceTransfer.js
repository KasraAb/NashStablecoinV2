/* global BigInt */

import React, {useState } from 'react';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {grey } from '@material-ui/core/colors';
import MuiAlert from '@material-ui/lab/Alert';
import { cryptography, transactions } from "@liskhq/lisk-client";
import { getClient} from '../api';
import {Grid, TextField, CssBaseline, Button, Container, Paper} from '@material-ui/core';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Footer() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      <Link style={{ color: grey[500] }} href="/">
      </Link>
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: 'rgb(37 35 35 / 87%)',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function BalanceTransfer() {

  const classes = useStyles();
  const [open, setOpen ] = useState(false);

  const [data, setData] = useState({
    recipient: '',
    amount: '',
    passphrase:'',
    type:'',
    transaction: {},
    response: {},
  });

const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleChange = (event) => {

    event.persist();
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSend = async (event) => {

    event.preventDefault();


    if(data.type == 'nash' || data.type == "lsk"){

    const client = await getClient();
    const tx = await client.transaction.create({
        moduleID: 4021,
        assetID: 200,
        fee: BigInt(transactions.convertLSKToBeddows("0.01")),
        asset: {
          amount: (data.type == 'nash') ? BigInt(data.amount):BigInt(transactions.convertLSKToBeddows(data.amount)),
          recipient: cryptography.getAddressFromBase32Address(data.recipient),
          type: data.type,
        },
    }, data.passphrase);

   let res = '';

    try {
      res = await client.transaction.send(tx);
    } catch (error) {
      res = error;
    }

    setData({
      transaction: client.transaction.toJSON(tx),
      response: res,
      hello: '',
      fee: '',
      passphrase: '',
    });

    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Balance Transfer
        </Typography>
        <form className={classes.form} noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="recipient"
                label="recipient"
                id="recipient"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="amount"
                label="amount"
                id="amount"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="passphrase"
                label="passphrase"
                id="passphrase"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
            
            <select 
              required
              fullWidth
              onChange= {handleChange}
              value={data.type}
              name="type" 
              id="type"
            >
               <option value="">LKS or NASH</option>
              <option value="lsk">LSK</option>
              <option value="nash">NASH</option>

            </select>

            </Grid>

          <Button
            onClick={handleSend}
            fullWidth
            variant="contained"
            color="primary"
          >
            Send
          </Button>
          </Grid>
        </form>

            <div>
                <pre> Transaction ID: {data.response.transactionId}</pre>
            </div>

      </div>
      <Box mt={5}>
        <Footer />
      </Box>
    </Container>
  );
}
