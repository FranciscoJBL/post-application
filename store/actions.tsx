export const login = (token: string) => ({
    type: 'SET_TOKEN',
    payload: { token },
});