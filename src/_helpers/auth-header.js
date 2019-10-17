export function authHeader() {
    // return authorization header with jwt token

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));//authenticationService.currentUserValue;
    if (currentUser && currentUser.accessToken) {
        return { Authorization: `Bearer ${currentUser.accessToken}` };
    } else {
        return {};
    }
}