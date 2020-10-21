import React, { useEffect, useState } from 'react';
import './App.css';


function App() {
  const [jokes, setJokes] = useState([]);
  const [jokesToShow, setJokesToShow] = useState([]);
  const [numberResult, setNumberResult] = useState([]);
  const [firstName,setFirstname] = useState('Chuck');
  const [lastName,setLastname] = useState('Norris');

  useEffect(() => {
    fetchAndSetJokes()
  }, []);

  const  fetchAndSetJokes = () => {
    fetch(`https://api.icndb.com/jokes?firstName=${firstName}&lastName=${lastName}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setJokes(res.value);
        setJokesToShow(res.value.slice(0,numberResult));
      })
      .catch((err) => console.log(err));
  };


  const changeName = (e) =>{
    e.preventDefault();
      if(firstName === ''|| lastName === '') return
      fetchAndSetJokes()
  }

  return (
    <div className="App">
      <div class = "navbar"><h1>Chuck Norris</h1></div>
      <form onSubmit = {changeName} noValidates>
        <div class = "cards">
        
        <div class="field">
          <label class="label">Number of Result</label>
            <div class="control">
              <div class ="n">
              <input class="input" type="text" placeholder="Number" onChange = {e => setNumberResult(e.target.value)}/>
              </div>
            </div>
          </div>

        <div class="field">
          <label class="label">Firstname</label>
            <div class="control">
              <input class="input" type="text" placeholder="Firstname" onChange = {e => setFirstname(e.target.value)}/>
            </div>
          </div>

        <div class="field">
          <label class="label">Lastname</label>
            <div class="control">
              <input class="input" type="text" placeholder="Lastname" onChange = {e => setLastname(e.target.value)}/>
            </div>
        </div>
        
        <div class="buttons">
          <button class="button is-primary" type="submit">Submit</button>
        </div>
        </div>
       
    </form>
      <div class = "card-content" key = {jokes.id}>
        {jokesToShow.map(joke => (
          <div class= "card">{joke.joke}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
