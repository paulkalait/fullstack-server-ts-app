import { Box } from '@chakra-ui/react';
import React, { ReactNode } from 'react'

interface WrapperProps {
children: React.ReactNode;
variant?: 'small' | 'regular'
}

export const Wrapper: React.FC<WrapperProps> = ({children, variant='regular'}) => {
        return (
            <Box mt={8} maxW={variant === 'regular' ? '800px' : '400px'} w="100%">
                {children}
            </Box>
        );
}

export default Wrapper