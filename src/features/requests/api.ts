import db from '../../db.json';

import Requiest from './types/Requiest';

export async function getRequiest(): Promise<any> {
  const result = db;
  return result;
}

export async function addRequest(data: Requiest): Promise<Requiest> {
  return data;
}

export async function deletedRequest(id: string): Promise<string> {
  return id;
}

export async function changeRequest(newRequest: any): Promise<any> {
  return newRequest;
}
