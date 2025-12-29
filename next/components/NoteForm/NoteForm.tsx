'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { NewNoteData, Note } from '../../types/note';
import css from './NoteForm.module.css';

import * as Yup from 'yup';

import { createNote } from '@/lib/api';
import { useRouter } from 'next/navigation';

import { useNoteDraftStore } from '@/lib/stores/noteStore';

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, 'Min 3 characters')
    .max(50, 'Max 50 characters')
    .required('Required'),
  content: Yup.string().max(500, 'Max 500 characters'),
  tag: Yup.mixed<Note['tag']>()
    .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'])
    .required('Required'),
});
type Props = {
  tags: string[];
};

export default function NoteForm({ tags }: Props) {
  const router = useRouter();

  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const queryClient = useQueryClient();
  const handleCancel = () => router.push('/notes/filter/all');
  const { mutate } = useMutation({
    mutationFn: (newNote: NewNoteData) => createNote(newNote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      clearDraft();
      handleCancel();
    },
    onError: () => {
      throw new Error('Failed to create note. Try again.');
    },
  });

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const tag = formData.get('tag') as Note['tag'];

    const values: NewNoteData = { title, content, tag };

    try {
      await validationSchema.validate(values, { abortEarly: false });
      mutate(values);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        alert(err.errors.join('\n'));
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title"> Title</label>
        <input
          id="title"
          required
          type="text"
          name="title"
          className={css.input}
          defaultValue={draft?.title}
          onChange={handleChange}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          defaultValue={draft?.content}
          onChange={handleChange}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          required
          defaultValue={draft?.tag}
          onChange={handleChange}
        >
          {tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button type="submit" className={css.submitButton}>
          Create note
        </button>
      </div>
    </form>
  );
}
