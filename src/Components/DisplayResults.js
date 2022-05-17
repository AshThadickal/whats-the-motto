// import { useState } from "react"
import firebase from "./firebase";
import { getDatabase, ref, onValue, remove, onDisconnect } from 'firebase/database';
import { useEffect, useState } from "react";

const DisplayResults = () => {
    const [returnedMotto, setReturnedMotto] = useState([]);

    const handleRemove = (mottoKey) => {
        const database = getDatabase(firebase);
        const dbRef = ref(database, `/${mottoKey}`);
        remove(dbRef);
        console.log(mottoKey)
    }

    useEffect(() => {
        const database = getDatabase(firebase);
        const dbRef = ref(database);
        onValue(dbRef, (response) => {
            const mottoList = [];
            const data = response.val();
            for(let key in data) {
                mottoList.push({key: key, userSearch: data[key].userSearch, theMotto: data[key].theMotto})
            }
            setReturnedMotto(mottoList);
        })
        return () => {onDisconnect(dbRef)}
    }, [])

    return(
        <section className="allResults">
            {returnedMotto.slice(0).reverse().map((motto) => {
                return(
                    <div className="resultsContainer"key={motto.key}>
                        <div className="results">
                            <h3>{motto.userSearch}</h3>
                            <p>{motto.theMotto}</p>
                        </div>
                        <button onClick={() => {handleRemove(motto.key)}}>Remove from List</button>
                    </div>
                )
            })}
        </section>
    )
}

export default DisplayResults;