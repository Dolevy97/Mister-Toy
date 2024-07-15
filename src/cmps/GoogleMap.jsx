import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';
import { Button } from "@mui/material";



export function GoogleMap() {
  const AnyReactComponent = ({ text }) => <div style={{ fontSize: '2em' }}>{text}</div>;
  const [coords, setCoords] = useState({ lat: 32.0853, lng: 34.7818 })
  const zoom = 15

  function onHandleClick({ lat, lng }) {
    setCoords({ lat, lng })
  }

  function onChangeMapCoords(coords) {
    setCoords(coords)
  }


  return (
    <>
      <article className="about-btns-container">
        <Button onClick={() => onChangeMapCoords({ lat: 32.0853, lng: 34.7818 })} variant="contained">Tel Aviv</Button>
        <Button onClick={() => onChangeMapCoords({ lat: 31.249235, lng: 34.766485 })} variant="contained">Beer Sheba</Button>
        <Button onClick={() => onChangeMapCoords({ lat: 29.550974, lng: 34.956912 })} variant="contained">Eilat</Button>
      </article>

      <div style={{ height: '50vh', width: '100%', overflow: 'hidden', borderRadius: '12px'}}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyC3JYJV46HLqEVYXfj9bo5_b4yO0UOD_WI" }}
          center={coords}
          zoom={zoom}
          onClick={onHandleClick}
        >
          <AnyReactComponent
            lat={32.0853}
            lng={34.7818}
            text="🧸"
          />
          <AnyReactComponent
            lat={31.249235}
            lng={34.766485}
            text="🧸"
          />
          <AnyReactComponent
            lat={29.550974}
            lng={34.956912}
            text="🧸"
          />
        </GoogleMapReact>
      </div>
    </>
  );
}