import { CATEGORIES } from './endpoints';
import { axiosInstance } from 'utils/api/axios';

class Services {
  static async getCategories(searchParams?: object) {
    const res = await axiosInstance.get(CATEGORIES, {
      params: searchParams,
    });
    return res.data;
  }
}

export default Services;
