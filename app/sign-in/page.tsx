"use client"

import React from 'react'
import { SignInForm } from '@/components/ui'
import { Stack } from '@chakra-ui/react'
import { signInClient } from './server/sign-in'

export default function SignInPage() {
    return (
        <Stack width="100%" height="100vh" justifyContent="center" alignItems="center">
            <SignInForm signIn={(email, password) => signInClient(email, password)} />
        </Stack>
    )
}