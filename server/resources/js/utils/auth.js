export function requireAuth(nextState, replace, next) {
    if (!false) {
        replace({
            pathname: "/auth/login",
            state: {nextPathname: nextState.location.pathname}
        });
    }
    next();
}