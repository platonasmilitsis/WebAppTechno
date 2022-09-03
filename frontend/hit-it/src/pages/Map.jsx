import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const BasicMap = () => {

    return (   
            <MapContainer center={[ 39.3641939754144, 21.92236631375198]} zoom={15} scrollWheelZoom={true} style={{zIndex:"0"}}>
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={[39.3641939754144, 21.92236631375198]}>
                        <Popup>
                            Description of seller. <br /> Address.
                        </Popup>
                     </Marker>           
            </MapContainer>
    );
};

export default BasicMap;