import 'react-calendar/dist/Calendar.css';
import { useEffect, useState } from "react";
import { Box, Button, Heading, Spinner, Stack, Text, VStack } from "@chakra-ui/react";
import dayjs from "dayjs";
import { Session } from "../page";
import Calendar from "react-calendar";
import { supabaseClient } from '../libs/db/client';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export function SessionHistory() {
    const [date, onChange] = useState<Value>(new Date());
    const [isLoading, setIsLoading] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);
    const [pastSessions, setPastSessions] = useState<Session[]>([]);

    useEffect(() => {
        fetchPastSessions(date);
    }, [date]);

    async function fetchPastSessions(date: Value) {
        setIsLoading(true);
        try {
            const selectedDate = Array.isArray(date) ? date[0] : date;
            const dateParam = date ? dayjs(selectedDate).format("YYYY-MM-DD") : "";
            const res = await fetch(`/api/homeoffice-sessions/history?date=${dateParam}`);
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
        const supabase = supabaseClient();
        const sessionChannel = supabase
            .channel('homeoffice_session_listener')
            .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'homeoffice_sessions' }, () => {
                fetchPastSessions(date);
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
            <Heading size="md" mb={2}>
                Vergangene Sessions:
            </Heading>

            <Button maxWidth={250} onClick={() => setShowCalendar(prev => !prev)}>{dayjs(Array.isArray(date) ? date[0] : date).format("DD.MM.YYYY")}</Button>
            <Box backgroundColor="#fff" maxWidth={250} marginY={4}>
                {showCalendar && <Calendar onChange={(value: Value) => {
                    onChange(value);
                    setShowCalendar(false)
                }} value={date} />}
            </Box>
            <Box>
                {isLoading && <Spinner />}
                {pastSessions && pastSessions.length === 0 && !isLoading && (
                    <Text color="gray.500">Keine vergangenen Sessions am am {dayjs(Array.isArray(date) ? date[0] : date).format("DD.MM.YYYY")}</Text>
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
