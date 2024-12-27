"use client";

import { useState } from "react";
import { Box, Heading, Input, Button, Text } from "@chakra-ui/react";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async () => {
    const res = await fetch("/api/search", {
      method: "POST",
      body: JSON.stringify({ query }),
    });
    const data = await res.json();
    if (data.matches) {
      setResults(data.matches);
    }
  };

  return (
    <Box p={4}>
      <Heading mb={4}>Semantic Search</Heading>
      <Box display="flex" gap={2} mb={4}>
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search your reflections..."
        />
        <Button colorScheme="blue" onClick={handleSearch}>
          Search
        </Button>
      </Box>
      {results.map((r) => (
        <Box key={r.id} p={3} my={2} borderWidth="1px" borderRadius="md">
          <Text>Score: {r.score.toFixed(2)}</Text>
          <Text>{r.metadata?.text}</Text>
        </Box>
      ))}
    </Box>
  );
}
