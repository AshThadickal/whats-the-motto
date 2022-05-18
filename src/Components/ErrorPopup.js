const ErrorPopup = ({promptError, networkError, setPromptError, setNetworkError}) => {
    
    // variables to hold the divs to be conditionally rendered dependant on the error
    const noPrompt = <div className="errorPopupOuter">
                        <div className="errorPopupInner">
                            <p>Please enter a prompt and try again.</p>
                            <button className="closePopup" onClick={() => { setPromptError(false); }}>Close</button>
                        </div>
                    </div>;
    
    const noNetwork = <div className="errorPopupOuter">
                        <div className="errorPopupInner">
                            <p>Sorry, there was an error with the Network.</p> 
                            <p>Please try again later.</p>
                            <button className="closePopup" onClick={() => { setNetworkError(false); }}>Close</button>
                        </div>
                    </div>;
    
    
    
    
    

    return (
        <>
            {promptError && noPrompt}
            {networkError && noNetwork}     
        </>
    )
}

export default ErrorPopup