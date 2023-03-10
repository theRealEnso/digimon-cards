import React from 'react';
import DigimonCard from '../Components/DigimonCard.js'
import SearchBox from '../Components/SearchBox.js';
import ScrollComponent from '../ScrollComponent.js';
import Footer from '../Components/Footer.js'
import './App.css';

function App () {
    const [searchDigimonsField, setSearchDigimonsField] = React.useState('');
    const [digimonsArray, setDigimonsArray] = React.useState([]);
    const [filteredDigimons, setFilteredDigimons] = React.useState(digimonsArray);

    React.useEffect(() => {
        async function fetchDigimons(){
            try {
                const response = await fetch('https://digimon-api.vercel.app/api/digimon');
                const digimonData = await response.json();
                setDigimonsArray(digimonData);
            } catch (error) {
                console.log(`Woops! Looks like there was an error: ${error}`)
            }
        }
        fetchDigimons();
    }, []);

    React.useEffect(() => {
        const newFilteredDigimons = digimonsArray.filter((digimon, i) => {
            return digimon.name.toLowerCase().includes(searchDigimonsField.toLowerCase()) || digimon.level.toLowerCase().includes(searchDigimonsField.toLowerCase());
        });
        setFilteredDigimons(newFilteredDigimons);
        console.log(newFilteredDigimons);
    }, [digimonsArray, searchDigimonsField]); // only filter through digimonsArray whenever digimonsArray or searchDigimonsField changes

    const onSearchChange = (event) => {
        const {value} = event.target;
        setSearchDigimonsField(value);
    };

    return (
        <div>
            <h1>Digimon Cards</h1>
            {
                digimonsArray.length === 0 &&
                <h1>LOADING DIGIMONS...</h1>
            }
            <SearchBox searchChange={onSearchChange} />
            <ScrollComponent>
                {
                    filteredDigimons.map((digimon, i) => (<DigimonCard key={i} id={i} name={digimon.name} img={digimon.img} level={digimon.level} />))
                }
            </ScrollComponent>
            <Footer />
        </div>

    );
};

export default App;