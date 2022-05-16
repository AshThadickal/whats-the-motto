const ErrorPopup = ({promptError, alphaError, networkError}) => {

    const noPrompt = (<p>Please enter a prompt and try again.</p>);
    const noAlpha = <p>Please try again! Can only contain letters a-z.</p>
    const noNetwork = <p>Sorry, there was an error with the Network. Please try again later.</p>

    console.log(promptError)

    return (
        <div className="errorPopup">
            {promptError && noPrompt}
            {alphaError && noAlpha}
            {networkError && noNetwork}
        </div>
    )
}

export default ErrorPopup