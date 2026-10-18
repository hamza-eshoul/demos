import { ApiError } from '@/lib/apiError';

export class ApiErrorUtils {
  static message(error: unknown): string | null {
    if (!error) return null;
    if (!(error instanceof ApiError)) return 'Something went wrong. Try again.';
    try {
      const body = JSON.parse(error.message) as { message?: string | string[] };
      const message = body.message;
      if (Array.isArray(message)) return message.join('. ');
      if (typeof message === 'string') return message;
    } catch {
      return error.message || 'Request failed';
    }
    return 'Request failed';
  }
}
