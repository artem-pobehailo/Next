// components/NoteItem/NoteItem.tsx

import { Note } from '@/lib/api';

type Props = {
  item: Note;
};

const NoteItem = ({ item }: Props) => {
  return (
    <li>
      <p>{item.title}</p>
    </li>
  );
};

export default NoteItem;
