import React, {
  useEffect,
	useState
} from 'react';
import {
	Grid,
	CssBaseline,
	Container,
} from '@material-ui/core';
import {
	makeStyles
} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { passphrase, cryptography } from "@liskhq/lisk-client";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,
  },
}));


export default function CreateAccount(props) {

  const classes = useStyles();

  /*
  const [data, setData] = useState({ passphrase: "", address: ""});
  const classes = useStyles();

  useEffect(() => {
    const pw = passphrase.Mnemonic.generateMnemonic();
    const address = cryptography.getBase32AddressFromPassphrase(pw).toString("hex");
    setData({ passphrase: pw, address });
  }, [props.open]);

  */

  return (
    <Container component="main" className={classes.paper}>
      <CssBaseline />
      <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
          <h3>Genesis</h3>
          <p> Address: {"lskdxc4ta5j43jp9ro3f8zqbxta9fn6jwzjucw7yt"}</p>
          
          <p> passphrase: {"peanut hundred pen hawk invite exclude brain chunk gadget wait wrong ready"}</p>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper className={classes.paper}>
          <h3>Account1</h3>
          <p> Address: {"lsk32gnhxjs887bqmgoz6y6ozh6c4c6ztpz7wjfa9"}</p>
          <p> passphrase: {"mushroom edit regular pencil ten casino wine north vague bachelor swim piece"}</p>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper className={classes.paper}>
          <h3>Account2</h3>
          <p> Address: {"lskb6bufqcbrwvgkzuu5wqu6wnruz7awvhxwfkonb"}</p>
          <p> passphrase: {"thought talk cherry write armed valve salute fabric auction maid join rebuild"}</p>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper className={classes.paper}>
          <h3>Account3</h3>
          <p> Address: {"lskomdmvwhb9r3sgj3ryp4fsqnzfn8c8twzkecugt"}</p>
          <p> passphrase: {"exist night more net diesel exact will purse orbit vacuum birth wide"}</p>
          </Paper>
        </Grid>


      </Grid>
    </div>
    </Container>
  );
}