// src/components/HeaderBar.jsx
import React from 'react';
import {
    Flex,
    Button,
    Image,
    Box,
    IconButton,
    useColorMode,
    useColorModeValue,
    Input,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    Text,
    Menu,
    MenuButton,
    MenuList
} from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

function HeaderBar({ onFilterChange, moving, filters = {}, setFilters }) {
    const { colorMode, toggleColorMode } = useColorMode();
    const staticBg = useColorModeValue('whiteAlpha.900', 'gray.800');
    const movingBg = useColorModeValue('whiteAlpha.700', 'gray.700');
    const bg = moving ? movingBg : staticBg;

    // Dark mode support
    const dropdownBg = useColorModeValue('white', 'gray.700');
    const textColor = useColorModeValue('black', 'white');

    // Ensure default values for filters
    const defaultFilters = {
        price: { min: 0, max: 15000 },
        rooms: { min: 1, max: 6 },
        sqm: { min: 20, max: 150 }
    };

    const activeFilters = { ...defaultFilters, ...filters };

    return (
        <Flex
            position="fixed"
            top={0}
            left={0}
            width="100%"
            height="60px"
            bg={bg}
            boxShadow="md"
            align="center"
            justify="space-between"
            px={4}
            zIndex={9999}
        >
            {/* Left Side: Dark Mode Toggle */}
            <Flex gap={4} align="center">
                <IconButton
                    aria-label="Toggle dark mode"
                    icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                    onClick={toggleColorMode}
                    variant="ghost"
                    size="md"
                />

                {/* Price Filter */}
                <Menu>
                    <MenuButton as={Button} colorScheme="blue">
                        Price
                    </MenuButton>
                    <MenuList p={4} bg={dropdownBg} color={textColor}>
                        <Box>
                            <Text>Price Range:</Text>
                            <Slider
                                min={0}
                                max={20000}
                                step={500}
                                value={activeFilters.price.max}
                                onChange={(value) =>
                                    setFilters((prev) => ({
                                        ...prev,
                                        price: { ...prev.price, max: value }
                                    }))
                                }
                            >
                                <SliderTrack><SliderFilledTrack /></SliderTrack>
                                <SliderThumb />
                            </Slider>
                            <Input
                                mt={2}
                                type="number"
                                value={activeFilters.price.max}
                                onChange={(e) =>
                                    setFilters((prev) => ({
                                        ...prev,
                                        price: { ...prev.price, max: Number(e.target.value) }
                                    }))
                                }
                            />
                        </Box>
                    </MenuList>
                </Menu>

                {/* Rooms Filter */}
                <Menu>
                    <MenuButton as={Button} colorScheme="blue">
                        Rooms
                    </MenuButton>
                    <MenuList p={4} bg={dropdownBg} color={textColor}>
                        <Box>
                            <Text>Rooms:</Text>
                            <Slider
                                min={1}
                                max={6}
                                step={1}
                                value={activeFilters.rooms.max}
                                onChange={(value) =>
                                    setFilters((prev) => ({
                                        ...prev,
                                        rooms: { ...prev.rooms, max: value }
                                    }))
                                }
                            >
                                <SliderTrack><SliderFilledTrack /></SliderTrack>
                                <SliderThumb />
                            </Slider>
                            <Input
                                mt={2}
                                type="number"
                                value={activeFilters.rooms.max}
                                onChange={(e) =>
                                    setFilters((prev) => ({
                                        ...prev,
                                        rooms: { ...prev.rooms, max: Number(e.target.value) }
                                    }))
                                }
                            />
                        </Box>
                    </MenuList>
                </Menu>

                {/* Sq. M Filter */}
                <Menu>
                    <MenuButton as={Button} colorScheme="blue">
                        Sq. M
                    </MenuButton>
                    <MenuList p={4} bg={dropdownBg} color={textColor}>
                        <Box>
                            <Text>Size (Sq. M):</Text>
                            <Slider
                                min={20}
                                max={150}
                                step={5}
                                value={activeFilters.sqm.max}
                                onChange={(value) =>
                                    setFilters((prev) => ({
                                        ...prev,
                                        sqm: { ...prev.sqm, max: value }
                                    }))
                                }
                            >
                                <SliderTrack><SliderFilledTrack /></SliderTrack>
                                <SliderThumb />
                            </Slider>
                            <Input
                                mt={2}
                                type="number"
                                value={activeFilters.sqm.max}
                                onChange={(e) =>
                                    setFilters((prev) => ({
                                        ...prev,
                                        sqm: { ...prev.sqm, max: Number(e.target.value) }
                                    }))
                                }
                            />
                        </Box>
                    </MenuList>
                </Menu>

                {/* Apply Filters Button */}
                <Button
                    colorScheme="blue"
                    onClick={() => onFilterChange(activeFilters)}
                >
                    Apply Filters
                </Button>
            </Flex>

            {/* Right Side: Logo */}
            <Box>
                <Image src="/diraai-logo.png" height="10px" alt="Logo" />
            </Box>
        </Flex>
    );
}

export default HeaderBar;
