// src/components/PropertyPopup.jsx
import React from 'react';
import { Box, Image, Text } from '@chakra-ui/react';

const PropertyPopup = ({ property }) => {
    if (!property) return null;

    return (
        <Box
            display="flex"
            alignItems="center"
            cursor="pointer"
            transition="0.2s ease-in-out"
            _hover={{ transform: 'scale(1.02)' }}
        >
            <Image
                src={property.image_url}
                alt="Property"
                boxSize="60px"
                objectFit="cover"
                borderRadius="md"
                mr={3}
            />
            <Box>
                <Text fontSize="md" fontWeight="bold">
                    {property.address}
                </Text>
                <Text fontSize="sm">
                    🛏 {property.rooms} rooms - 💰 {property.price}₪
                </Text>
            </Box>
        </Box>
    );
};

export default PropertyPopup;
