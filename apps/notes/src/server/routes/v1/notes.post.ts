import { Note } from 'apps/notes/src/app/note';
import { defineEventHandler, readBody } from 'h3';
import { handleFetchError } from '../../error';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const data = await $fetch<Note>('http://localhost:5000/api/notes', {
      method: 'POST',
      body,
    });
    return data;
  } catch (err) {
    throw handleFetchError(err, 'An error occurred while saving the note');
  }
});
