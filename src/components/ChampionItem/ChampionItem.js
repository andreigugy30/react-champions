import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: '20px auto',
        maxWidth: 500,
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    margin: {
        marginBottom: "15px"
    }
}));

const ChampionItem = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item>
                        <img className={classes.img} alt="complex" src={props.image_url} />
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1">
                                    <Button size="large" onClick={props.clicked}>
                                        {props.name}
                                    </Button>
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    ARMOR: {props.armor}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    ATTACK DAMAGE: {props.attackdamage}
                                </Typography>

                            </Grid>

                        </Grid>
                    </Grid>
                    <Grid container item xs={3} direction="column">
                        <Button variant="outlined" size="small" className={classes.margin} color="primary">
                            Add
                                </Button>
                        <Button variant="outlined" size="small" className={classes.margin} color="secondary">
                            Delete
                                </Button>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}

export default ChampionItem;