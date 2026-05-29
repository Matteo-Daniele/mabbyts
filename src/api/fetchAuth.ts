/**
 * Wrapper around fetch that automatically dispatches a custom event
 * when the server returns 401 (Unauthorized) or 403 (Forbidden).
 *
 * AuthContext listens for this event and calls logout() immediately,
 * so the user is redirected to the login page regardless of which
 * API call triggered the expiry.
 */
export function fetchAuth(
    input: RequestInfo | URL,
    init?: RequestInit
): Promise<Response> {
    return fetch(input, init).then((response) => {
        if (response.status === 401 || response.status === 403) {
            window.dispatchEvent(new Event('auth:unauthorized'));
        }
        return response;
    });
}
