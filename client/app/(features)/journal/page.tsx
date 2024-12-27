"use client";

import { useState, useEffect } from "react";
import { db, auth } from "../.././lib/firebase";
import { getAIReflection } from "../.././lib/openai";
import { upsertEmbedding } from "../.././lib/vector";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  Box, Textarea, Button, Heading, Stack, Text,
} from "@chakra-ui/react";

interface Entry {
  id?: string;
  text: string;
  userId: string;
  timestamp?: any;
}

export default function JournalPage() {
  const [entry, setEntry] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [entries, setEntries] = useState<Entry[]>([]);
  const [user] = useAuthState(auth);

  // Load existing entries
  useEffect(() => {
    if (!user) return;
    const colRef = collection(db, "journalEntries");
    const qRef = query(
      colRef,
      where("userId", "==", user.uid),
      orderBy("timestamp", "desc")
    );
    const unsub = onSnapshot(qRef, (snapshot) => {
      const data: Entry[] = [];
      snapshot.forEach((doc) => data.push({ id: doc.id, ...doc.data() } as Entry));
      setEntries(data);
    });
    return () => unsub();
  }, [user]);

  const saveEntry = async () => {
    if (!user) return;
    if (!entry.trim()) return;
    // 1. Save to Firestore
    const docRef = await addDoc(collection(db, "journalEntries"), {
      text: entry,
      userId: user.uid,
      timestamp: serverTimestamp(),
    });
    // 2. Call AI reflection
    const reflection = await getAIReflection(entry);
    setAiResponse(reflection);

    // 3. Upsert embedding to vector DB
    await upsertEmbedding(user.uid, docRef.id, entry);

    setEntry("");
  };

  return (
    <Box p={4}>
      <Heading mb={4}>Reflective Journaling</Heading>
      {!user && <Text>Please login first.</Text>}
      {user && (
        <Stack spacing={3}>
          <Textarea
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            placeholder="Write your thoughts..."
            rows={5}
          />
          <Button colorScheme="blue" onClick={saveEntry}>
            Save & Get AI Insight
          </Button>
          {aiResponse && (
            <Box bg="gray.100" p={3} borderRadius="md">
              <Text fontWeight="semibold">AI Reflection:</Text>
              <Text whiteSpace="pre-wrap">{aiResponse}</Text>
            </Box>
          )}
          <Heading size="md" mt={6}>Your Past Entries</Heading>
          {entries.map((e) => (
            <Box key={e.id} p={3} bg="white" boxShadow="sm" borderRadius="md">
              <Text>{e.text}</Text>
              <Text fontSize="sm" color="gray.500">
                {e.timestamp?.toDate()?.toLocaleString()}
              </Text>
            </Box>
          ))}
        </Stack>
      )}
    </Box>
  );
}
