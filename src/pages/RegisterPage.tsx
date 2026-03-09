import { useState } from "react";
import { User as UserIcon, Mail, Lock, Sparkles, MapPin, Hash } from 'lucide-react';
import { useAuth } from "../context/AuthContext";
import type { RegisterRequest } from "../types/auth.types";
import { replace, useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const { register } = useAuth();

    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [dni, setDni] = useState('');
    const [password, setPassword] = useState('');
    const [direction, setDirection] = useState('');
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const user: RegisterRequest = {
        name: name,
        lastname: lastname,
        dni: dni,
        email: email,
        password: password,
        direction: direction,
    }
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await register(user);
            navigate('login', { replace: true })
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Ocurrio un error al registrarse');
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen min-w-screen bg-gradient-to-br from-mabbyts-cream via-background to-white flex items-center justify-center p-4">
            {/* Decorative background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-mabbyts-tan/20 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-mabbyts-caramel/15 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-mabbyts-brown/10 rounded-full blur-3xl" />
            </div>

            <div className="relative w-full max-w-lg mt-8 mb-8">
                {/* Card */}
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl shadow-mabbyts-brown/10 border border-mabbyts-cream p-8">
                    {/* Logo Section */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="relative">
                            <div className="absolute inset-0 rounded-full blur-xl scale-110" />
                            <img
                                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_7erze77erze77erz-4EZOI7L0OGQOMftw59UYNyO8jQYQpS.png"
                                alt="Mabbyts Software Solutions"
                                className="relative w-24 h-24 object-contain drop-shadow-lg [mask-image:radial-gradient(ellipse_100%_100%_at_50%_50%,#000_10%,transparent_60%)]"
                            />
                        </div>
                        <h1 className="mt-4 text-2xl font-bold text-mabbyts-dark">
                            Crear cuenta
                        </h1>
                        <p className="mt-2 text-mabbyts-brown/70 text-center text-sm">
                            Registrate para empezar a trackear tus hábitos
                        </p>
                    </div>

                    {/* Register Form */}
                    <form onSubmit={handleRegister} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            {/* Name Field */}
                            <div className="space-y-2">
                                <label htmlFor="name" className="block text-sm font-medium text-mabbyts-dark">Nombre</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <UserIcon className="h-5 w-5 text-mabbyts-tan" />
                                    </div>
                                    <input
                                        id="name"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Tu nombre"
                                        className="w-full pl-10 pr-4 py-3 bg-mabbyts-cream/30 border border-mabbyts-tan/30 rounded-xl text-mabbyts-dark placeholder:text-mabbyts-brown/40 focus:outline-none focus:ring-2 focus:ring-mabbyts-caramel focus:border-transparent transition-all duration-200"
                                    />
                                </div>
                            </div>

                            {/* Lastname Field */}
                            <div className="space-y-2">
                                <label htmlFor="lastname" className="block text-sm font-medium text-mabbyts-dark">Apellido</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <UserIcon className="h-5 w-5 text-mabbyts-tan" />
                                    </div>
                                    <input
                                        id="lastname"
                                        type="text"
                                        value={lastname}
                                        onChange={(e) => setLastname(e.target.value)}
                                        placeholder="Tu apellido"
                                        className="w-full pl-10 pr-4 py-3 bg-mabbyts-cream/30 border border-mabbyts-tan/30 rounded-xl text-mabbyts-dark placeholder:text-mabbyts-brown/40 focus:outline-none focus:ring-2 focus:ring-mabbyts-caramel focus:border-transparent transition-all duration-200"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* DNI Field */}
                        <div className="space-y-2">
                            <label htmlFor="dni" className="block text-sm font-medium text-mabbyts-dark">DNI</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Hash className="h-5 w-5 text-mabbyts-tan" />
                                </div>
                                <input
                                    id="dni"
                                    type="text"
                                    value={dni}
                                    onChange={(e) => setDni(e.target.value)}
                                    placeholder="Tu nro de documento"
                                    className="w-full pl-10 pr-4 py-3 bg-mabbyts-cream/30 border border-mabbyts-tan/30 rounded-xl text-mabbyts-dark placeholder:text-mabbyts-brown/40 focus:outline-none focus:ring-2 focus:ring-mabbyts-caramel focus:border-transparent transition-all duration-200"
                                />
                            </div>
                        </div>

                        {/* Address Field */}
                        <div className="space-y-2">
                            <label htmlFor="direction" className="block text-sm font-medium text-mabbyts-dark">Dirección</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MapPin className="h-5 w-5 text-mabbyts-tan" />
                                </div>
                                <input
                                    id="direction"
                                    type="text"
                                    value={direction}
                                    onChange={(e) => setDirection(e.target.value)}
                                    placeholder="Tu dirección"
                                    className="w-full pl-10 pr-4 py-3 bg-mabbyts-cream/30 border border-mabbyts-tan/30 rounded-xl text-mabbyts-dark placeholder:text-mabbyts-brown/40 focus:outline-none focus:ring-2 focus:ring-mabbyts-caramel focus:border-transparent transition-all duration-200"
                                />
                            </div>
                        </div>

                        {/* Email Field */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-mabbyts-dark">Correo electrónico</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-mabbyts-tan" />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="tu@email.com"
                                    className="w-full pl-10 pr-4 py-3 bg-mabbyts-cream/30 border border-mabbyts-tan/30 rounded-xl text-mabbyts-dark placeholder:text-mabbyts-brown/40 focus:outline-none focus:ring-2 focus:ring-mabbyts-caramel focus:border-transparent transition-all duration-200"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label htmlFor="password" className="block text-sm font-medium text-mabbyts-dark">Contraseña</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-mabbyts-tan" />
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="********"
                                    className="w-full pl-10 pr-12 py-3 bg-mabbyts-cream/30 border border-mabbyts-tan/30 rounded-xl text-mabbyts-dark placeholder:text-mabbyts-brown/40 focus:outline-none focus:ring-2 focus:ring-mabbyts-caramel focus:border-transparent transition-all duration-200"
                                />
                            </div>
                        </div>

                        {error && (
                            <p className="text-red-500 text-sm text-center font-medium">{error}</p>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3.5 px-4 bg-gradient-to-r from-mabbyts-brown to-mabbyts-dark text-white font-semibold rounded-xl shadow-lg shadow-mabbyts-brown/25 hover:shadow-xl hover:shadow-mabbyts-brown/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 mt-6"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    <span>Registrando...</span>
                                </>
                            ) : (
                                <>
                                    <Sparkles className="h-5 w-5" />
                                    <span>Registrarse</span>
                                </>
                            )}
                        </button>
                    </form>

                    {/* Sign in link */}
                    <p className="mt-6 text-center text-sm text-mabbyts-brown/70">
                        ¿Ya tienes una cuenta?{' '}
                        <a
                            href="/login"
                            className="font-semibold text-mabbyts-brown hover:text-mabbyts-dark transition-colors"
                        >
                            Inicia sesión acá
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}