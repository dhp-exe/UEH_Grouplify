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
}

const items = [
  { key: 'explore', label: 'Khám phá', icon: Search, to: '/explore' },
  { key: 'chat', label: 'Trò chuyện', icon: MessageCircle, to: '/chat/flareup' },
  { key: 'find-group', label: 'Tìm nhóm', icon: Users, to: '/find-group/menu' },
  { key: 'tasks', label: 'Công việc', icon: CalendarDays, to: '/tasks' },
  { key: 'profile', label: 'Tôi', icon: CircleUserRound, to: '/' },
] as const

function BottomNav({ active }: BottomNavProps) {
  return (
    <footer className="absolute bottom-2 left-0 right-0 z-40 bg-inherit px-3 pb-1 pt-2">
      <div className="flex items-end justify-between gap-2">
        {items.map((item) => {
          const isActive = item.key === active
          const Icon = item.icon

          return (
            <Link key={item.key} to={item.to} className="w-full text-center">
              <div
                className={`mx-auto flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl border border-transparent ${
                  isActive ? 'bg-[#f8a29e]' : 'bg-[#ffe4e1]'
                }`}
              >
                <Icon className="h-6 w-6 text-[#195459]" strokeWidth={2.2} />
              </div>
              <p
                className={`mt-1 text-[10px] sm:text-xs leading-none ${
                  isActive ? 'text-[#f8a29e]' : 'text-[#195459]'
                }`}
              >
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
