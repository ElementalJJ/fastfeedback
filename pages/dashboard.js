import Head from 'next/head';
import {
  Button,
  ButtonGroup,
  Code,
  Flex,
  Heading,
  Icon,
  Text
} from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';
import EmptyState from '@/components/EmptyState';

export default function Dashboard() {
  const auth = useAuth();

  if (!auth.user) {
    return 'Loading...';
  }
  return <EmptyState />;
}
