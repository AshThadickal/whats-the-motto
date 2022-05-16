import { useState } from 'react';
import ErrorPopup from './ErrorPopup';

const UserInput = (props) => {

    const [userInput, setUserInput] = useState('');
    // const [searchTerm, setSearchTerm] = useState('')
    const [promptError, setPromptError] = useState(false);
    const [alphaError, setAlphaError] = useState(false);
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

    console.log(promptError)

    const search = (userQuery) => {
        const data = {
            prompt: `Provide a motto for ${userQuery}`,
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
            .then(res => res.json())
            .then(jsonRes => {
                props.resultsArray({
                    userSearch: userQuery,
                    theMotto: jsonRes.choices[0].text
                })
            })
    }

    return(
        <main>
            <section className='userInput'>
                <h2>How to Use</h2>
                <p>Enter information about the shop you are opening and hit submit!</p>
                <p>Looking for guidance? How about a bubblegum store that sells the classics.</p>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="userInput">Please enter your search:</label>
                    <input onChange={handleInput} type='text' id='userInput' value={userInput}></input>
                    <button className='searchButton'>Search</button>
                </form>
            </section>

            <section className='errors'>
                <ErrorPopup promptError={promptError} alphaError={alphaError} networkError={networkError} />
            </section>
        </main>
    )

}

export default UserInput;