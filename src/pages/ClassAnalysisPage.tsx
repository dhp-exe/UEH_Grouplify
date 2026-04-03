import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import PhoneFrame from '../components/PhoneFrame'
import BottomNav from '../components/BottomNav'
import StatusBar from '../components/StatusBar'

const bars = [
  { label: 'Thiết kế', value: 25, color: 'bg-[#3ab8c4]' },
  { label: 'Nội dung', value: 15, color: 'bg-[#8adce3]' },
  { label: 'Thuyết trình', value: 10, color: 'bg-[#50d7e8]' },
]

function ClassAnalysisPage() {
  return (
    <PhoneFrame tone="teal">
      <StatusBar />

      <div className="-mx-5 flex items-center gap-3 bg-[#122a33] px-4 py-3">
        <Link to="/find-group/menu" className="rounded-full bg-transparent p-1">
          <ArrowLeft className="h-6 w-6 text-white" />
        </Link>
        <h1 className="text-sm sm:text-xl">Phân tích kỹ năng lớp</h1>
      </div>

      <section className="mt-3 rounded-3xl bg-[#f3f2f2] p-4 text-[#2e2a33]">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs sm:text-sm">26D1HCM51000438</p>
            <p className="text-xs sm:text-sm text-[#4d4a53]">Tư tưởng Hồ Chí Minh</p>
          </div>
          <span className="text-[10px] sm:text-xs">50 sinh viên</span>
        </div>
      </section>

      <h2 className="mt-4 text-lg sm:text-xl">Phân bố kỹ năng</h2>
      <section className="rounded-[38px] border border-[#dce4e4] p-4">
        <div className="flex h-48 items-end justify-around gap-4">
          {bars.map((bar) => (
            <div key={bar.label} className="flex flex-col items-center">
              <span className="mb-2 text-xs sm:text-sm text-[#61e0e8]">{bar.value}</span>
              <div className={`${bar.color} w-8 rounded-t-lg`} style={{ height: `${bar.value * 3}px` }} />
              <span className="mt-2 text-[10px] sm:text-xs text-[#84d7de]">{bar.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-4 rounded-[24px] bg-[#f8a29e] px-4 py-4 text-[#fff4f4]">
        <h3 className="text-sm sm:text-lg text-[#953a4b]">Kỹ năng hiếm!</h3>
        <p className="text-xs sm:text-sm">
          Bạn thuộc kỹ năng Thuyết trình - kỹ năng hiếm trong lớp
          <br />
          → Bạn sẽ được ưu tiên ghép nhóm
        </p>
      </section>

      <Link
        to="/find-group/suggestions"
        className="mt-6 block rounded-[28px] bg-[#9ceaf0] py-3 text-center text-sm sm:text-lg text-[#f4ffff]"
      >
        Xem nhóm đề xuất
      </Link>
       <BottomNav active="find-group" />
    </PhoneFrame>
  )
}

export default ClassAnalysisPage
