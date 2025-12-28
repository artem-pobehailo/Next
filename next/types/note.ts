export interface Note {
  id: string;
  title: string;
  content: string;
  tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
  createdAt?: string;
  updatedAt?: string;
}

export interface NewNoteData {
  title: string;
  content: string;
  tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
}

// Параметри відповіді
export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}
