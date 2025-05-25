'use client'

import { Box, Button, Heading, HStack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'


export function MainHeader() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    async function signOut() {
        setIsLoading(true);
        try {
            const res = await fetch("/api/auth/sign-out", {
                method: "POST",
            });

            if (res.ok) {
                router.push("/sign-in");
            } else {
                const data = await res.json();
                console.error("Fehler beim Logout:", data.error);
            }
        } catch (e) {
            throw e;
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <HStack flex={1} justifyContent="space-between">
            <Box>
                <Heading size="lg">Home Office Tracker</Heading>
                <Text color="gray.500">Tracke deine Arbeitszeit im Home Office</Text>
            </Box>
            <Button loading={isLoading} onClick={signOut}>Log Out</Button>
        </HStack>
    )
}