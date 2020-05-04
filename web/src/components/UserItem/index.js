import React from 'react';

import './styles.css';

function UserItem({ user }) {
    return(
      <div className='test'>
        <li className='dev-item'>
            <header>
              <img src={user.avatar_url} alt={user.name}/>
              <div className='user-info'>
                <strong>{user.name}</strong>
                <span>{user.techs.join(', ')}</span>
              </div>
            </header>
            <p>{user.bio}</p>
            <a href={`https://github.com/${user.github_username}`}>Enter To Github</a>
            
          </li>
          </div>
    )
}

export default UserItem;