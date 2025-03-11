// src/components/ChatButton.jsx
import React from 'react';
import { IconButton, Image, Box } from '@chakra-ui/react';

function ChatButton({ onClick }) {
    return (
        <Box position="fixed" bottom="20px" left="20px" zIndex={10000}>
            <IconButton
                onClick={onClick}
                aria-label="Open Chat"
                icon={
                    <Image src="/logocubedira.png" boxSize="80px" borderRadius="full" />
                }
                bgGradient="linear(to-br, #333, #555)"
                size="lg"
                borderRadius="full"
                boxSize="90px"
                boxShadow="lg"
            />
        </Box>
    );
}

export default ChatButton;
