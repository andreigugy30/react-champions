import React, { useEffect, useState } from 'react';
import ChampionItem from '../../components/ChampionItem/ChampionItem';

import ChampionDetails from '../../components/ChampionDetails/ChampionDetails';
import Modal from '@material-ui/core/Modal';
import token from "../../token";
import "../ChampionList/ChampionList.css"

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
                console.log(champions);
                setChampions({ champions: champions })
                setIsLoading(false);
            })
    }, [setChampions])

    const championSelectedHandler = (id) => {
        console.log(id)
        setOpen(true)
        setSelectedChampionId(id)
    }

    const handleClose = () => {
        setOpen(false);
    };

    const championsList = champions.champions !== undefined ? champions.champions.map((champion, key) => {

        return <ChampionItem
            key={champion.id}
            name={champion.name}
            image_url={champion.image_url}
            armor={champion.armor}
            attackdamage={champion.attackdamage}
            clicked={() => championSelectedHandler(champion.id)}
        />
    }) : null

    return (
        <>
            <Modal open={open} onClose={handleClose}>
                <ChampionDetails id={selectedChampionId} name={champions.name} />
            </Modal>
            {!isLoading && championsList}
            {isLoading && <div className="spinner">
                <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>}
        </>
    )
}

export default ChampionList;