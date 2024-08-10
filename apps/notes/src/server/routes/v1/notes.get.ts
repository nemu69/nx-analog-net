import { Note } from 'apps/notes/src/app/note';
import { defineEventHandler } from 'h3';
import { handleFetchError } from '../../error';

export default defineEventHandler(async () => {
  try {
    const data = await $fetch<Note[]>('http://localhost:5000/api/notes', {
      method: 'GET',
    });
    return data;
  } catch (err) {
    throw handleFetchError(err, 'An error occurred while fetching notes');
  }
});
