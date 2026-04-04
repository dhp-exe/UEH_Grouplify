import {
  CalendarDays,
  CircleUserRound,
  MessageCircle,
  Search,
  Users,
} from 'lucide-react'
import { Link } from 'react-router-dom'

type BottomNavProps = {
  active: 'explore' | 'chat' | 'find-group' | 'tasks' | 'profile'
  highlightAllLabels?: boolean
}

const items = [
  { key: 'explore', label: 'Khám phá', icon: Search, to: '/explore' },
  { key: 'chat', label: 'Trò chuyện', icon: MessageCircle, to: '/chat/flareup' },
  { key: 'find-group', label: 'Tìm nhóm', icon: Users, to: '/find-group/menu' },
  { key: 'tasks', label: 'Công việc', icon: CalendarDays, to: '/tasks' },
  { key: 'profile', label: 'Tôi', icon: CircleUserRound, to: '/' },
] as const

function BottomNav({ active, highlightAllLabels = false }: BottomNavProps) {
  return (
    <footer className="absolute bottom-4 left-0 right-0 z-40 bg-inherit px-3 pb-1 pt-2">
      <div className="flex items-end justify-between gap-2">
        {items.map((item) => {
          const isActive = item.key === active
          const Icon = item.icon
          const labelColorClass = highlightAllLabels
            ? 'text-[#f8a29e]'
            : isActive
              ? 'text-[#f8a29e]'
              : 'text-[#195459]'

          return (
            <Link
              key={item.key}
              to={item.to}
              className="group w-full text-center transition-transform duration-200 ease-out hover:-translate-y-1 hover:scale-110 focus-visible:-translate-y-1 focus-visible:scale-105"
            >
              <div
                className={`mx-auto flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl border border-transparent transition-shadow duration-200 group-hover:shadow-lg group-focus-visible:shadow-lg ${
                  isActive ? 'bg-[#f8a29e]' : 'bg-[#ffe4e1]'
                }`}
              >
                <Icon className="h-6 w-6 text-[#195459]" strokeWidth={2.2} />
              </div>
              <p className={`mt-1 text-[10px] sm:text-xs leading-none ${labelColorClass}`}>
                {item.label}
              </p>
            </Link>
          )
        })}
      </div>
    </footer>
  )
}

export default BottomNav
