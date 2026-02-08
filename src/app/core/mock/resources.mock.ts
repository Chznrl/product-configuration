import { Resource } from '@core/models/resource.model';

export const RESOURCES_MOCK: Resource[] = [
  {
    id: '1',
    name: 'Customer Portal',
    type: 'STANDARD',
    status: 'ACTIVE',
    updatedAt: '2024-12-01T10:15:00Z',
  },
  {
    id: '2',
    name: 'Pricing Engine',
    type: 'ADVANCED',
    status: 'INACTIVE',
    updatedAt: '2024-11-20T08:00:00Z',
  }
];
