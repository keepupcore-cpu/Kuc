import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#050505] text-white font-mono p-4">
      <h1 className="text-4xl text-red-500 mb-2">404</h1>
      <p className="text-lg opacity-60 mb-8">SISTEMA: ROTA NÃO ENCONTRADA</p>
      <Link href="/" className="px-6 py-2 border border-red-500 text-red-500 hover:bg-red-500/10 transition-colors">
        REINICIAR NÚCLEO
      </Link>
    </div>
  );
}
