import { MousePointerClick } from 'lucide-react'
import { Link } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import PhoneFrame from '../components/PhoneFrame'

function FindGroupMenuPage() {
  return (
    <PhoneFrame tone="teal">
      <h1 className="mb-8 mt-6 text-center text-xl sm:text-3xl uppercase tracking-wide">Tìm nhóm</h1>

      <div className="space-y-4 px-1">
        <button className="w-full rounded-3xl border-2 border-black transition hover:scale-105 bg-white py-6 text-sm sm:text-lg text-[#555] shadow-[10px_16px_24px_rgba(0,0,0,0.35)]">
          Ghép nhóm nhanh
        </button>

        <div className="relative">
          <Link
            to="/find-group/loading"
            className="block w-full rounded-3xl border-2 border-[#35c4d0] bg-[#a5edf1] transition hover:scale-105 py-6 text-center text-sm sm:text-lg text-[#555] shadow-[10px_16px_24px_rgba(0,0,0,0.35)]"
          >
            Ghép nhóm cân bằng kỹ năng
            <span className="block text-[#d85b59]">(Đề xuất)</span>
          </Link>
          <MousePointerClick className="absolute bottom-[-10px] right-2 h-10 w-10 text-black" />
        </div>

        <button className="w-full rounded-3xl border-2 border-black bg-[#ffe4e1] transition hover:scale-105 py-6 text-sm sm:text-lg text-[#555] shadow-[10px_16px_24px_rgba(0,0,0,0.35)]">
          Lập nhóm mới
        </button>
      </div>

      <BottomNav active="find-group" highlightAllLabels />
    </PhoneFrame>
  )
}

export default FindGroupMenuPage
