import { Note } from 'apps/notes/src/app/note';
import { defineEventHandler, getRouterParam, readBody } from 'h3';
import { handleFetchError } from '../../../error';

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id');
    const data = await $fetch<Note>(`http://localhost:5000/api/notes/${id}`, {
      method: 'DELETE',
    });
    return data;
  } catch (err) {
    throw handleFetchError(err, 'An error occurred while deleting the note');
  }
});
