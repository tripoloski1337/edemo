import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './index.css';
import isEmpty from 'lodash/isEmpty';

export default function CardUU({ payload }) {
  const history = useHistory();
  const [agree, setAgree] = useState();
  const [disagree, setDisagree] = useState();
  const [error, setError] = useState({ agree: '', disagree: '' });

  useEffect(() => {
    const getDisagreeCount = async () => {
      const res = await fetch(`http://localhost:8000/countn/${payload._id}`);

      if(res.ok) {
        const json = await res.json();
        setDisagree(json.count);
      } else {
        setError({ disagree: 'Error fetching disagree count '});
      }
    }

    getDisagreeCount();
  }, [payload._id])

  useEffect(() => {
    const getAgreeCount = async () => {
      const res = await fetch(`http://localhost:8000/county/${payload._id}`);

      if(res.ok) {
        const json = await res.json();
        setAgree(json.count);
      } else {
        setError({ agree: 'Error fetching disagree count '});
      }
    }

    getAgreeCount();
  }, [payload._id])

  const handleNavigation = () => {
    let store = {
      payload: payload
    }

    const data = { ...store.payload, disagree, agree }
    history.push({
      pathname: "/vote",
      state: { payload: data }
    })
  }

  const payloadAgree = !isEmpty(agree) ? agree : 0;
  const payloadDisagree = !isEmpty(disagree) ? disagree : 0;

  return (
    <div className="item">
      <div>
        <h2 className="title">{payload.nama}</h2>
        <span>{payload.deskripsi}</span>
        <br/><br/>
        <span className="agree">{payloadAgree} orang setuju</span>
        <span className="disagree">{payloadDisagree} orang tidak setuju</span>
      </div>
      <div className="doc">
        <img src="./imgs/document.svg" width="30%" alt="" /><br/>
        <span>Baca Draft UU</span>
      </div>
      <div>
        <button onClick={handleNavigation}>VOTE</button>
      </div>
    </div>
  )
}
