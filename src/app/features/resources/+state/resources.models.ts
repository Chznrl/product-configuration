import { Resource } from '@core/models/resource.model';

export interface ResourcesState {
    resources: Resource[];
    selectedId: string | null;
    loading: boolean;
    error: string | null;
}

export const initialResourcesState = {
    resources: [],
    selectedId: null,
    loading: false,
    error: null,
};
