import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import React from 'react';
import './AddressStyle.css';

const Address = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });
  const center = { lat: 48, lng: 2.2 };
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <GoogleMap
        center={center}
        zoom={10}
        mapContainerClassName='mapContainerStyle'
      ></GoogleMap>
    </div>
  );
};

// function Map() {
//   const center = { lat: 48, lng: 2.2 };
//   return (
//     <GoogleMap
//       center={center}
//       zoom={10}
//       mapContainerClassName='mapContainerStyle'
//     >
//       {' '}
//     </GoogleMap>
//   );
// }

export default Address;
