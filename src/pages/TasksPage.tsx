import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import BottomNav from '../components/BottomNav'
import PhoneFrame from '../components/PhoneFrame'

const monthLabels = [
  'JANUARY',
  'FEBRUARY',
  'MARCH',
  'APRIL',
  'MAY',
  'JUNE',
  'JULY',
  'AUGUST',
  'SEPTEMBER',
  'OCTOBER',
  'NOVEMBER',
  'DECEMBER',
]

type TaskItem = {
  id: string
  title: string
  subtitle: string
  deadline: string
  done: boolean
}

const initialTasks: TaskItem[] = [
  {
    id: 'task-1',
    title: 'TƯ TƯỞNG HỒ CHÍ MINH',
    subtitle: 'Tìm nội dung',
    deadline: '04-04-2026',
    done: true,
  },
  {
    id: 'task-2',
    title: 'TƯ DUY THIẾT KẾ',
    subtitle: 'Thiết kế Canva',
    deadline: '07-04-2026',
    done: false,
  },
]

function TaskCard({
  id,
  title,
  subtitle,
  deadline,
  done,
  onToggle,
}: {
  id: string
  title: string
  subtitle: string
  deadline: string
  done: boolean
  onToggle: (id: string) => void
}) {
  return (
    <article className="rounded-[24px] bg-[#ffe4e1] p-4 shadow-xl">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onToggle(id)}
          aria-label={done ? 'Đánh dấu chưa hoàn thành' : 'Đánh dấu hoàn thành'}
          className={`rounded-2xl p-2 text-white transition hover:scale-105 focus-visible:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f8a29e] ${done ? 'bg-[#79dc7f]' : 'bg-[#f0656b]'}`}
        >
          <span className="mx-1 text-lg">{done ? '✓' : '✕'}</span>
        </button>
        <div>
          <h3 className="text-sm text-[#195459]">{title}</h3>
          <p className="text-sm text-[#2f2f2f]">{subtitle}</p>
          <p className="text-xs text-[#75605f]">Hạn chót: {deadline}</p>
        </div>
      </div>
    </article>
  )
}

function TasksPage() {
  const currentYear = new Date().getFullYear()
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [draftSubject, setDraftSubject] = useState('')
  const [draftTask, setDraftTask] = useState('')
  const [draftDate, setDraftDate] = useState('')
  const [draftDateError, setDraftDateError] = useState('')

  const doneCount = tasks.filter((task) => task.done).length

  const parseSlashDate = (value: string) => {
    const match = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/)
    if (!match) return null

    const day = Number(match[1])
    const month = Number(match[2])
    const year = Number(match[3])
    if (year !== currentYear || month < 1 || month > 12) return null

    const date = new Date(year, month - 1, day)
    const isValid =
      date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day

    if (!isValid) return null

    return { day, month, year }
  }

  const parseTaskDeadline = (value: string) => {
    const parts = value.split(/[-/]/)
    if (parts.length !== 3) return null

    const day = Number(parts[0])
    const month = Number(parts[1])
    const year = Number(parts[2])
    if (!day || !month || !year) return null

    return { day, month, year }
  }

  const statusByDay = useMemo(() => {
    const map: Record<string, 'done' | 'pending'> = {}

    tasks.forEach((task) => {
      const parsed = parseTaskDeadline(task.deadline)
      if (!parsed) return
      if (parsed.year !== currentYear || parsed.month !== currentMonth + 1) return

      const day = String(parsed.day)

      const existing = map[day]
      if (!existing) {
        map[day] = task.done ? 'done' : 'pending'
        return
      }

      map[day] = existing === 'pending' || !task.done ? 'pending' : 'done'
    })

    return map
  }, [currentMonth, currentYear, tasks])

  const calendarWeeks = useMemo(() => {
    const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay()
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

    const cells: string[] = []
    for (let i = 0; i < firstDayOfWeek; i += 1) cells.push('')
    for (let day = 1; day <= daysInMonth; day += 1) cells.push(String(day))
    while (cells.length % 7 !== 0) cells.push('')

    const weeks: string[][] = []
    for (let i = 0; i < cells.length; i += 7) {
      weeks.push(cells.slice(i, i + 7))
    }

    return weeks
  }, [currentMonth, currentYear])

  const handleToggleTask = (id: string) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, done: !task.done } : task)))
  }

  const handleCreateTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const subject = draftSubject.trim()
    const task = draftTask.trim()
    const parsedDate = parseSlashDate(draftDate.trim())

    if (!subject || !task || !parsedDate) {
      setDraftDateError(`Deadline phải đúng định dạng dd/mm/${currentYear}`)
      return
    }

    setDraftDateError('')
    const normalizedDate = `${String(parsedDate.day).padStart(2, '0')}-${String(parsedDate.month).padStart(2, '0')}-${parsedDate.year}`

    const createdTask: TaskItem = {
      id: `task-${Date.now()}`,
      title: subject.toUpperCase(),
      subtitle: task,
      deadline: normalizedDate,
      done: false,
    }

    setTasks((prev) => [createdTask, ...prev])
    setDraftSubject('')
    setDraftTask('')
    setDraftDate('')
    setIsCreateOpen(false)
  }

  const handleMonthBack = () => {
    setCurrentMonth((prev) => Math.max(0, prev - 1))
  }

  const handleMonthNext = () => {
    setCurrentMonth((prev) => Math.min(11, prev + 1))
  }

  return (
    <PhoneFrame tone="light">
      <section className="mt-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl text-black">Công việc của tôi</h1>
              <p className="text-lg text-[#838387]">{doneCount}/{tasks.length} Hoàn thành</p>
            </div>
            <button
              type="button"
              onClick={() => setIsCreateOpen(true)}
              className="rounded-full transition hover:scale-110 bg-[#be1d2b] p-2 text-white shadow-lg"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-4 overflow-hidden rounded-sm bg-white">
            <div className="flex justify-between bg-black px-5 py-3 text-xl text-white">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleMonthBack}
                  disabled={currentMonth === 0}
                  className="rounded-full p-1 transition hover:bg-white/10 disabled:opacity-40"
                  aria-label="Tháng trước"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span>{monthLabels[currentMonth]}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>{currentYear}</span>
                <button
                  type="button"
                  onClick={handleMonthNext}
                  disabled={currentMonth === 11}
                  className="rounded-full p-1 transition hover:bg-white/10 disabled:opacity-40"
                  aria-label="Tháng sau"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="px-3 py-2">
              <div className="grid grid-cols-7 text-center text-[10px] text-[#656565]">
                <span>S</span>
                <span>M</span>
                <span>T</span>
                <span>W</span>
                <span>T</span>
                <span>F</span>
                <span>S</span>
              </div>
              <div className="mt-2 space-y-1 text-sm text-black">
                {calendarWeeks.map((week, weekIdx) => (
                  <div key={weekIdx} className="grid grid-cols-7 text-center">
                    {week.map((date, idx) => {
                      const dayStatus = date ? statusByDay[date] : undefined
                      return (
                        <span key={`${date}-${idx}`} className="flex justify-center">
                          <span
                            className={`inline-block h-6 w-6 rounded-full leading-6 ${
                              dayStatus === 'done'
                                ? 'bg-[#ade9a8] text-[#2a6d29]'
                                : dayStatus === 'pending'
                                  ? 'bg-[#f7b3b3] text-[#8f5252]'
                                  : ''
                            }`}
                          >
                            {date}
                          </span>
                        </span>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                id={task.id}
                title={task.title}
                subtitle={task.subtitle}
                deadline={task.deadline}
                done={task.done}
                onToggle={handleToggleTask}
              />
            ))}
          </div>
      </section>

      {isCreateOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
          <form
            onSubmit={handleCreateTask}
            className="w-full rounded-[30px] bg-[#d8d5d7] p-5 text-[#195459] shadow-[0_18px_35px_rgba(0,0,0,0.3)]"
          >
            <h2 className="rounded-xl bg-[#ecd7d7] px-4 py-4 text-center text-2xl text-[#884548]">TẠO CÔNG VIỆC MỚI</h2>

            <div className="mt-5 rounded-[24px] bg-[#d1ced0] p-5">
              <label htmlFor="task-subject" className="block text-xl">
                Môn học
              </label>
              <input
                id="task-subject"
                value={draftSubject}
                onChange={(event) => setDraftSubject(event.target.value)}
                placeholder="Hãy nhập tên môn học"
                className="mt-3 w-full rounded-full bg-[#ecdddd] px-4 py-3 text-lg text-[#6d7073] outline-none placeholder:text-[#7f8084]"
              />

              <label htmlFor="task-name" className="mt-5 block text-xl">
                Nhiệm vụ
              </label>
              <input
                id="task-name"
                value={draftTask}
                onChange={(event) => setDraftTask(event.target.value)}
                placeholder="Hãy nhập nhiệm vụ phải làm"
                className="mt-3 w-full rounded-full bg-[#ecdddd] px-4 py-3 text-lg text-[#6d7073] outline-none placeholder:text-[#7f8084]"
              />

              <p className="mt-5 text-xl">Deadline</p>
              <input
                value={draftDate}
                onChange={(event) => setDraftDate(event.target.value)}
                placeholder={`dd/mm/${currentYear}`}
                className="mt-3 w-full rounded-full bg-[#ecdddd] px-4 py-3 text-lg text-[#6d7073] outline-none placeholder:text-[#7f8084]"
              />
              {draftDateError && <p className="mt-2 text-sm text-[#be1d2b]">{draftDateError}</p>}

              <div className="mt-8 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="rounded-full bg-[#b9b7b8] px-6 py-2 text-xl text-white shadow-lg"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-[#ce5d5d] px-8 py-2 text-xl text-white shadow-lg transition hover:scale-105"
                >
                  Đăng
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      <BottomNav active="tasks" />
    </PhoneFrame>
  )
}

export default TasksPage
