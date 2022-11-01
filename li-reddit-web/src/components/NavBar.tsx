import { Box, Flex} from '@chakra-ui/react';
import React from 'react'
import Link from 'next/link'

interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = ({}) => {
        return (
            <Flex bg='tomato' p={4} >
                <Flex ml={'auto'}>
                    <Box mr={4}>
                          <Link href='/login'>Login</Link>
                    </Box>
                    <Box>
                                             <Link  href='/register'>Register</Link>
                    </Box>
                </Flex>
            </Flex>
        );
}