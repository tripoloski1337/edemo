import React from 'react';
import { useHistory } from 'react-router-dom';
import './index.css';

export default function Navbar({ vote, home }) {
  const history = useHistory();

  const homeActive = home === "active" ? home : null;
  const voteActive = vote === "active" ? vote : null;

  return (
    <div className="navbar">
      <div className="brand">
        <img src="./imgs/voting.svg" width="4%" className="icon" alt="" />
        <h1>we-Vote</h1>
      </div>
      <div className="nav-item">
        <ul>
          {/* <li className={`${homeActive}`} onClick={() => history.push('/')}>Beranda</li>
          <li className={`${voteActive}`} onClick={() => history.push('/vote')}>Voting</li> */}
        </ul>
      </div>
    </div>
  )
}
