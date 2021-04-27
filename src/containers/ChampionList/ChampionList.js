import React, { useEffect, useState } from 'react';
import ChampionItem from '../../components/ChampionItem/ChampionItem';

import ChampionDetails from '../../components/ChampionDetails/ChampionDetails';
import Modal from '@material-ui/core/Modal';
import token from "../../token";
import "../ChampionList/ChampionList.css"
import { Container, Grid } from '@material-ui/core';

const ChampionList = () => {

    const [champions, setChampions] = useState({ champions: [] });
    const [isLoading, setIsLoading] = useState(false);
    const [selectedChampionId, setSelectedChampionId] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const apiUrl = `https://api.pandascore.co/lol/champions?token=${token}`;
        setIsLoading(true)
        fetch(apiUrl)
            .then((response) => response.json())
            .then((champions) => {
                setChampions({ champions: champions })
                setIsLoading(false);
            })
    }, [setChampions])

    const championSelectedHandler = (id) => {
        setOpen(true)
        setSelectedChampionId(id)
    }

    const handleClose = () => {
        setOpen(false);
    };

    const championsList = champions.champions !== undefined ? champions.champions.map((champion, key) => {
        return (
            <Grid item xs={12} md={6} lg={4} >
                <ChampionItem
                    key={champion.id}
                    name={champion.name}
                    image_url={champion.image_url}
                    armor={champion.armor}
                    attackdamage={champion.attackdamage}
                    clicked={() => championSelectedHandler(champion.id)}
                />
            </Grid>
        )
    }) : null

    return (
        <>
            <Modal open={open} onClose={handleClose}>
                <ChampionDetails id={selectedChampionId} />
            </Modal>
            {!isLoading &&
                <Container>
                    <Grid container spacing={2}>
                        {championsList}
                    </Grid>
                </Container>
            }
            {isLoading && <div className="spinner">
                <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>}
        </>
    )
}

export default ChampionList;