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
                className={`mx-auto flex h-[100px] w-[100px] items-center justify-center rounded-3xl border border-transparent ${
                  isActive ? 'bg-[#f8a29e]' : 'bg-[#ffe4e1]'
                }`}
              >
                <Icon className="h-9 w-9 text-[#195459]" strokeWidth={2.2} />
              </div>
              <p
                className={`mt-1 text-[20px] leading-none ${
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
