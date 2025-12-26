import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { NewNoteData, Note } from '../../types/note';
import css from './NoteForm.module.css';

import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from 'formik';
import { useId } from 'react';
import * as Yup from 'yup';

import { createNote } from '@/lib/api';

export interface NoteFormProps {
  onSuccess: () => void;
}

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

export default function NoteForm({ onSuccess }: NoteFormProps) {
  const fieldId = useId();

  const handleSubmit = (
    values: NewNoteData,
    actions: FormikHelpers<NewNoteData>,
  ) => {
    Mutation.mutate(values);
    actions.resetForm();
  };

  const queryClient = useQueryClient();
  const Mutation = useMutation({
    mutationFn: (newNote: NewNoteData) => createNote(newNote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onSuccess();
    },
    onError: () => {
      throw new Error('Failed to create note. Try again.');
    },
  });
  return (
    <Formik
      initialValues={{ title: '', content: '', tag: 'Todo' as Note['tag'] }}
      validationSchema={validationSchema}
      className={css.form}
      onSubmit={handleSubmit}
    >
      <Form>
        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-title`}>Title</label>
          <Field
            id={`${fieldId}-title`}
            type="text"
            name="title"
            className={css.input}
          />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-content`}>Content</label>
          <Field
            id={`${fieldId}-content`}
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage name="content" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-tag`}>Tag</label>
          <Field
            as="select"
            id={`${fieldId}-tag`}
            name="tag"
            className={css.select}
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button
            type="button"
            className={css.cancelButton}
            onClick={onSuccess}
            disabled={Mutation.isPending}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={css.submitButton}
            disabled={Mutation.isPending}
          >
            {Mutation.isPending ? 'Creating...' : 'Create note'}
          </button>
        </div>
      </Form>
    </Formik>
  );
}
