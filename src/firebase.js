import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: 'AIzaSyBo2wNZxge0JUWT1R5ktYG35emkvT7yigw',
    authDomain: 'cursoreactgraphql.firebaseapp.com',
    databaseURL: 'https://cursoreactgraphql.firebaseio.com',
    projectId: 'cursoreactgraphql',
    storageBucket: 'cursoreactgraphql.appspot.com',
    messagingSenderId: '940777115619',
    appId: '1:940777115619:web:ce283ebfece26cf2189ad6',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export function loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase
        .auth()
        .signInWithPopup(provider)
        .then(({ user }) => user);
}

export function getLoggedUser() {
    return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                resolve(user);
            } else {
                reject('The user is not logged in');
            }
        });
    });
}

export function logout() {
    return firebase.auth().signOut();
}

const db = firebase.firestore().collection('favorites');

export function updateFavorites(array, uid) {
    db.doc(uid).set({ array });
}

export function getFavorites(uid) {
    return db
        .doc(uid)
        .get()
        .then((snap) => snap.data() ? snap.data().array : []);
}
