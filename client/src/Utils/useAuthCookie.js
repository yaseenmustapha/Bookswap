import { useCookies } from "react-cookie";
  
  export default function useAuthCookie() {
    const [cookies, setCookie] = useCookies(["jwt", "username"]);
    function setAuthCookie(username, access_token) {
        setCookie("jwt", access_token, { path: "/" });
        setCookie("username", username, { path: "/" });    
    }
    return [!!cookies.jwt, setAuthCookie];
}