// src/components/SidebarDetails.jsx
import React from 'react';
import {
    Box,
    Text,
    Image,
    CloseButton,
    useColorModeValue,
    Slide,
} from '@chakra-ui/react';

const SidebarDetails = ({ selectedProperty, onClose }) => {
    // Dark mode colors
    const bgColor = useColorModeValue('white', 'gray.900');
    const textColor = useColorModeValue('black', 'white');
    const borderColor = useColorModeValue('gray.200', 'gray.700');

    return (
        <Slide
            direction="right"
            in={Boolean(selectedProperty)}
            style={{ zIndex: 1000 }}
            unmountOnExit
        >
            {/* Only render the sidebar content if a property is selected */}
            {selectedProperty && (
                <Box
                    position="absolute"
                    top="60px"    // Ensures it's below the header
                    right={0}
                    width="350px"
                    height="calc(100vh - 60px)" // Avoid overlapping the header
                    bg={bgColor}
                    color={textColor}
                    boxShadow="lg"
                    borderLeft="1px solid"
                    borderColor={borderColor}
                    p={4}
                    overflowY="auto"
                >
                    <CloseButton
                        position="absolute"
                        top={2}
                        right={2}
                        onClick={onClose}
                    />
                    <Image
                        src={selectedProperty.image_url}
                        alt="Property"
                        borderRadius="md"
                        width="100%"
                    />
                    <Text fontSize="xl" fontWeight="bold" mt={2}>
                        {selectedProperty.address}
                    </Text>
                    <Text fontSize="md">🛏 {selectedProperty.rooms} rooms</Text>
                    <Text fontSize="md">💰 {selectedProperty.price}₪</Text>
                    <Text fontSize="sm" mt={2} color="gray.500">
                        More details about the apartment will go here...
                    </Text>
                </Box>
            )}
        </Slide>
    );
};

export default SidebarDetails;
