import { useState } from 'react';

interface GeoLocationState {
  loaded: boolean;
  coordinates?: { lat: number; lng: number };
  error?: { code: number; message: string };
}

export const useGeoLocation = () => {
  const [location, setLocation] = useState<GeoLocationState>({
    loaded: false,
    coordinates: undefined,
  });

  const onSuccess = (location: GeolocationPosition) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
  };

  const onError = (error: GeolocationPositionError) => {
    setLocation({
      loaded: true,
      error: {
        code: error.code,
        message: error.message,
      },
    });
  };

  const getLocation = () => {
    if (!('geolocation' in navigator)) {
      setLocation({
        loaded: true,
        error: {
          code: 0,
          message: 'Geolocation not supported',
        },
      });
    } else {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
  };

  return { location, getLocation };
};
