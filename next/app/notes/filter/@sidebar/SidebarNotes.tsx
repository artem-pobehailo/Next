import Link from 'next/link';
import css from './SidebarNotes.module.css';

interface SidebarNotesProps {
  notes: string[];
}

export default function SidebarNotes({ notes }: SidebarNotesProps) {
  return (
    <>
      <Link className={css.menuLink} href="/notes/action/create">
        Create note
      </Link>
      <ul className={css.menuList}>
        <li className={css.menuItem}>
          <Link href={`/notes/filter/all`} className={css.menuLink}>
            All notes
          </Link>
        </li>

        {notes.map((note) => (
          <li key={note} className={css.menuItem}>
            <Link className={css.menuLink} href={`/notes/filter/${note}`}>
              {note}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
