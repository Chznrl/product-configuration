import { createSelector } from '@ngrx/store';
import { resourcesFeature } from './resources.reducer';
import { Resource } from '@core/models/resource.model';
import { ResourceDetailVm, ResourcesListVm } from './resources.vm';

export const selectResourcesState = resourcesFeature.selectResourcesState;

export const selectAllResources = resourcesFeature.selectResources;
export const selectSelectedId = resourcesFeature.selectSelectedId;
export const selectLoading = resourcesFeature.selectLoading;
export const selectError = resourcesFeature.selectError;

export const selectSelectedResource = createSelector(
    selectAllResources,
    selectSelectedId,
    (resources, selectedId): Resource | null => (resources.find((r) => r.id === selectedId) ?? null)
);

export const selectResourcesListVm = createSelector(
    selectAllResources,
    selectLoading,
    selectError,
    (resources, loading, error): ResourcesListVm => ({ resources, loading, error })
);

export const selectResourceDetailVm = createSelector(
    selectSelectedResource,
    selectLoading,
    selectError,
    (resource, loading, error): ResourceDetailVm => ({ resource, loading, error })
);