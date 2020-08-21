import React from 'react';
import Card from '../card/Card';
import Loader from '../Loader';
import styles from './home.module.css';
import { connect } from 'react-redux';

import { nextCharAction, addToFavoritesAction } from '../../redux/charsDuck';

const Home = ({ char, fetching, nextChar, addToFavorites }) => {
    return (
        <div className={styles.container}>
            <h2>Personajes de Rick y Morty</h2>
            <div>
                {fetching ? (
                    <Loader />
                ) : (
                    <Card
                        leftClick={nextChar}
                        rightClick={addToFavorites}
                        {...char}
                    />
                )}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    char: state.chars.array[0],
    fetching: state.chars.fetching,
});

export default connect(mapStateToProps, {
    nextChar: nextCharAction,
    addToFavorites: addToFavoritesAction,
})(Home);
