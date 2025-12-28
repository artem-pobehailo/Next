import NoteList from '@/components/NoteList/NoteList';
import fetchNotes from '@/lib/api';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function FilteredNotesPage({ params }: Props) {
  const { slug } = (await params) ?? ['all'];
  const tag = slug[0] === 'all' ? undefined : slug[0];

  const response = await fetchNotes({ tag });
  const notes = response.notes;

  return (
    <div>
      <NoteList notes={notes} />
    </div>
  );
}
