// src/App.js
import React, { useState } from 'react';
import { ChakraProvider, Box, Flex } from '@chakra-ui/react';
import HeaderBar from './components/HeaderBar';
import SidebarDetails from './components/SidebarDetails';
import MapView from './components/MapView';
import ChatDialog from './components/ChatDialog';

const fakeListings = [
    {
        id: 1,
        address: "123 Main St, Tel Aviv",
        price: 12000,
        rooms: 3,
        sq_meters: 85,
        coordinates: [34.7818, 32.0853],
        image_url: "/fake1.jpg"
    },
    {
        id: 2,
        address: "45 Herzl St, Haifa",
        price: 9500,
        rooms: 2,
        sq_meters: 60,
        coordinates: [34.9917, 32.7940],
        image_url: "/fake2.jpg"
    },
    {
        id: 3,
        address: "78 Dizengoff St, Tel Aviv",
        price: 13500,
        rooms: 4,
        sq_meters: 100,
        coordinates: [34.7745, 32.0881],
        image_url: "/fake3.jpg"
    },
    {
        id: 4,
        address: "200 Ben Yehuda St, Jerusalem",
        price: 8000,
        rooms: 1,
        sq_meters: 45,
        coordinates: [35.2135, 31.7683],
        image_url: "/fake4.jpg"
    }
];

function App() {
    const [filters, setFilters] = useState({
        price: { min: 0, max: 15000 },
        rooms: { min: 1, max: 6 },
        sqm: { min: 20, max: 150 }
    });

    const [selectedProperty, setSelectedProperty] = useState(null);
    const [isMoving, setIsMoving] = useState(false);

    const handleFilterChange = (newFilters) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            ...newFilters
        }));
    };

    return (
        <ChakraProvider>
            <Flex direction="column" height="100vh">
                <HeaderBar onFilterChange={handleFilterChange} filters={filters} moving={isMoving} setFilters={setFilters} />
                <Flex flex={1}>
                    <SidebarDetails property={selectedProperty} />
                    <Box flex={1} position="relative">
                        <MapView
                            listings={fakeListings}
                            filters={filters}
                            onSelectProperty={setSelectedProperty}
                            onMapMovingChange={setIsMoving}
                        />
                    </Box>
                </Flex>
                <ChatDialog property={selectedProperty} />
            </Flex>
        </ChakraProvider>
    );
}

export default App;
