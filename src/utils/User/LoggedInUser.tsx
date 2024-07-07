import { jwtDecode, JwtPayload } from 'jwt-decode';
// Constants
import { TOKEN_NAME } from '../contstants/Constants';

export default function LoggedInUser() {
  const loadedToken = localStorage.getItem(TOKEN_NAME);
  console.log('loaded token', loadedToken);
  if (loadedToken === null || loadedToken === '') {
    return null;
  }

  const decoded = jwtDecode<JwtPayload>(loadedToken);
  console.log('decoded', decoded);
  return decoded;
}
