import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Resource } from '@core/models/resource.model';

export const ResourcesActions = createActionGroup({
    source: 'Resources',
    events: {
        'Load Resources': emptyProps(),
        'Load Resources Success': props<{ resources: Resource[] }>(),
        'Load Resources Failure': props<{ error: string }>(),

        'Select Resource': props<{ id: string | null }>(),

        'Load Resource': props<{ id: string }>(),
        'Load Resource Success': props<{ resource: Resource }>(),
        'Load Resource Failure': props<{ error: string }>(),
    },
});
