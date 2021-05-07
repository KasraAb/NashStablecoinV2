import React from 'react';
import Typography from '@material-ui/core/Typography';

const description = `
This is a PoC version of Nash, an algorithmic stablecoin, implemented by Lisk SDK`

export default function Home() {
    return (
        <div>
            <h1 align='left'>Nash Stablecoin</h1>
            <Typography align='left'>
                {description}
            </Typography>
        </div>
    );
}