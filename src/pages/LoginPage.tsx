import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth();

    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await login({ email, password });
            navigate('/dashboard');
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Ocurrio un error!');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            {/*           ↑ flex + centra horizontal/vertical + ocupa toda la pantalla + fondo oscuro */}
            <div className="w-full max-w-md p-8 bg-gray-800 rounded-2xl shadow-xl">
                {/*       ↑ ancho máximo 28rem + padding + fondo card + bordes redondeados + sombra */}
                <h1 className="text-3xl font-bold text-white text-center mb-2">
                    Iniciar Sesión
                </h1>
                <p className="text-gray-400 text-center mb-8">
                    Ingresá tus credenciales para acceder a Mabbyts
                </p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/*                              ↑ space-y-6 = separa cada hijo con 1.5rem */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="tu@email.com"
                            required
                            className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg
                                       border border-gray-600 focus:outline-none focus:ring-2
                                       focus:ring-blue-500 focus:border-transparent
                                       placeholder-gray-400 transition-all duration-200"
                        // ↑ Desglose de clases:
                        //   w-full        = ocupa todo el ancho
                        //   px-4 py-3     = padding horizontal y vertical
                        //   bg-gray-700   = fondo del input
                        //   rounded-lg    = bordes redondeados
                        //   border        = borde visible
                        //   focus:ring-2  = al seleccionar, muestra un anillo azul
                        //   transition    = animación suave al cambiar estilos
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                            Contraseña
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Tu contraseña"
                            required
                            className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg
                                       border border-gray-600 focus:outline-none focus:ring-2
                                       focus:ring-blue-500 focus:border-transparent
                                       placeholder-gray-400 transition-all duration-200"
                        />
                    </div>
                    {/* Error message */}
                    {error && (
                        <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
                            {/*    ↑ bg-red-500/20 = rojo con 20% de opacidad (fondo semi-transparente) */}
                            {error}
                        </div>
                    )}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold
                                   rounded-lg transition-colors duration-200 disabled:opacity-50
                                   disabled:cursor-not-allowed cursor-pointer"
                    // ↑ Desglose:
                    //   hover:bg-blue-700      = cambia color al pasar el mouse
                    //   disabled:opacity-50    = se ve opaco cuando está deshabilitado
                    //   disabled:cursor-not-allowed = cursor de "no permitido"
                    >
                        {isLoading ? 'Ingresando...' : 'Ingresar'}
                    </button>
                </form>
            </div>
        </div>
    );
}