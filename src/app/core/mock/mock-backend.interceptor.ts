import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { RESOURCES_MOCK } from './resources.mock';
import { Resource } from '@core/models/resource.model';

@Injectable()
export class MockBackendInterceptor implements HttpInterceptor {
    private readonly latencyMs = 250;

    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        // Only intercept API calls (keeps it safe if you later add real endpoints)
        if (!req.url.startsWith('/api')) {
            return next.handle(req);
        }

        // GET /api/resources
        if (req.method === 'GET' && this.isExactPath(req.url, '/api/resources')) {
            return of(
                new HttpResponse<Resource[]>({
                    status: 200,
                    body: RESOURCES_MOCK,
                })
            ).pipe(delay(this.latencyMs));
        }

        // GET /api/resources/{id}
        const resourceId = this.matchResourceId(req.url);
        if (req.method === 'GET' && resourceId) {
            // Example error case: id === '500' -> simulate server error
            if (resourceId === '500') {
                return throwError(() => ({
                    status: 500,
                    message: 'Mock: internal server error',
                }));
            }

            const found = RESOURCES_MOCK.find((r) => r.id === resourceId);
            if (!found) {
                return throwError(() => ({
                    status: 404,
                    message: `Mock: resource '${resourceId}' not found`,
                }));
            }

            return of(
                new HttpResponse<Resource>({
                    status: 200,
                    body: found,
                })
            ).pipe(delay(this.latencyMs));
        }

        // fall through for any other /api endpoints
        return next.handle(req);
    }

    private isExactPath(url: string, expected: string): boolean {
        return this.stripQuery(url) === expected;
    }

    private matchResourceId(url: string): string | null {
        const path = this.stripQuery(url);
        const match = path.match(/^\/api\/resources\/([^/]+)$/);
        return match?.[1] ?? null;
    }

    private stripQuery(url: string): string {
        return url.split('?')[0];
    }
}
