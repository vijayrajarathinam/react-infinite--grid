import React, { useState, useEffect } from "react";
import "./UserGrid.css";

function UserGrid() {
  const [details, setDetails] = useState([]);
  const [display, setDisplay] = useState(false);
  const [card, setCard] = useState({ name: "", company: { catchPhrase: "" } });

  const toggleDisplay = (e, dtl) => {
    e.preventDefault();
    setDisplay(true);
    setCard(dtl);
  };

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((json) => setDetails(json));
  }, []);

  return (
    <div className="body">
      <div className="container">
        {details.length != 0 && details.map((detail) => <Card toggleDisplay={toggleDisplay} detail={detail} />)}
      </div>
      <div className={`section ${display ? "up" : "down"}`} style={{ display: display ? "block" : "none" }}>
        <div className="top">
          <div className="section__close" onClick={() => setDisplay(false)}>
            &#10005;
          </div>
        </div>
        <div className="middle">
          <div style={{ height: "35%", position: "relative" }}>
            <img src="profile.png" className="section__img" />
          </div>
          <div className="section__name">{card.name}</div>
          <div className="section__about">{card.company.catchPhrase}</div>
        </div>
        <div className="bottom">
          <button className="scetion__details">View Details</button>
          <button className="section__more">...</button>
        </div>
      </div>
    </div>
  );
}

export default UserGrid;

function Card({ detail, toggleDisplay, ...props }) {
  return (
    <div className="card" onClick={(e) => toggleDisplay(e, detail)}>
      <img src="profile.png" alt="" className="card__img" />
      <div className="card__title">{detail.name}</div>
      <div className="card__body">{detail.email}</div>
    </div>
  );
}
