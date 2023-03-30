class AuthHelper {
  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  getToken() {
    const token = localStorage.getItem('token');
    return token;
  }

  removeToken() {
    localStorage.removeItem('token');
  }
}

const authHelper = new AuthHelper();

export default authHelper;
