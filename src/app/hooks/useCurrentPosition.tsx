import { useEffect } from 'react';

interface UseCurrentPositionProps {
    onPosition: (latitude: number, longitude: number) => void;
}

export function useCurrentPosition({ onPosition }: UseCurrentPositionProps) {
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                onPosition(position.coords.latitude, position.coords.longitude);
            },
            (error) => {
                console.error('Failed to get current position:', error);
            },
        );
    }, [onPosition]);
}
