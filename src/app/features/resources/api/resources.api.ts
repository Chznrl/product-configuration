import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Resource } from '@core/models/resource.model';
import { Observable } from 'rxjs';
import { paths } from '@core/api/generated/api-types';


type GetResourcesResponse =
    paths['/resources']['get']['responses'][200]['content']['application/json'];

type GetResourceByIdResponse =
    paths['/resources/{id}']['get']['responses'][200]['content']['application/json'];

@Injectable({ providedIn: 'root' })
export class ResourcesApi {
    private readonly baseUrl = '/api';

    private http: HttpClient = inject(HttpClient)

    getResources(): Observable<Resource[]> {
        return this.http.get<GetResourcesResponse>(`${this.baseUrl}/resources`);
    }

    getResourceById(id: string): Observable<Resource> {
        return this.http.get<GetResourceByIdResponse>(`${this.baseUrl}/resources/${id}`);
    }
}
