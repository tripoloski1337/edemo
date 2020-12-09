import React, { useState } from 'react';
import Navbar from '../../components/navbar';
import './index.css';

export default function Vote({ location }) {
  const { payload } = location.state;
  const [nik, setNik] = useState();

  const handleVote = async (vote) => {
    let data = { nik: nik, voted: vote };
    const post = await fetch(`http://localhost:8000/vote/${payload._id}`, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded'
      },
      body : data
    });

    if (post.ok) {
      console.log('Success: ', post.json());
    } else {
      console.log('Error', post.json());
    }

    console.log(data)
  }

  console.log(payload._id)
  return (
    <div className="container">
      <Navbar vote="active" />
      <div className="content">
        {/* <h1>Daftar Vote Anda</h1> */}
        <div className="vote text-center">
          <img src="./imgs/document.svg" width="15%" alt="" /><br/>
          <span>Baca draft UU.</span>
          <br/><br/><br/>
          <span className="vote-desc">{payload.agree} Orang setuju dengan UU {payload.nama}</span>
          <br/>
          <span className="vote-desc">{payload.agree} Orang tidak setuju dengan UU {payload.nama}</span>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ height: '1px', width: '80%', background: '#A7A7A7', margin: '2rem 0' }} />
          </div>
          <span>Vote dengan bijak sesuai keinginan hati anda,</span>
          <br/>
          <span>tanpa ada paksaan dari pihak lain.</span>
          <br/>
          <input 
            onChange={(e) => setNik(e.target.value)} 
            placeholder="Masukkan NIK anda" 
            className="input-nik" 
          />
          <br/>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <button className="btn-agree" onClick={() => handleVote('y')}>SETUJU</button>
            <button className="btn-disagree" onClick={() => handleVote('n')}>TIDAK SETUJU</button>
          </div>
        </div>
      </div>
    </div>
  )
}
