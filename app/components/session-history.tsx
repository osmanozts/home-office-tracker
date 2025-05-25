import { useEffect, useState } from "react";
import { Box, Heading, Spinner, Stack, Text, VStack } from "@chakra-ui/react";
import dayjs from "dayjs";
import { Session } from "../page";
import { supabaseClient } from "../libs/db/client";

export function SessionHistory() {
    const [isLoading, setIsLoading] = useState(false);
    const [pastSessions, setPastSessions] = useState<Session[]>([]);

    async function fetchPastSessions() {
        setIsLoading(true);
        try {
            const res = await fetch("/api/homeoffice-sessions/history");
            const data = await res.json();
            if (!res.ok) {
                console.error("Fehler beim Laden der Sessions:", data.error);
                return;
            }
            setPastSessions(data);
        } catch (e) {
            console.error("Fehler beim Laden der Sessions:", e);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchPastSessions();

        const supabase = supabaseClient();
        const sessionChannel = supabase
            .channel('homeoffice_session_listener')
            .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'homeoffice_sessions' }, (payload) => {
                fetchPastSessions();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(sessionChannel);
        };
    }, []);

    function getDuration(startTime: string, endTime: string) {
        const start = dayjs(startTime);
        const end = dayjs(endTime);
        const duration = end.diff(start);

        const hours = Math.floor(duration / (1000 * 60 * 60));
        const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((duration % (1000 * 60)) / 1000);

        const durationStr = [];
        if (hours > 0) durationStr.push(`${hours} Std`);
        if (minutes > 0) durationStr.push(`${minutes} Min`);
        if (seconds > 0) durationStr.push(`${seconds} Sek`);

        return durationStr.join(" ");
    }

    return (
        <Stack borderWidth={1} borderRadius={8} padding={4}>
            <Box>
                <Heading size="md" mb={2}>
                    Vergangene Sessions
                </Heading>
                {isLoading && <Spinner />}
                {pastSessions && pastSessions.length === 0 && !isLoading && (
                    <Text color="gray.500">Keine vergangenen Sessions</Text>
                )}
                {pastSessions && pastSessions.length > 0 && (
                    <VStack align="stretch" gap={2}>
                        {pastSessions.map((session) => (
                            <Box key={session.id} p={4} bg="gray.50" rounded="md" border="1px solid #eee">
                                <Text>Gestartet: {dayjs(session.start_time).format("DD.MM.YYYY HH:mm")}</Text>
                                <Text>Beendet: {dayjs(session.end_time).format("DD.MM.YYYY HH:mm")}</Text>
                                <Text>
                                    Dauer: {getDuration(session.start_time, session.end_time!)}
                                </Text>
                            </Box>
                        ))}
                    </VStack>
                )}
            </Box>
        </Stack>
    );
}
