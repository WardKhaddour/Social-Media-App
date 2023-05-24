class LocalStorageHelper {
  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  getToken() {
    const token= localStorage.getItem('token');
    return token
  }
  removeToken() {
    localStorage.removeItem('token');
  }
}

const localStorageHelper = new LocalStorageHelper();

export default localStorageHelper;
