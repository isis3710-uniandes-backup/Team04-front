/* eslint no-restricted-globals: 0 */
import auth0 from "auth0-js";
import jwtDecode from "jwt-decode";


const LOGIN_SUCCESS_PAGE = "/";
const LOGIN_FAILURE_PAGE = "/dd";
export default class Auth {
    auth0 = new auth0.WebAuth({
        domain: "dev-8atgjo3u.auth0.com",
        clientID: "5QzYwuc7BRuYOP4PuaO1eB83ecaqYv3V",
        audience: "https://dev-8atgjo3u.auth0.com/userinfo",
        responseType: "token id_token",
        scope: "openid profile"
    })

    constructor() {
        this.login = this.login.bind(this);
    }

    login() {
        this.auth0.authorize();
    }

    handleAuthentication() {
        this.auth0.parseHash((err, authResults) => {
            
            if (authResults && authResults.accessToken && authResults.idToken) {
                
                console.log(authResults);
                let expires = JSON.stringify((authResults.expiresIn) * 1000 + new Date().getTime());
                localStorage.setItem("access_token", authResults.accessToken);
                localStorage.setItem("id_token", authResults.idToken);
                localStorage.setItem("expires_at", expires);
                location.hash = "";

                fetch('/users', {
                    method: 'POST',
                    body: JSON.stringify({
                        idUsuario: authResults.idToken,
                        nombres: authResults.idTokenPayload.given_name,
                        apellidos: authResults.idTokenPayload.family_name,
                        nacionalidad: "Colombia",
                        correo: authResults.idTokenPayload.nickname + "@gmail.com",
                        fechaNacimiento: "",
                        username: "",
                        password: ""
                    }),
                    headers: { "Content-Type": "application/json" }
                })
                    .then(function (response) {
                        return response.json()
                    }).then(function (body) {
                    });
            }
            else if (err)
            {
                location.pathname = LOGIN_FAILURE_PAGE; 
                console.log(err);
            }
        });
    }

    isAuthenticated() {
        let expires = localStorage.getItem("expires_at");
        return new Date().getTime() < expires;
    }

    logout(){
        localStorage.removeItem("access_token");
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
        location.pathname = LOGIN_SUCCESS_PAGE;
    }
    
    getProfile() {
        if(localStorage.getItem("id_token")) {
            return jwtDecode(localStorage.getItem("id_token"));
        } else {
            return{};
        }
    }
}