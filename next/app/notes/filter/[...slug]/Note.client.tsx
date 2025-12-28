'use client';
import css from './NotesPage.module.css';

import fetchNotes from '@/lib/api';
import { FetchNotesResponse } from '@/types/note';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import Loading from '../../../loading';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import ModalNotes from '@/components/ModalNotes/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBarNotes from '@/components/SearchBox/SearchBox';
interface Props {
  tag?: string;
}
export default function NoteClient({ tag }: Props) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { data, isLoading, isError } = useQuery<FetchNotesResponse>({
    queryKey: ['notes', page, debouncedSearch, tag],
    queryFn: () => fetchNotes({ page, search: debouncedSearch, tag }),
  });
  function handleSearchNotes(newQuery: string) {
    setSearch(newQuery);
    setPage(1);
  }

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <>
          <SearchBarNotes onChange={handleSearchNotes} />

          {data && data.totalPages > 1 && (
            <Pagination
              totalPages={data.totalPages}
              page={page}
              setPage={setPage}
            />
          )}
          <div>
            <button className={css.button} onClick={openModal}>
              Create note +
            </button>
            {isModalOpen && (
              <ModalNotes onClose={closeModal}>
                <NoteForm onSuccess={closeModal} />
              </ModalNotes>
            )}
          </div>
        </>
      </header>

      {isLoading && <Loading />}
      {isError && <ErrorMessage />}
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
    </div>
  );
}
