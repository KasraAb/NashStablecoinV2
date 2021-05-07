/* global BigInt */

import React, {useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import {grey } from '@material-ui/core/colors';
import MuiAlert from '@material-ui/lab/Alert';
import { fetchBonds } from '../api';




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



export default function BondMarket() {

  const classes = useStyles();
  const [open, setOpen ] = useState(false);

  const [data, setData] = useState({
        actives: [],
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

    let buffer = await fetchBonds();
    const bonds = buffer.bonds.filter( item => item.status == "not sold");
    let list = [];
    var i;

    for (i = 0; i < bonds.length; i++) {
        list.push({id: bonds[i].id, price:bonds[i].price});
    }
    
    setData({
        actives: list,

    });



  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
        Bond Market
        </Typography>
        <form className={classes.form} noValidate autoComplete="off">
          <Grid container spacing={2}>
          <Button
            onClick={handleSend}
            fullWidth
            variant="contained"
            color="primary"
          >
            Get Bonds
          </Button>
          </Grid>
          <Grid item xl={'auto'}>
          <Paper>
          <h3>Unsold Bonds:</h3>
          <b>{JSON.stringify(data.actives)}</b>          
          </Paper>
      </Grid>
      <Box mt={5}>
        <Footer />
      </Box>
      </form>
      </div>
    </Container>
  );
}
