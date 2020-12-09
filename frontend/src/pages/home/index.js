import React, { useEffect, useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import CardUU from '../../components/card-uu';
import Navbar from '../../components/navbar';
import './index.css';

export default function Home() {
  const [data, setData] = useState([]);
  const [error, setError] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch('http://localhost:8000/ruus/');

      if(res.ok) {
        const json = await res.json();
        setData(json.data);
      } else {
        setError('Failed fetching data');
      }
    }

    getData();
  }, [])

  const payload = !isEmpty(data) ? data : [];

  return (
    <div className="container">
      <Navbar home="active" />
      <div className="content">
        <h1>Daftar UU DPR</h1>
        <div className="list">
          <ul>
            {
              payload.map((item, idx) => <li key={idx}><CardUU payload={item} /></li>)
            }
          </ul>
        </div>
        <div className="attention"><span>Tidak ada UU yang lain.</span></div>
      </div>
	  </div>
  )
}
