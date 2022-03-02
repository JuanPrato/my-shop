import firebase from 'firebase/app';
import { useEffect } from 'react';

export default function useFirebaseAuth() {

    useEffect(() => {
        console.log(firebase);
    }, []);

    console.log({app: firebase.app()});

    return firebase.auth();

}