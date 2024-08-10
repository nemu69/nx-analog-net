import { createError } from 'h3';

export function handleFetchError(
  err: any,
  defaultMessage: string = 'An error occurred'
) {
  if (err instanceof Error) {
    const httpError = err as {
      statusCode?: number;
      statusMessage?: string;
      data?: any;
    };

    return createError({
      statusCode: httpError.statusCode || 500,
      statusMessage: httpError.statusMessage || err.message || defaultMessage,
      data: {
        detail: httpError.data || err.message,
      },
    });
  } else {
    // Handle non-Error objects
    return createError({
      statusCode: 500,
      statusMessage: 'An unexpected error occurred',
      data: {
        detail: String(err),
      },
    });
  }
}
