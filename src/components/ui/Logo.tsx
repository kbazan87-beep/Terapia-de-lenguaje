import logo from '../../assets/logo-upch.png'

/** Logo institucional sin alteraciones; se presenta sobre fondo blanco para respetar su arte original. */
export function LogoUPCH({ className = 'h-10' }: { className?: string }) {
  return (
    <span className="inline-flex rounded-xl bg-white px-3 py-2 ring-1 ring-linea">
      <img src={logo} alt="Universidad Peruana Cayetano Heredia" className={`${className} w-auto object-contain`} width={620} height={209} />
    </span>
  )
}
