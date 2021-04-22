import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
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
    const { champions } = props;
    if (!champions || champions.length === 0) return <p>No champions, sorry</p>;

    return (
        <div className={classes.root}>
            {champions.map((champion, key) => {
                return (
                    <Paper className={classes.paper}>
                        <Grid container spacing={2}>
                            <Grid item>
                                <ButtonBase className={classes.image}>
                                    <img className={classes.img} alt="complex" src={champion.image_url} />
                                </ButtonBase>
                            </Grid>
                            <Grid item xs={12} sm container>
                                <Grid item xs container direction="column" spacing={2}>
                                    <Grid item xs>
                                        <Typography gutterBottom variant="subtitle1">
                                            {champion.name}
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            ARMOR: {champion.armor}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            ATTACK DAMAGE: {champion.attackdamage}
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
                );
            })}
        </div>
    )
}

export default ChampionItem;