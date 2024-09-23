import { type GeoJSON } from 'geojson';
import { type GenericResponse, getRequest, patchRequest, postRequest } from "./genericApi.service";

export interface PlanningArea {
  id: number;
  uuid: string;
  name: string;
  status: string;
  shape: GeoJSON | null;
  jurisdiction?: string;
  fields: {
    description?: string;
  }
  modified: string;
  created?: string;
}

export interface NewPlanningArea {
  name: string;
}

export interface Duplicate {
  name: string;
  jurisdiction: string | null;
  similarityScore: number;
}

function processResponse<RDType>(response:GenericResponse<RDType>): RDType {
  if (response.success) {
    return response.data;
  } else {
    const errors = response.error.errors.length ? `: ${response.error.errors.join(', ')}` : '';
    throw new Error(response.error.message + errors);
  }
}

export const fakeCreated = async (area: NewPlanningArea): Promise<PlanningArea> => {
  // wait for a fake promise to resolve
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // return a fake response
  return {
    id: 1,
    uuid: 'fake-uuid',
    name: area.name,
    status: 'fake-status',
    shape: null,
    jurisdiction: 'fake-jurisdiction',
    fields:{
      description: 'fake-proclamation',
    },
    modified: 'fake-date',
    created: 'fake-date',
  };
}

export const checkForDuplicates = async (name: string): Promise<Duplicate[]> => {
  const response = await getRequest<Duplicate[]>(`/api/planning-area/fuzzy/${name?.trim()}`);
  return processResponse(response);
}

export const createPlanningArea = async (area: NewPlanningArea): Promise<PlanningArea> => {
  area.name = area.name.trim();
  const response = await postRequest<NewPlanningArea, PlanningArea>('/api/planning-area', area);
  return processResponse(response);
}

export const getPlanningAreas = async (): Promise<PlanningArea[]> => {
  const response = await getRequest<PlanningArea[]>('/api/planning-area');
  return processResponse(response);
}

export const getPlanningArea = async (id: string): Promise<PlanningArea> => {
  const response = await getRequest<PlanningArea>(`/api/planning-area/${id}`);
  return processResponse(response);
}

export const updatePlanningAreaShape = async (id: string | number, area: Partial<PlanningArea>): Promise<PlanningArea> => {
  area.jurisdiction = area.jurisdiction?.trim();
  if (area.fields?.description) area.fields.description = area.fields.description.trim();
  const response = await patchRequest<Partial<PlanningArea>, PlanningArea>(`/api/planning-area/${id}`, area);
  return processResponse(response);
}