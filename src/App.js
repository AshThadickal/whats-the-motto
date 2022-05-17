import './App.css';
import Header from './Components/Header';
import UserInput from './Components/UserInput';
import DisplayResults from './Components/DisplayResults';
import Footer from './Components/Footer';
import { useState } from 'react';
import firebase from '../src/Components/firebase';
import { getDatabase, ref, push } from 'firebase/database';

function App() {

  // state to hold the results of the API call to be passed to the results component
  const [apiResults, setApiResults] = useState([])

  // function to call in UserInput and store data in apiResults
   const resultsArray = (data => {
    setApiResults([...apiResults, data])

    const database = getDatabase(firebase);
    const dbRef = ref(database);
    push(dbRef, data)
  })

  return (
    <div className="App">
      <Header />
      <UserInput resultsArray={resultsArray}/>
      <DisplayResults apiResults={apiResults}/>
      <Footer />
    </div>
  );
}

export default App;
