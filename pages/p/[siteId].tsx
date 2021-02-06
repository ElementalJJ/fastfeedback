import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';

import Feedback from '@/components/Feedback';
import { useAuth } from '@/lib/auth';
import { createFeedback } from '@/lib/db';
import { getAllFeedback, getAllSites } from '@/lib/db-admin';

export const getStaticProps: GetStaticProps = async (context) => {
  const siteId = context.params?.siteId;
  const { feedback } = await getAllFeedback(siteId);

  return {
    props: {
      initialFeedback: feedback
    }
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { sites } = await getAllSites();
  const paths = sites.map((site: any) => ({
    params: {
      siteId: site.id.toString()
    }
  }));

  return {
    paths,
    fallback: false
  };
};

const SiteFeedback = ({ initialFeedback }: any) => {
  const auth: any = useAuth();
  const router = useRouter();
  const inputEl: any = useRef(null);
  const [allFeedback, setAllFeedback] = useState(initialFeedback);

  const onSubmit = (e: any) => {
    e.preventDefault();

    const newFeedback = {
      author: auth.user.name || 'Anonymous',
      authorId: auth.user.uid,
      siteId: router.query.siteId,
      text: inputEl.current?.value,
      createdAt: new Date().toISOString(),
      provider: auth.user.provider,
      status: 'pending'
    };

    setAllFeedback([newFeedback, ...allFeedback]);
    createFeedback(newFeedback);
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      width="full"
      maxWidth="700px"
      margin="0 auto"
    >
      <Box as="form" onSubmit={onSubmit}>
        <FormControl my={8}>
          <FormLabel htmlFor="comment">Comment</FormLabel>
          <Input ref={inputEl} type="comment" id="comment" />
          <Button mt={2} type="submit" fontWeight="medium">
            Add Comment
          </Button>
        </FormControl>
      </Box>
      {allFeedback.map((feedback: any) => (
        <Feedback key={feedback.id} {...feedback} />
      ))}
    </Box>
  );
};

export default SiteFeedback;
