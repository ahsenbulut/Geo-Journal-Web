import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";

export default function SearchControl({
  onSelect,
}: {
  onSelect: (coords: { lat: number; lng: number }) => void;
}) {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();

    const searchControl = new (GeoSearchControl as any)({

      provider,
      style: "bar",
      showMarker: false,
      showPopup: false,
      autoClose: true,
      retainZoomLevel: false,
      animateZoom: true,
      searchLabel: "Şehir veya konum ara...",
      keepResult: false,
    });

    map.addControl(searchControl);

    map.on("geosearch/showlocation", (result: any) => {
      const { location } = result;
      onSelect({ lat: location.y, lng: location.x });
    });

    return () => {
      map.removeControl(searchControl);
    };
  }, [map, onSelect]);

  return null;
}
