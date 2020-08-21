import React from 'react';
import styles from './favs.module.css';
import Card from '../card/Card';
import Loader from '../Loader';
import { connect } from 'react-redux';

function FavPage({ favorites, fetching }) {

    function renderCharacter(char, i) {
        return <Card key={char.id} {...char} actions={false} />;
    }

    if (fetching) {
        return <Loader/>
    }

    return (
        <div className={styles.container}>
            <h2>Favoritos</h2>
            {favorites.map(renderCharacter)}
            {!favorites.length && <h3>No hay personajes agregados</h3>}
        </div>
    );
}

const mapStateToProps = ({ chars: { favorites, fetching } }) => {
    return { favorites, fetching };
};

export default connect(mapStateToProps)(FavPage);
