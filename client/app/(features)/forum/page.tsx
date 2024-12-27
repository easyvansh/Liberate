"use client";

import { useEffect, useState } from "react";
import { db, auth } from "../.././lib/firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { Box, Heading, Textarea, Button, Text } from "@chakra-ui/react";

interface Post {
  id: string;
  content: string;
  timestamp?: any;
}

export default function ForumPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [content, setContent] = useState("");
  const [user] = useAuthState(auth);

  useEffect(() => {
    const qRef = query(collection(db, "communityPosts"), orderBy("timestamp", "desc"));
    const unsub = onSnapshot(qRef, (snap) => {
      const data: Post[] = [];
      snap.forEach((doc) => data.push({ id: doc.id, ...doc.data() } as Post));
      setPosts(data);
    });
    return () => unsub();
  }, []);

  const postMessage = async () => {
    if (!content.trim()) return;
    // Anonymous post: don't store userId or store hashed user ID
    await addDoc(collection(db, "communityPosts"), {
      content,
      timestamp: serverTimestamp(),
    });
    setContent("");
  };

  return (
    <Box p={4}>
      <Heading>Community Growth Stories</Heading>
      <Textarea
        placeholder="Share something you're learning or a recent insight..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        my={2}
      />
      <Button onClick={postMessage} colorScheme="blue">
        Post Anonymously
      </Button>
      <Box mt={4}>
        {posts.map((p) => (
          <Box key={p.id} p={2} mb={2} borderWidth="1px" borderRadius="md">
            <Text>{p.content}</Text>
            <Text fontSize="sm" color="gray.500">
              {p.timestamp?.toDate()?.toLocaleString()}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
