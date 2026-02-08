import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResourcesFacade } from '@features/resources/+state/resources.facade';

@Component({
  selector: 'app-resource-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resource-detail.html',
  styleUrls: ['./resource-detail.scss'],
})
export class ResourceDetail implements OnInit {
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  public id: string = this.activatedRoute.snapshot.paramMap.get('id') ?? '';

  private readonly resourceFacade: ResourcesFacade = inject(ResourcesFacade);
  public selectedResource$ = this.resourceFacade.resourceSelected$

  public ngOnInit(): void {
    this.resourceFacade.initResourceDetail(this.id)
  }
}
