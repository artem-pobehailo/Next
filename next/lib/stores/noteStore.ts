// app/lib/stores/noteStore.ts

import { create } from 'zustand';

import { NewNoteData } from '../../types/note';
import { persist } from 'zustand/middleware';
type NoteDraftStore = {
  draft: NewNoteData;
  setDraft: (note: NewNoteData) => void;
  clearDraft: () => void;
};

const initialDraft: NewNoteData = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useNoteDraftStore = create<NoteDraftStore>()(
  // 2. Обгортаємо функцію створення стора
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) => set(() => ({ draft: note })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      // Ключ у localStorage
      name: 'note-draft',
      // Зберігаємо лише властивість draft
      partialize: (state) => ({ draft: state.draft }),
    },
  ),
);
