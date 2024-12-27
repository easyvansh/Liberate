"use client";

import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../../lib/firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { Box, Input, Textarea, Select, Button, Heading, SimpleGrid, Card, CardBody, CardHeader } from "@chakra-ui/react";

interface Habit {
  id?: string;
  userId: string;
  title: string;
  description: string;
  frequency: string;
  completedDates: string[];
}

export default function HabitsPage() {
  const [user] = useAuthState(auth);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [frequency, setFrequency] = useState("Daily");

  useEffect(() => {
    if (!user) return;
    const colRef = collection(db, "habits");
    const q = query(colRef, where("userId", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: Habit[] = [];
      snapshot.forEach((doc) => data.push({ id: doc.id, ...doc.data() } as Habit));
      setHabits(data);
    });
    return () => unsubscribe();
  }, [user]);

  const addHabit = async () => {
    if (!user || !title.trim()) return;
    await addDoc(collection(db, "habits"), {
      userId: user.uid,
      title,
      description,
      frequency,
      completedDates: [],
      createdAt: serverTimestamp(),
    });
    setTitle("");
    setDescription("");
    setFrequency("Daily");
  };

  if (!user) {
    return <Box p={4}>Please log in to manage your habits.</Box>;
  }

  return (
    <Box p={4}>
      <Heading mb={4}>Habit Formation</Heading>
      <Box mb={4}>
        <Input
          placeholder="e.g. ‘Daily Gratitude Reflection’"
          mb={2}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          placeholder="Why is this habit meaningful?"
          mb={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Select mb={2} value={frequency} onChange={(e) => setFrequency(e.target.value)}>
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
        </Select>
        <Button colorScheme="blue" onClick={addHabit}>
          Add Habit
        </Button>
      </Box>

      <SimpleGrid columns={[1, 2]} spacing={4}>
        {habits.map((h) => (
          <Card key={h.id}>
            <CardHeader fontWeight="bold">{h.title}</CardHeader>
            <CardBody>
              {h.description}
              <br />
              <strong>Frequency:</strong> {h.frequency}
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
}
