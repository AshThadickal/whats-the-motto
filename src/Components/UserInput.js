const UserInput = () => {
    const search = () => {
        const data = {
            prompt: 'Give me a slogan for a shoe store that sells Jordans only',
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
                Authorization: 'Bearer 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'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
        .then(jsonRes => {
            console.log(jsonRes)
        })

    }

    search()

}

export default UserInput;