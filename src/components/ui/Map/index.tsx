"use client";

import { APIProvider, Map as GoogleMap, Marker } from '@vis.gl/react-google-maps';


export default function Map() {

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    throw new Error('Google Maps API key is not defined');
  }

  const center = { lat: 35.6762, lng: 139.6503 }; // 東京
  const zoom = 13;

  const markers = [
    { position: center, title: '東京' },
  ];

  return (
    <div className="h-full w-full">
      <APIProvider apiKey={apiKey}>
        <GoogleMap
          defaultCenter={center}
          defaultZoom={zoom}
          mapTypeId="roadmap"
          disableDefaultUI={true}
          gestureHandling="greedy"
          style={{ width: '100%', height: '100%' }}
        >
          {markers.map((marker, index) => (
            <Marker key={index} position={marker.position} title={marker.title} />
          ))}
        </GoogleMap>
      </APIProvider>
    </div>
  );
}