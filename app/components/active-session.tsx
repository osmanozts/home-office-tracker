'use client'

import { ElapsedTimer } from '@/components/ui'
import { Box, Button, Heading, Spinner, Stack, Text, VStack } from '@chakra-ui/react'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { supabaseClient } from '../libs/db/client'
import { Session } from '../page'

export function ActiveSession() {
    const [loading, setLoading] = useState({
        fetch: false,
        start: false,
        stop: false,
    });
    const [activeSession, setActiveSession] = useState<Session | null>(null);

    async function fetchActiveSessions() {
        setLoading(prev => ({ ...prev, fetch: true }));
        try {
            const res = await fetch("/api/homeoffice-sessions/active");
            const data = await res.json();
            if (!res.ok) {
                console.error("Fehler beim Laden:", data.error);
                return;
            }
            setActiveSession(data);
        } catch (e) {
            console.error("Fehler beim Laden der Sessions:", e);
        } finally {
            setLoading(prev => ({ ...prev, fetch: false }));
        }
    }

    async function startSession() {
        setLoading(prev => ({ ...prev, start: true }));
        try {
            const res = await fetch("/api/homeoffice-sessions/start", {
                method: "POST",
            });
            if (res.ok) await fetchActiveSessions();
        } catch (e) {
            console.error("Start-Fehler:", e);
        } finally {
            setLoading(prev => ({ ...prev, start: false }));
        }
    }

    async function stopSession(sessionId: string) {
        setLoading(prev => ({ ...prev, stop: true }));
        if (!activeSession) return;
        try {
            const supabase = supabaseClient();
            const auth = await supabase.auth.getUser();

            const res = await fetch("/api/homeoffice-sessions/stop", {
                method: "POST",
                body: JSON.stringify({ sessionId }),
                headers: { "Content-Type": "application/json" },
            });
            if (res.ok) {
                await fetchActiveSessions();
                await fetch("/api/email", {
                    method: "POST",
                    body: JSON.stringify({
                        email: auth.data.user?.email,
                        start: activeSession.start_time,
                        end: new Date().toISOString(),
                    }),
                });
            }
        } catch (e) {
            console.error("Stop-Fehler:", e);
        } finally {
            setLoading(prev => ({ ...prev, stop: false }));
        }
    }

    useEffect(() => {
        fetchActiveSessions();
    }, []);

    return (
        <Stack borderWidth={1} borderRadius={8} padding={4}>
            <Button
                bg="#E30614"
                color="#fff"
                onClick={startSession}
                loading={loading.start}
                disabled={!!activeSession || loading.fetch}
            >
                Neue Session starten
            </Button>

            <Heading size="md" mb={2}>Aktive Session</Heading>
            {loading.fetch && (<Spinner />)}

            {(!activeSession && !loading.fetch) && (
                <Text color="gray.500">Keine aktive Session</Text>
            )}

            {activeSession && (
                <VStack align="stretch" gap={2}>
                    <Box key={activeSession.id} p={4} bg="gray.50" rounded="md" border="1px solid #eee">
                        <Text>Gestartet: {dayjs(activeSession.start_time).format("DD.MM.YYYY HH:mm")}</Text>
                        <Text>⏱️ Laufzeit: <ElapsedTimer start={activeSession.start_time} /></Text>
                        <Button
                            bg="#E30614"
                            color="#fff" loading={loading.stop} mt={2} size="sm" onClick={() => stopSession(activeSession.id)}>
                            Session beenden
                        </Button>
                    </Box>
                </VStack>
            )}
        </Stack>
    );
}
