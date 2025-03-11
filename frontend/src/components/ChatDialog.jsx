// src/components/ChatDialog.jsx
import React, { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    Text,
    Textarea,
    Box,
    useDisclosure,
} from '@chakra-ui/react';

function ChatDialog({ property }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [message, setMessage] = useState('');
    const [chatResponse, setChatResponse] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const basePrompt =
            "You're an Israeli realtor who advertises apartments in Israel and wants to help with any questions regarding a specific apartment or the area it's located in.";
        const prompt = `${basePrompt}\n\nUser: ${message}\nRealtor:`;
        try {
            const response = await fetch('https://api.openai.com/v1/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
                },
                body: JSON.stringify({
                    model: 'text-davinci-003',
                    prompt: prompt,
                    max_tokens: 150,
                    temperature: 0.7,
                    n: 1,
                    stop: ['\n'],
                }),
            });
            const data = await response.json();
            let answer = data.choices[0].text.trim();
            if (answer.length > 250) {
                answer = answer.substring(0, 250);
            }
            setChatResponse(answer);
        } catch (error) {
            console.error('Error calling OpenAI API:', error);
            setChatResponse('Sorry, an error occurred while fetching the answer.');
        }
    };

    return (
        <>
            <Button
                position="absolute"
                left={5}
                top={20}
                zIndex={1000}
                onClick={onOpen}
            >
                Chat
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent position="absolute" left={0} top="10%">
                    <ModalHeader>Ask about this apartment</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {property && <Text mb={2}>{property.address}</Text>}
                        <Box as="form" onSubmit={handleSubmit}>
                            <Textarea
                                placeholder="Ask something..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            <Button mt={4} type="submit" colorScheme="blue">
                                Send
                            </Button>
                        </Box>
                        {chatResponse && (
                            <Box mt={4} p={2} bg="gray.100" borderRadius="md">
                                <Text>{chatResponse}</Text>
                            </Box>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default ChatDialog;
