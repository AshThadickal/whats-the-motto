import { useState } from 'react';
import ErrorPopup from './ErrorPopup';

const UserInput = (props) => {

    const [userInput, setUserInput] = useState('');
    const [promptError, setPromptError] = useState(false);
    const [networkError, setNetworkError] = useState(false);

    // Function to store the user input in state
    const handleInput = (event) => {
        setUserInput(event.target.value);
    }
 
    // Function to set error or to call the API function
    const handleSubmit = (event) => {
        event.preventDefault();
        if(userInput.length === 0) {
            setPromptError(true)
        } else {
            apiSearch(userInput);
        }
    }

    const apiSearch = (userQuery) => {
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
                console.log(error)
                if(error) {
                    setNetworkError(true);
                }
            })
            .then(jsonRes => {
                props.resultsArray({
                    userSearch: userQuery,
                    theSlogan: jsonRes.choices[0].text
                })
            })
    }
   
    return(
        <main>
            <section className='userInput wrapper'>
                <h2 id='howTo'>How to Use</h2>
                <p>Enter some information about your store below and click the search button. A list will appear with some suggested slogans! Feel free to mull them over - the results will be here when you come back. You can also remove any you do not like.</p>

                <form onSubmit={handleSubmit}>
                    <label className='sr-only'htmlFor='userInput'>Enter your store info here:</label>
                    <textarea onChange={handleInput} id='userInput' value={userInput} placeholder='i.e. a sneaker store that only sells Air Jordans' rows={5}></textarea>
                    <button className='searchButton' type='submit'>Search</button>
                </form>
            </section>

            {/* Error popup */}
            <section className='errors wrapper'>
                <ErrorPopup promptError={promptError} setPromptError={setPromptError} networkError={networkError} setNetworkError={setNetworkError} />
            </section>
        </main>
    )

}

export default UserInput;