import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ResourcesActions } from './resources.actions';
import * as sel from './resources.selectors';
import { Observable } from 'rxjs';
import { ResourceDetailVm, ResourcesListVm } from './resources.vm';

@Injectable()
export class ResourcesFacade {
    private store: Store = inject(Store)
    readonly resourcesList$: Observable<ResourcesListVm> = this.store.select(sel.selectResourcesListVm);
    readonly resourceSelected$: Observable<ResourceDetailVm> = this.store.select(sel.selectResourceDetailVm);

    initResourcesList(): void {
        this.store.dispatch(ResourcesActions.loadResources());
    }

    initResourceDetail(id: string): void {
        this.store.dispatch(ResourcesActions.loadResource({ id }));
        this.store.dispatch(ResourcesActions.selectResource({ id }));
    }
}
