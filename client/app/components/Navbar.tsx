"use client";

import { useState, useEffect } from "react";
import { Box, Flex, Spacer, Button, Heading, Link as ChakraLink } from "@chakra-ui/react";
import Link from "next/link";
import { auth } from "../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
  };

  return (
    <Box bg="white" boxShadow="md" px={4} py={2}>
      <Flex align="center">
        <Heading as="h3" size="md">
          <Link href="/">Liberate</Link>
        </Heading>
        <Spacer />
        <Flex gap={4}>
          {user ? (
            <>
              <Link href="/(dashboard)" passHref>
                <ChakraLink color={pathname?.includes("/(dashboard)") ? "blue.500" : "gray.700"}>
                  Dashboard
                </ChakraLink>
              </Link>
              <Button variant="outline" colorScheme="blue" onClick={handleSignOut}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/(auth)/login" passHref>
                <ChakraLink color={pathname?.includes("/login") ? "blue.500" : "gray.700"}>
                  Login
                </ChakraLink>
              </Link>
              <Link href="/(auth)/signup" passHref>
                <ChakraLink color={pathname?.includes("/signup") ? "blue.500" : "gray.700"}>
                  Signup
                </ChakraLink>
              </Link>
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  );
}
