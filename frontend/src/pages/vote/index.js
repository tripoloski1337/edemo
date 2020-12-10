import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar';
import axios from 'axios';
import qs from 'qs';
import isEmpty from 'lodash/isEmpty';
import './index.css';

export default function Vote({ location }) {
  const { payload } = location.state;
  const [nik, setNik] = useState('');
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const caseSuccess = () => {
      if (success) {
        window.location.reload();
      }
    }

    caseSuccess();
  }, [success])

  const handleVote = async (vote) => {
    let data = { nik: nik, voted: vote };
    axios({
      method: 'POST',
      url: `http://localhost:8000/vote/${payload._id}`,
      data: qs.stringify(data),
      Headers: {'Content-Type' : 'application/x-www-form-urlencoded'}
    })
    .then((res) => {
      if (res.statusText === "OK") {
        setSuccess(true);
        setError(false);
      }
    })
    .catch((err) => {
      setError(err);
      setSuccess(false);
    })
  }

  // const successMsg = !isEmpty(success) && success ? alert('Berhasil Vote') : null;
  // const failedMsg = !isEmpty(error) && error ? alert('Gagal Vote') : null;
  return (
    <div className="container">
      <Navbar vote="active" />
      <div className="content">
        <div className="vote text-center">
          <img src="./imgs/document.svg" width="13%" alt="" /><br/>
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
