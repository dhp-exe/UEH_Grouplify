import { BatteryFull, Signal, Wifi } from 'lucide-react'

type StatusBarProps = {
  dark?: boolean
}

function StatusBar({ dark = true }: StatusBarProps) {
  const tone = dark ? 'text-[#11111b]' : 'text-[#11111b]'

  return (
    <header className="mb-4 flex items-center justify-between px-2 py-2 text-2xl">
      <span className={`${tone}`}>12:30</span>
      <div className={`flex items-center gap-2 ${tone}`}>
        <Signal className="h-6 w-6" />
        <Wifi className="h-6 w-6" />
        <BatteryFull className="h-7 w-7" />
      </div>
    </header>
  )
}

export default StatusBar
