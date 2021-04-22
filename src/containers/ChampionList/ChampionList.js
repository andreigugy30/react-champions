import React, { useEffect, useState } from 'react';
import ChampionItem from '../../components/ChampionItem/ChampionItem';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';


const token = "a28vgv0BfswlbW1U6eSd0r727kw_tdNgkm_OneV5PNpddA_d4KQ";

const ChampionList = () => {

    const [champions, setChampions] = useState({ champions: [] });

    useEffect(() => {
        const apiUrl = `https://api.pandascore.co/lol/champions?token=${token}`;
        fetch(apiUrl)
            .then((response) => response.json())
            .then((champions) => {
                //console.log(champions);
                setChampions({ champions: champions })
            })
    }, [setChampions])

    return (
        <ChampionItem key={champions.id} champions={champions.champions} />
    )
}

export default ChampionList;