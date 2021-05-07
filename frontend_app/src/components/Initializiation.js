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
import MuiAlert from '@material-ui/lab/Alert';
import { getClient} from '../api';
import { transactions} from "@liskhq/lisk-client";


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



export default function Initialization() {

  const classes = useStyles();
  const [open, setOpen ] = useState(false);

  const [data, setData] = useState({
    passphrase:"",
    response:{},
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

      const client = await getClient();
      const tx = await client.transaction.create({
          moduleID: 4021,
          assetID: 204,
          fee: BigInt(transactions.convertLSKToBeddows("0.01")),
          asset: {
              data:"salam",
          },
      }, data.passphrase);

      let res = '';
      try {
        res = await client.transaction.send(tx);
      } catch (error) {
        res = error;
      }

    setData({
      passphrase:"",
      response: res,
    })

  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Initialization
        </Typography>
        <form className={classes.form} noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="passphrase"
                label="genesis passphrase"
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
            Initialize
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
