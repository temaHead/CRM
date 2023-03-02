import db from '../../db.json';

import Request from './types/Request';

export async function getRequest(): Promise<any> {
  const result = db;
  return result;
}

export async function addRequest(data: Request): Promise<Request> {
  return data;
}

export async function deletedRequest(id: string): Promise<string> {
  return id;
}

export async function changeRequest(newRequest: Request): Promise<Request> {
  return newRequest;
}
