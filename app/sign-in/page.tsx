"use client"

import React from 'react'
import { SignInForm } from '@/components/ui'
import { Stack } from '@chakra-ui/react'

export default function SignInPage() {
    return (
        <Stack width="100%" height="100vh" justifyContent="center" alignItems="center">
            <SignInForm />
        </Stack>
    )
}