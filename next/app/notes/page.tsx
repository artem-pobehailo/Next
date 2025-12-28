// app/notes/page.tsx
type Props = {
  params: Promise<{ id: string }>;
};
import NoteList from '@/components/NoteList/NoteList';
import fetchNotes from '@/lib/api';

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NoteClient from './filter/[...slug]/Note.client';

const Notes = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, { debouncedSearch: '' }],
    queryFn: () => fetchNotes({ page: 1, search: '' }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteClient />
    </HydrationBoundary>
  );
};

export default Notes;
