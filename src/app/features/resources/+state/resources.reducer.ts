import { createFeature, createReducer, on } from '@ngrx/store';
import { Resource } from '@core/models/resource.model';
import { ResourcesActions } from './resources.actions';

export interface ResourcesState {
    resources: Resource[];
    selectedId: string | null;
    loading: boolean;
    error: string | null;
}

export const initialState: ResourcesState = {
    resources: [],
    selectedId: null,
    loading: false,
    error: null,
};

function upsertById(list: Resource[], item: Resource): Resource[] {
    const idx = list.findIndex((x) => x.id === item.id);
    if (idx === -1) {
        return [...list, item]
    };
    const copy = list.slice();
    copy[idx] = item;
    return copy;
}

export const resourcesFeature = createFeature({
    name: 'resources',
    reducer: createReducer(
        initialState,

        on(ResourcesActions.loadResources, (state) => ({
            ...state,
            loading: true,
            error: null,
        })),
        on(ResourcesActions.loadResourcesSuccess, (state, { resources }) => ({
            ...state,
            loading: false,
            resources,
        })),
        on(ResourcesActions.loadResourcesFailure, (state, { error }) => ({
            ...state,
            loading: false,
            error,
        })),

        on(ResourcesActions.selectResource, (state, { id }) => ({
            ...state,
            selectedId: id,
        })),

        on(ResourcesActions.loadResource, (state) => ({
            ...state,
            loading: true,
            error: null,
        })),
        on(ResourcesActions.loadResourceSuccess, (state, { resource }) => ({
            ...state,
            loading: false,
            resources: upsertById(state.resources, resource),
            selectedId: resource.id,
        })),
        on(ResourcesActions.loadResourceFailure, (state, { error }) => ({
            ...state,
            loading: false,
            error,
        }))
    ),
});
