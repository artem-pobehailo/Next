import NoteList from '@/components/NoteList/NoteList';
import fetchNotes from '@/lib/api';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

import NoteClient from './Note.client';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function FilteredNotesPage({ params }: Props) {
  const { slug } = (await params) ?? ['all'];
  const tag = slug[0] === 'all' ? undefined : slug[0];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', tag],
    queryFn: () => fetchNotes({ search: '', page: 1, perPage: 12, tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteClient tag={tag} />
    </HydrationBoundary>
  );
}
