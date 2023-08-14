"use client";
import React from 'react'
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { CookiesProvider } from 'react-cookie';
import SSRProvider from './SSRProvider';
import { ThemeProvider } from './ThemeProvider';

export const Provider = ({ children }: { children: React.ReactNode }) => {
    return <>
    <ThemeProvider>
        <CacheProvider>
            <ChakraProvider>
                <CookiesProvider>
                        <SSRProvider>
                            {children}
                        </SSRProvider>
                </CookiesProvider>
            </ChakraProvider>
        </CacheProvider>
    </ThemeProvider>
    </>;
}

