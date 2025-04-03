import { useMap } from "react-leaflet";
import { useEffect } from "react";

const ResizeMap = () => {
  const map = useMap();

  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 500);
  }, [map]);

  return null;
};
export default ResizeMap;
