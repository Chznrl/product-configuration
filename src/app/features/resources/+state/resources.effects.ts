import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ResourcesActions } from './resources.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { ResourcesApi } from '../api/resources.api';

@Injectable()
export class ResourcesEffects {
    private actions$: Actions = inject(Actions)
    private api: ResourcesApi = inject(ResourcesApi)

    loadResources$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ResourcesActions.loadResources),
            switchMap(() =>
                this.api.getResources().pipe(
                    map((resources) => ResourcesActions.loadResourcesSuccess({ resources })),
                    catchError((e) =>
                        of(ResourcesActions.loadResourcesFailure({ error: toMessage(e) }))
                    )
                )
            )
        )
    );

    loadResource$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ResourcesActions.loadResource),
            switchMap(({ id }) =>
                this.api.getResourceById(id).pipe(
                    map((resource) => ResourcesActions.loadResourceSuccess({ resource })),
                    catchError((e) =>
                        of(ResourcesActions.loadResourceFailure({ error: toMessage(e) }))
                    )
                )
            )
        )
    );
}

function toMessage(err: unknown): string {
    if (typeof err === 'string') return err;
    if (err && typeof err === 'object' && 'message' in err) return String(err.message);
    return 'Unexpected error';
}
