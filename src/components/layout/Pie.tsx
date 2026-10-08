import { perfil } from '../../content/perfil'
import { LogoUPCH } from '../ui/Logo'

export function Pie() {
  return (
    <footer className="bg-petroleo-900 py-14 text-white/80">
      <div className="contenedor grid gap-10 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <p className="font-display text-2xl text-white">{perfil.nombre}</p>
          <p className="mt-2 max-w-lg text-sm leading-relaxed">
            {perfil.curso} · {perfil.codigo} · {perfil.periodo}
            <br />
            Carrera de {perfil.carrera}
            <br />
            Docente: {perfil.docente}
          </p>
        </div>
        <div className="flex flex-col gap-4 md:col-span-5 md:items-end">
          <LogoUPCH className="h-9" />
          <p className="max-w-sm text-xs leading-relaxed text-white/65 md:text-right">
            Portafolio académico personal elaborado por la estudiante. El logo identifica su afiliación universitaria; este sitio no es una publicación oficial de la {perfil.universidad}.
          </p>
        </div>
      </div>
    </footer>
  )
}
