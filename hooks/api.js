import { useQuery, useMutation } from 'react-query';
import axios from 'axios';

const API_ENDPOINTS = {
  PROFILE: '/profile',
  PROVIDERS: '/providers',
  BASE_URL: 'http://localhost:3001',
  CANCER_TYPES: '/cancer-types',
};

async function fetchProfile(id) {
  return axios
    .get(`${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.PROFILE}/${id}`)
    .then((response) => response.data);
}

async function fetchProviders() {
  return axios
    .get(`${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.PROVIDERS}`)
    .then((response) => response.data);
}

export function useProviders() {
  return useQuery(['providers'], () => fetchProviders());
}

function patchProfile(id, data) {
  return axios
    .patch(`${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.PROFILE}/${id}`, data)
    .then((response) => response.data);
}

function patchAccess(id, data) {
  return axios
    .patch(
      `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.PROFILE}/${id}/access`,
      data
    )
    .then((response) => response.data);
}

// Custom hooks
export function useProfile(id) {
  return useQuery(['profile', id], () => fetchProfile(id));
}

export function usePatchProfile() {
  const mutation = useMutation((payload) =>
    patchProfile(payload.id, payload.data)
  );
  return mutation;
}

export function usePatchAccess() {
  const mutation = useMutation((payload) =>
    patchAccess(payload.id, payload.data)
  );
  return mutation;
}

export default API_ENDPOINTS;
