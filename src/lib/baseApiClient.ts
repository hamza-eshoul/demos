import { ApiError } from '@/lib/apiError';

export class BaseApiClient {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  protected get<T>(path: string): Promise<T> {
    return this.request<T>(path, { method: 'GET' });
  }

  protected post<T>(
    path: string,
    body: unknown,
    signal?: AbortSignal,
  ): Promise<T> {
    return this.request<T>(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal,
    });
  }

  protected patch<T>(path: string, body: unknown): Promise<T> {
    return this.request<T>(path, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  }

  protected delete<T>(path: string): Promise<T> {
    return this.request<T>(path, { method: 'DELETE' });
  }

  private async request<T>(path: string, init: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, init);
    if (!response.ok)
      throw new ApiError(response.status, await response.text());
    return response.json() as Promise<T>;
  }
}
