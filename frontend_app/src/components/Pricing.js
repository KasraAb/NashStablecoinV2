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
import {transactions, cryptography } from "@liskhq/lisk-client";
import {fetchNashSupply, getClient, fetchShareSupply,fetchActiveBonds, fetchHolders} from "../api"
import accounts from '../accounts.json';



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

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


/////////////////////////////////////////////////////Contraction/////////////////////////////////////////////////////

async function ContranctSupply( price, delta) {

  const buffer = await fetchNashSupply()
  const total_supply = buffer.supply;
  const new_bond_supply = Math.ceil(delta*total_supply/10);
  const new_price = Math.floor(0.8*price*10);

  var i;
  for(i = 0; i < new_bond_supply; i++){

      var client = await getClient();
      const tx = await client.transaction.create({
          moduleID: 4021,
          assetID: 205,
          fee: BigInt(transactions.convertLSKToBeddows("0.01")),
          asset: {
            price: new_price,
            nonce: i
          },
      }, accounts.genesis.passphrase);

      let res = await client.transaction.send(tx);
        
      //console.log(res);      

      await sleep(10000);
      
  }
}

/////////////////////////////////////////////////////Expansion/////////////////////////////////////////////////////

async function ExpandSupply(delta) {

  let buffer = await fetchActiveBonds();
  var BondsList = buffer.bonds;
  buffer = await fetchNashSupply();
  const total_supply = buffer.supply;
  const new_nash_supply = Math.ceil(delta*total_supply);
  const new_bond2nash = Math.floor(0.8*new_nash_supply/10);
  buffer = await fetchShareSupply();
  const shareSupply = buffer.supply;
  const nashPerNDS = Math.floor(0.2*new_nash_supply/shareSupply);

  //console.log(BondsList);
  //console.log(total_supply);
  //console.log(new_nash_supply);
  //console.log(new_bond2nash);
  //console.log(shareSupply);
  //console.log(nashPerNDS);
 
  var i;
  
  for( i=0; i < BondsList.length ; i++){

    var bond = BondsList.shift();

    var client = await getClient();
    const tx = await client.transaction.create({
        moduleID: 4021,
        assetID: 207,
        fee: BigInt(transactions.convertLSKToBeddows("0.01")),
        asset: {
          bondId: bond.id
        },
    }, accounts.genesis.passphrase);

    let res = await client.transaction.send(tx);
      
    await sleep(10000);
  }

  buffer = await fetchHolders();
  const list = buffer.list;

  var i;
  for(i=0; i< list.length; i++){

      var c = await getClient();
      const tx = await c.transaction.create({
          moduleID: 4021,
          assetID: 206,
          fee: BigInt(transactions.convertLSKToBeddows("0.01")),
          asset: {
            amount: nashPerNDS,
            recipient: cryptography.getAddressFromBase32Address(list[i])
          },
      }, accounts.genesis.passphrase);
      let res = await c.transaction.send(tx);
      await sleep(10000);
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export default function Pricing() {

  const classes = useStyles();
  const [open, setOpen ] = useState(false);

  const [data, setData] = useState({
    price:'',
    status:'',
  });

  const handleChange = (event) => {

    event.persist();
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleSend = async (event) => {
  
    const price = data.price;

    if(Number(price) <= 1 && Number(price) >= 0.9){

        const delta = (1 - Number(price));
        await ContranctSupply(price,delta);
        setData({
          status: "successful",
    
      });
        
    }

    else if(Number(price) >= 1 && Number(price) <= 1.1){
            
        const delta = (Number(price) - 1);
        await ExpandSupply(delta);
        setData({
          status: "successful",
    
      });
    }


  };
  
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Pricing
        </Typography>
        <form className={classes.form} noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="price"
                label="price( [0.9,1.1] )"
                id="price"
                onChange={handleChange}
              />
            </Grid>
          <Button
            onClick={handleSend}
            fullWidth
            variant="contained"
            color="primary"
          >
            Pricing
          </Button>
          </Grid>
      </form>

        <div>
            <pre> Response(takes a few seconds): {data.status}</pre>
        </div>

        </div>
      <Box mt={5}>
        <Footer />
      </Box>
    </Container>
  );
}