import React from 'react';
import { Box, Button, Heading, HStack, IconButton, } from '@chakra-ui/react'
import {HamburgerIcon, Search2Icon} from '@chakra-ui/icons';
import {GiUsaFlag} from 'react-icons/gi'

const Navbar = () => {
    return (
        <Box  bg = "white.100" h = "10vh" m = {4}>
            <HStack justifyContent = "space-between">
                <HStack alignItems = "flex-end">
                    <IconButton icon = {<HamburgerIcon/>} size = "sn" p = {2} variant = "ghost"/>
                    <Heading >PickBazar</Heading>
                </HStack>
                <HStack alignItems = "flex-end" >
                    <HStack>
                        <Button  variant = "outline" size = "sm" leftIcon = {<GiUsaFlag />} color = "rgb(0, 158, 127)">English</Button>
                        <IconButton icon = {<Search2Icon/>} size = "sm" p = {2} variant = "ghost" />
                    </HStack>
                </HStack>
            </HStack>
        </Box>
    )
}

export default Navbar;
