import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import { Box, Spinner } from '@chakra-ui/react';

// Custom icon for bike pump stations
const bikePumpIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const Map = () => {
  const [bikePumps, setBikePumps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch bike pump data (mock data for now)
    const fetchBikePumps = async () => {
      const response = await fetch('/bike-pumps.json');
      const data = await response.json();
      setBikePumps(data);
      setLoading(false);
    };

    fetchBikePumps();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <MapContainer center={[59.3293, 18.0686]} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {bikePumps.map((pump, index) => (
        <Marker key={index} position={[pump.lat, pump.lng]} icon={bikePumpIcon}>
          <Popup>
            {pump.name}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;