import slogan from '../Assets/slogan.png';

const Header = () => {
    return(
        <header>
            <img src={slogan} alt="what's your logo slogan"></img>
            <div className='wrapper'>
                <h1>What's your Slogan?</h1>
                <p>Starting a new store is a lot of work! Let us help you create a tagline that will help sell your products!</p>
            </div>
        </header>
    )
}

export default Header;