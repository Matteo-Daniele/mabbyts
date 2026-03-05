const API_URL = import.meta.env.VITE_API_URL

export async function getHabits(token: string) {
    const response = await fetch(`${API_URL}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            //                ↑ Este es el formato que tu backend espera.
            //                  JwtStrategy extrae el token del header
            //                  "Authorization: Bearer <token>"
        },
    });

    if (!response.ok) {
        throw new Error('Error al obtener los habitos');
    }

    return response.json();
}