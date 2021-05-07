/* global BigInt */

import React, {useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {grey } from '@material-ui/core/colors';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { transactions, cryptography } from "@liskhq/lisk-client";
import { getClient,fetchBonds } from '../api';




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



export default function PurchaseBond() {

  const classes = useStyles();
  const [open, setOpen ] = useState(false);

  const [data, setData] = useState({
    bondId: 0,
    passphrase:'',
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

    const client = await getClient();
    const tx = await client.transaction.create({
        moduleID: 4021,
        assetID: 203,
        fee: BigInt(transactions.convertLSKToBeddows("0.01")),
        asset: {
          bondId: Number(data.bondId),
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
    });

    //console.log(await fetchBonds());



  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
        Purchase Bond
        </Typography>
        <form className={classes.form} noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="bondId"
                label="bondId"
                id="bondId"
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
          <Button
            onClick={handleSend}
            fullWidth
            variant="contained"
            color="primary"
          >
            Buy
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
