import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ResourcesFacade } from '@features/resources/+state/resources.facade';
import { ResourcesListVm } from '@features/resources/+state/resources.vm';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-resource-list',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './resource-list.html',
  styleUrls: ['./resource-list.scss'],
})
export class ResourceList implements OnInit {
  private readonly resourceFacade: ResourcesFacade = inject(ResourcesFacade);
  public resourceList$: Observable<ResourcesListVm> = this.resourceFacade.resourcesList$

  public ngOnInit(): void {
    this.resourceFacade.initResourcesList()
  }
}
