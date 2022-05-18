import { useEffect, useState } from "react";
import firebase from "./firebase";
import { getDatabase, ref, onValue, remove, onDisconnect } from 'firebase/database';

const DisplayResults = () => {
    const [returnedSlogan, setReturnedSlogan] = useState([]);

    // Function to remove slogan
    const handleRemove = (sloganKey) => {
        const database = getDatabase(firebase);
        const dbRef = ref(database, `/${sloganKey}`);
        remove(dbRef);
    }

    // useEffect to get results from firebase and display to the page
    useEffect(() => {
        const database = getDatabase(firebase);
        const dbRef = ref(database);
        onValue(dbRef, (response) => {
            const sloganList = [];
            const data = response.val();
            for(let key in data) {
                sloganList.push({key: key, userSearch: data[key].userSearch, theSlogan: data[key].theSlogan})
            }
            setReturnedSlogan(sloganList);
        })
        return () => {onDisconnect(dbRef)}
    }, [])

    return(
        <section className="allResults wrapper">
            <h3>New Slogan Options!</h3>
            {returnedSlogan.slice(0).reverse().map((slogan) => {
                return(
                    <div className="resultsContainer" key={slogan.key}>
                        <div className="results">
                            <p><span className='bold'>Store Info:</span> {slogan.userSearch}</p>
                            <p>{slogan.theSlogan}</p>
                        </div>
                        <button onClick={() => {handleRemove(slogan.key)}}>Remove from List</button>
                    </div>
                )
            })}
        </section>
    )
}

export default DisplayResults;