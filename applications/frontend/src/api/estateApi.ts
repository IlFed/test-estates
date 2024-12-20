import axiosInstance from './axiosInstance';
import { type Estate } from '../types';

export const getEstates = async (
  params: { city?: string; search?: string } = {}
): Promise<Estate> => {
  try {
    const response = await axiosInstance.get('/estates', { params });
    return response.data;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(
        `The list of properties could not be retrieved: ${err.message}`
      );
    }
    throw new Error(
      'The list of properties could not be retrieved: Unknown error'
    );
  }
};
