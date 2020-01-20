import React, { useState, useEffect} from 'react';

import './global.css'
import './App.css'
import './Sidebar.css'
import './Main.css'

function App() {

  const [github_username, setGithubUsername] = useState('');
  const [techs, setTechs] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      (err) =>{
        console.log(err);
      },
      {
        timeout: 30000,
      }
    )
  },[]);

async function handleAddUser(e){
  e.preventeDefault();
}

  return (
   <div id="app">
    <aside>
     <strong>Sign Up</strong>
     <form onSubmit={handleAddUser}>
       <div className='input-block'>
         <label htmlFor="github_username">Github User</label>
         <input 
          name="github_username" 
          id="github_username" required 
          value={github_username}
          onChange={e => setGithubUsername(e.target.value)}
          />
       </div>

       <div className='input-block'>
         <label htmlFor="techs">Technology</label>
         <input 
          name="techs" 
          id="techs" required 
          value={techs}
          onChange={e => setTechs(e.target.value)}
          />
       </div>

       <div className="input-group">
       <div className='input-block'>
         <label htmlFor="latitude">Latitude</label>
         <input 
            type='number' 
            name="latitude" 
            id="latitude" required 
            value={latitude} 
            onChange={e => setLatitude(e.target.value)}
          />
       </div>

       <div className='input-block'>
         <label htmlFor="longitude">Longitude</label>
         <input  
          type='number' 
          name="longitude" 
          id="longitude" required 
          value={longitude} 
          onChange={e => setLongitude(e.target.value)}
          />
       </div>

         </div>
         <button type='submit'>Enter</button>
     </form>
     </aside>
      <main>
        <ul>
          <li className='dev-item'>
            <header>
              <img src="https://avatars3.githubusercontent.com/u/43343496?s=460&v=4" alt="Daniel Simões"/>
              <div className='user-info'>
                <strong>Daniel Simões</strong>
                <span>NodeJs, ReactJs, React Native</span>
              </div>
            </header>
            <p>Developer in love which por NodeJS, ReactJS and React Native.</p>
            <a href="https://github.com/Daniel-Simoes">Enter To Github</a>
          </li>

          <li className='dev-item'>
            <header>
              <img src="https://avatars3.githubusercontent.com/u/43343496?s=460&v=4" alt="Daniel Simões"/>
              <div className='user-info'>
                <strong>Daniel Simões</strong>
                <span>NodeJs, ReactJs, React Native</span>
              </div>
            </header>
            <p>Developer in love which por NodeJS, ReactJS and React Native.</p>
            <a href="https://github.com/Daniel-Simoes">Enter To Github</a>
          </li>

          <li className='dev-item'>
            <header>
              <img src="https://avatars3.githubusercontent.com/u/43343496?s=460&v=4" alt="Daniel Simões"/>
              <div className='user-info'>
                <strong>Daniel Simões</strong>
                <span>NodeJs, ReactJs, React Native</span>
              </div>
            </header>
            <p>Developer in love which por NodeJS, ReactJS and React Native.</p>
            <a href="https://github.com/Daniel-Simoes">Enter To Github</a>
          </li>

          <li className='dev-item'>
            <header>
              <img src="https://avatars3.githubusercontent.com/u/43343496?s=460&v=4" alt="Daniel Simões"/>
              <div className='user-info'>
                <strong>Daniel Simões</strong>
                <span>NodeJs, ReactJs, React Native</span>
              </div>
            </header>
            <p>Developer in love which por NodeJS, ReactJS and React Native.</p>
            <a href="https://github.com/Daniel-Simoes">Enter To Github</a>
          </li>
        </ul>
      </main>
    </div>
  );
} 

export default App;
