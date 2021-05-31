import React, { useEffect, useState } from 'react';
import ChampionItem from '../../components/ChampionItem/ChampionItem';

import ChampionDetails from '../../components/ChampionDetails/ChampionDetails';
import Modal from '@material-ui/core/Modal';
import token from "../../token";
import "../ChampionList/ChampionList.css"
import { Button, Container, Grid } from '@material-ui/core';

const ChampionList = () => {

    const [champions, setChampions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedChampionId, setSelectedChampionId] = useState(null);
    const [open, setOpen] = useState(false);
    const { items, requestSort, sortConfiguration } = useSortableData(champions);

    useEffect(() => {
        const apiUrl = `https://api.pandascore.co/lol/champions?token=${token}`;
        setIsLoading(true)
        fetch(apiUrl)
            .then((response) => response.json())
            .then((champions) => {
                setChampions(champions)
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

    const championsList = items !== undefined ? items.map((champion, key) => {
        return (
            <Grid item xs={12} md={6} lg={4} key={key}>
                <ChampionItem
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
                <Container style={{ marginTop: "20px" }}>
                    <Button
                        variant="contained" color="primary"
                        onClick={() => requestSort('name')}
                    >
                        {sortConfiguration?.direction === 'DESC' ? "ASCENDING" : "DESCENDING"}
                    </Button>
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

const useSortableData = (items, config = null) => {
    const [sortConfiguration, setSortConfig] = useState(config);

    const sortedItems = React.useMemo(() => {
        let sortableItems = [...items];
        if (sortableItems !== undefined && sortConfiguration !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfiguration.key] < b[sortConfiguration.key]) {
                    return sortConfiguration.direction === 'ASC' ? -1 : 1;
                }
                if (a[sortConfiguration.key] > b[sortConfiguration.key]) {
                    return sortConfiguration.direction === 'ASC' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [items, sortConfiguration]);

    const requestSort = (key) => {
        let direction = 'ASC';
        if (
            sortConfiguration &&
            sortConfiguration.key === key &&
            sortConfiguration.direction === 'ASC'
        ) {
            direction = 'DESC';
        }
        setSortConfig({ key, direction });
    };

    return { items: sortedItems, requestSort, sortConfiguration };
};

export default ChampionList;