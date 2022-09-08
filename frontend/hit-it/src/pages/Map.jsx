import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import './Product.css';

const BasicMap = ( {mylat,mylong}  ) => {

    console.log("lat:",mylat)
    return (   
            <MapContainer  className='my-map-container' center={[ mylat, mylong]} zoom={15} scrollWheelZoom={true}>
                <TileLayer  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={[ mylat, mylong ]}>
                        <Popup>
                            Description of seller. <br /> Address.
                        </Popup>
                     </Marker>           
            </MapContainer>
    );
};

export default BasicMap;
