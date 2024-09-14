import {useState, useEffect} from 'react';
import {overlayCore} from './overlayCore';

export const useOverlay = () => {
  const [overlays, setOverlays] = useState(
    overlayCore.allOverlays.map(overlay => overlay),
  );

  useEffect(() => {
    const unsubscribe = overlayCore.subscribe(() => {
      setOverlays(overlayCore.allOverlays.map(overlay => overlay));
    });

    return () => unsubscribe();
  }, []);

  return overlays;
};
