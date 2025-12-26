import axios from 'axios';
import type { FetchNotesResponse, NewNoteData, Note } from '../types/note';

// Параметри запиту
type FetchNotesParams = {
  search?: string;
  tag?: string;
  page?: number;
  perPage?: number;
};

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const BASE_URL = 'https://notehub-public.goit.study/api';
if (!token) {
  throw new Error('API token is missing!');
}
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});

export default async function fetchNotes({
  search = '',
  page = 1,
  perPage = 12,
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> {
  const params: Record<string, string | number> = { page, perPage };
  if (search.trim()) params.search = search;
  if (tag) params.tag = tag;

  const response = await api.get<FetchNotesResponse>('/notes', { params });
  return response.data;
}

export async function createNote(newNote: NewNoteData): Promise<Note> {
  const response = await api.post<Note>('/notes', newNote);
  return response.data;
}
export async function deleteNote(id: string): Promise<Note> {
  const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
}
