// src/components/MapView.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Box, useColorMode } from '@chakra-ui/react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import ReactDOMServer from 'react-dom/server';
import PropertyPopup from './PropertyPopup';
import SidebarDetails from './SidebarDetails';
// Import our custom popup CSS styles
import './MapView.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const MapView = ({ filters = {} }) => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [selectedProperty, setSelectedProperty] = useState(null);

    // Determine if we're in dark or light mode
    const { colorMode } = useColorMode();

    // Decide which custom CSS class to attach to the popup
    const popupClassName = colorMode === 'dark' ? 'dark-mapbox-popup' : 'light-mapbox-popup';

    // Example listings
    const listings = [
        { id: 1, address: '123 Dizengoff St', price: 9000, rooms: 3, sq_meters: 85, coordinates: [34.774, 32.085] },
        { id: 2, address: '45 Rothschild Blvd', price: 12000, rooms: 4, sq_meters: 120, coordinates: [34.771, 32.069] },
        { id: 3, address: '67 Ibn Gvirol', price: 7500, rooms: 2, sq_meters: 65, coordinates: [34.782, 32.086] },
        { id: 4, address: '210 Ben Yehuda St', price: 10500, rooms: 3, sq_meters: 90, coordinates: [34.768, 32.083] },
        { id: 5, address: '8 Shenkin St', price: 9500, rooms: 2, sq_meters: 70, coordinates: [34.773, 32.066] },
    ];

    useEffect(() => {
        if (map.current) return; // Only initialize the map once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [34.78, 32.08],
            zoom: 12,
        });
    }, []);

    useEffect(() => {
        if (!map.current) return;

        // Remove existing markers to avoid duplicates
        document.querySelectorAll('.map-marker').forEach(marker => marker.remove());

        listings.forEach(property => {
            // (Optional) Filter logic
            if (
                property.price < filters.price?.min || property.price > filters.price?.max ||
                property.rooms < filters.rooms?.min || property.rooms > filters.rooms?.max ||
                property.sq_meters < filters.sqm?.min || property.sq_meters > filters.sqm?.max
            ) {
                return;
            }

            // Create a marker element
            const markerElem = document.createElement('div');
            markerElem.className = 'map-marker';
            markerElem.style.width = '20px';
            markerElem.style.height = '20px';
            markerElem.style.borderRadius = '50%';
            markerElem.style.cursor = 'pointer';
            // Marker color depends on color mode
            markerElem.style.backgroundColor = colorMode === 'dark' ? 'white' : 'black';
            // Give it an outline so it's visible on various backgrounds
            markerElem.style.boxShadow =
                colorMode === 'dark'
                    ? '0 0 0 2px rgba(0, 0, 0, 0.7)'
                    : '0 0 0 2px #fff';

            // Render the PropertyPopup as HTML for Mapbox
            const popupHTML = ReactDOMServer.renderToString(
                <PropertyPopup property={property} />
            );

            // Create the mapbox popup with our custom class
            const popup = new mapboxgl.Popup({ offset: 25, className: popupClassName })
                .setHTML(popupHTML);

            // Marker mouse events
            markerElem.addEventListener('mouseenter', () => {
                popup.addTo(map.current);
            });
            markerElem.addEventListener('mouseleave', () => {
                popup.remove();
            });

            // Clicking the marker to open the sidebar details
            markerElem.addEventListener('click', () => {
                setSelectedProperty(property);
            });

            // Add marker to the map
            new mapboxgl.Marker(markerElem)
                .setLngLat(property.coordinates)
                .setPopup(popup)
                .addTo(map.current);
        });
    }, [filters, colorMode, listings]);

    return (
        <>
            <Box
                ref={mapContainer}
                position="absolute"
                top={0}
                left={0}
                width="100%"
                height="100%"
                zIndex={1}
            />
            {selectedProperty && (
                <SidebarDetails
                    selectedProperty={selectedProperty}
                    onClose={() => setSelectedProperty(null)}
                />
            )}
        </>
    );
};

export default MapView;
