import { AuthRequest, handleCommonError } from "../utils/Request";

export const SettingService = {
  getAll: () => {
    return AuthRequest.get('/api/setting').catch(handleCommonError);
  },
  getAllOfUser: (username) => {
    return AuthRequest.get('/api/setting/getSettingOfUser?username=' + username)
      .catch(handleCommonError);
  },
  saveSetting: (settings) => {
    return AuthRequest.post('/api/setting', settings).catch(handleCommonError)
  }
};
