import { Resource } from '@core/models/resource.model';

export interface ResourcesListVm {
    resources: Resource[];
    loading: boolean;
    error: string | null;
}

export interface ResourceDetailVm {
    resource: Resource | null;
    loading: boolean;
    error: string | null;
}
