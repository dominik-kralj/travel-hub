'use client';

import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { useState } from 'react';

type MapPickerProps = {
    lat: number;
    lng: number;
    setLat: (val: number) => void;
    setLng: (val: number) => void;
};

const containerStyle = {
    width: '100%',
    height: '300px',
};

export const MapPicker = ({ lat, lng, setLat, setLng }: MapPickerProps) => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    });

    const [position, setPosition] = useState<{ lat: number; lng: number }>({
        lat,
        lng,
    });

    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading map...</div>;

    const handleMapClick = (e: google.maps.MapMouseEvent) => {
        if (e.latLng) {
            const newLat = e.latLng.lat();
            const newLng = e.latLng.lng();
            setPosition({ lat: newLat, lng: newLng });
            setLat(Number(newLat));
            setLng(Number(newLng));
        }
    };

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={position}
            zoom={5}
            onClick={handleMapClick}
        >
            <Marker position={position} />
        </GoogleMap>
    );
};
