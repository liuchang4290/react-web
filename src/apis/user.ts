import { post } from '../utils/request';
const userApi = {
  login: () => post('/login'),
};

export default userApi;
