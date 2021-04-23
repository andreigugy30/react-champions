import React, { useEffect, useState } from 'react';
import token from "../../token";
import { makeStyles } from '@material-ui/core/styles';
import "../ChampionDetails/ChampionDetail.css";

const ChampionDetails = (props) => {
    const [loadedChampionDetails, setLoadedChampionDetails] = useState(null);

    const useStyles = makeStyles((theme) => ({
        paper: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '1px solid red',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }));
    const classes = useStyles();

    useEffect(() => {
        const apiUrl = `https://api.pandascore.co/lol/champions/${props.id}?token=${token}`;
        if (props.id) {
            if (!loadedChampionDetails || (loadedChampionDetails && loadedChampionDetails.id !== props.id)) {
                fetch(apiUrl)
                    .then((response) => response.json())
                    .then((champion) => {
                        setLoadedChampionDetails(champion)
                    })
            }
        }
    }, [setLoadedChampionDetails, loadedChampionDetails, props.id])

    let championDetails;

    if (loadedChampionDetails) {
        championDetails = (
            <div className={classes.paper}>
                <h3>Champion {loadedChampionDetails.name}</h3>
                <p>Armor: {loadedChampionDetails.armor}</p>
                <p>Attack Damage: {loadedChampionDetails.attackdamage}</p>
                <p>HP: {loadedChampionDetails.hp}</p>
                <p>Move Speed: {loadedChampionDetails.movespeed}</p>
                <p>Spell Block: {loadedChampionDetails.spellblock}</p>
            </div>
        )
    }

    return <div className="modal">{championDetails}</div>
}

export default ChampionDetails;