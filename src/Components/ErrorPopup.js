const ErrorPopup = ({promptError, alphaError, networkError, setPromptError, setNetworkError}) => {

    const noPrompt = <div className="errorPopupInner">
                        <p>Please enter a prompt and try again.</p>
                        <button className="closePopup" onClick={() => { setPromptError(false);}}>Close</button>
                    </div>;
    // const noAlpha = <p>Please try again! Can only contain letters a-z.</p>
    const noNetwork = <div className="errorPopupInner">
                        <p>Sorry, there was an error with the Network. Please try again later.</p>
                        <button className="closePopup" onClick={() => { setNetworkError(false); }}>Close</button>
                     </div>

    return (
        <div className="errorPopupOuter">
            {promptError && noPrompt}
            {networkError && noNetwork}     
        </div>
    )
}

export default ErrorPopup