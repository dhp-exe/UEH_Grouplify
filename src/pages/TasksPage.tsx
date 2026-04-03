import { Plus } from 'lucide-react'
import BottomNav from '../components/BottomNav'
import PhoneFrame from '../components/PhoneFrame'
import StatusBar from '../components/StatusBar'

const dates = [
  ['', '', '1', '2', '3', '4', '5'],
  ['6', '7', '8', '9', '10', '11', '12'],
  ['13', '14', '15', '16', '17', '18', '19'],
  ['20', '21', '22', '23', '24', '25', '26'],
  ['27', '28', '29', '30', '', '', ''],
]

function TaskCard({
  title,
  subtitle,
  deadline,
  done,
}: {
  title: string
  subtitle: string
  deadline: string
  done: boolean
}) {
  return (
    <article className="rounded-[24px] bg-[#f5c3bf] p-4 shadow-xl">
      <div className="flex items-center gap-3">
        <div className={`rounded-2xl p-2 text-white ${done ? 'bg-[#79dc7f]' : 'bg-[#f0656b]'}`}>
          <span className="mx-1 text-lg">{done ? '✓' : '✕'}</span>
        </div>
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
  return (
    <PhoneFrame tone="light">
      <StatusBar dark={false} />

      <section className="mt-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl text-black">Công việc của tôi</h1>
              <p className="text-lg text-[#838387]">1/2 Hoàn thành</p>
            </div>
            <button className="rounded-full bg-[#be1d2b] p-2 text-white shadow-lg">
              <Plus className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-4 overflow-hidden rounded-sm bg-white">
            <div className="flex justify-between bg-black px-5 py-3 text-xl text-white">
              <span>APRIL</span>
              <span>2026</span>
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
                {dates.map((week, weekIdx) => (
                  <div key={weekIdx} className="grid grid-cols-7 text-center">
                    {week.map((date, idx) => {
                      const highlightGreen = date === '4'
                      const highlightPink = date === '7'
                      return (
                        <span key={`${date}-${idx}`} className="flex justify-center">
                          <span
                            className={`inline-block h-6 w-6 rounded-full leading-6 ${
                              highlightGreen
                                ? 'bg-[#ade9a8] text-[#2a6d29]'
                                : highlightPink
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
            <TaskCard title="TƯ TƯỞNG HỒ CHÍ MINH" subtitle="Tìm nội dung" deadline="04-04-2026" done />
            <TaskCard title="TƯ DUY THIẾT KẾ" subtitle="Thiết kế Canva" deadline="07-04-2026" done={false} />
          </div>
      </section>

      <BottomNav active="tasks" />
    </PhoneFrame>
  )
}

export default TasksPage
