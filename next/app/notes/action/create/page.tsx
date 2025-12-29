import NoteForm from '@/components/NoteForm/NoteForm';
import { fetchTags } from '@/lib/api';
import { Note } from '@/types/note';

const CreateNote = async () => {
  const tags = await fetchTags();

  return <NoteForm tags={tags} />;
};

export default CreateNote;
