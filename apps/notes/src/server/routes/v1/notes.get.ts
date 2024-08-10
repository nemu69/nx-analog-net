import { Note } from 'apps/notes/src/app/note';
import { defineEventHandler, createError } from 'h3';

export default defineEventHandler(async () => {
  try {
    const data = await $fetch<Note[]>('https://localhost:5001/api/notes', {
      method: 'GET',
    });
    return data;
  } catch (err) {
    // Handle fetch errors
    if (err instanceof Error) {
      const httpError = err as {
        statusCode?: number;
        statusMessage?: string;
        data?: any;
      };

      throw createError({
        statusCode: httpError.statusCode || 500,
        statusMessage:
          httpError.statusMessage ||
          err.message ||
          'An error occurred while fetching notes',
        data: {
          detail: httpError.data || err.message,
        },
      });
    } else {
      // Handle non-Error objects
      throw createError({
        statusCode: 500,
        statusMessage: 'An unexpected error occurred',
        data: {
          detail: String(err),
        },
      });
    }
  }
});
