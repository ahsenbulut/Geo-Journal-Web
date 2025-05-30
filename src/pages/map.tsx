import dynamic from "next/dynamic";

// SSR'ı kapatılmış dinamik bileşeni içe aktar
const MapClient = dynamic(() => import('../components/MapClient'), {
  ssr: false,
});

export default function MapPage() {
  return <MapClient />;
}
