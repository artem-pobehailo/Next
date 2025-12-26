import css from "./SearchBox.module.css";

interface SearchBarProps {
  onChange: (value: string) => void;
}

export default function SearchBarNotes({ onChange }: SearchBarProps) {
  return (
    <header className={css.header}>
      <div className={css.container}>
        <input
          className={css.input}
          type="text"
          name="query"
          autoComplete="off"
          placeholder="Search notes..."
          autoFocus
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </header>
  );
}
