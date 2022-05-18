import { useState } from 'react';
import ErrorPopup from './ErrorPopup';

const UserInput = (props) => {

    const [userInput, setUserInput] = useState('');
    // const [searchTerm, setSearchTerm] = useState('')
    const [promptError, setPromptError] = useState(false);
    // const [alphaError, setAlphaError] = useState(false);
    const [networkError, setNetworkError] = useState(false);

    const handleInput = (event) => {
        setUserInput(event.target.value);
    }
 
    const handleSubmit = (event) => {
        event.preventDefault();
        // setSearchTerm(userInput);
        if(userInput.length === 0) {
            setPromptError(true)
        } else {
            search(userInput);
        }
    }

    const search = (userQuery) => {
        const data = {
            prompt: `Provide a slogan for ${userQuery}`,
            temperature: 0.5,
            max_tokens: 64,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        };

        fetch('https://api.openai.com/v1/engines/text-curie-001/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.REACT_APP_OPENAI_SECRET}`
            },
            body: JSON.stringify(data)
        })
            .then(res => {
                if(res.statusText === 'OK') {
                    return res.json()
                } else {
                    throw new Error();
                }
            }).catch(error => {
                setNetworkError(true);
            })
            // .then(res => res.json())
            .then(jsonRes => {
                props.resultsArray({
                    userSearch: userQuery,
                    theMotto: jsonRes.choices[0].text
                })
            })
    }

    return(
        <main>
            <section className='userInput wrapper'>
                <h2>How to Use</h2>
                <p>Enter some information about your store below and click the search button. A list will appear with some suggested slogans! Feel free to mull them over - the results will be here when you come back. You can also remove any you do not like.</p>

                <form onSubmit={handleSubmit}>
                    <label className='sr-only'htmlFor="userInput">Store Info Here:</label>
                    <textarea onChange={handleInput} id='userInput' value={userInput} placeholder='i.e. a sneaker store that only sells Air Jordans' rows={5}></textarea>
                    <button className='searchButton'>Search</button>
                </form>
            </section>

            <section className='errors wrapper'>
                <ErrorPopup promptError={promptError} setPromptError={setPromptError} networkError={networkError} setNetworkError={setNetworkError} />
            </section>
        </main>
    )

}

export default UserInput;