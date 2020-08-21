import React, { useState, useEffect } from 'react';
import Card from '../card/Card';
import styles from './home.module.css';

import Loader from '../Loader';

import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo';

export default function GraphHome(props) {
    const [chars, setChars] = useState([]);

    const query = gql`
        {
            characters {
                results {
                    name
                    image
                }
            }
        }
    `;

    const { data, loading, error } = useQuery(query);

    useEffect(() => {
        if (data && !loading && !error) {
            setChars([...data.characters.results]);
        }
    }, [data, loading, error]);

    function nextCharacter() {
        setChars(chars.slice(1));
    }

    if (loading) return <Loader />;

    return (
        <div className={styles.container}>
            <h2>Personajes de Rick y Morty</h2>
            <div>
                <Card
                    leftClick={nextCharacter}
                    // rightClick={addToFavorites}
                    {...chars[0]}
                />
            </div>
        </div>
    );
}
