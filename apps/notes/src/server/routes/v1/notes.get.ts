import { HttpErrorResponse } from '@angular/common/http';
import { Note } from 'apps/notes/src/app/note';
import { defineEventHandler, createError } from 'h3';

export default defineEventHandler(async () => {
  try {
    const data = await $fetch<Note[]>('https://localhost:5001/api/notes');
    return data;
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage:
        err instanceof HttpErrorResponse
          ? err.error
          : 'Error getting the notes.',
    });
  }
});
