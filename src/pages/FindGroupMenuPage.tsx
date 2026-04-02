import { MousePointerClick } from 'lucide-react'
import { Link } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import PhoneFrame from '../components/PhoneFrame'
import StatusBar from '../components/StatusBar'

function FindGroupMenuPage() {
  return (
    <PhoneFrame tone="teal">
      <StatusBar />

      <h1 className="mb-16 mt-10 text-center text-[84px] uppercase tracking-wide">Tìm nhóm</h1>

      <div className="space-y-8 px-2">
        <button className="w-full rounded-[45px] border-2 border-black bg-white py-10 text-[50px] text-[#555] shadow-[10px_16px_24px_rgba(0,0,0,0.35)]">
          Ghép nhóm nhanh
        </button>

        <div className="relative">
          <Link
            to="/find-group/loading"
            className="block w-full rounded-[45px] border-2 border-[#35c4d0] bg-[#a5edf1] py-10 text-center text-[50px] text-[#555] shadow-[10px_16px_24px_rgba(0,0,0,0.35)]"
          >
            Ghép nhóm cân bằng kỹ năng
            <span className="block text-[#d85b59]">(Đề xuất)</span>
          </Link>
          <MousePointerClick className="absolute bottom-[-22px] right-4 h-20 w-20 text-black" />
        </div>

        <button className="w-full rounded-[45px] border-2 border-black bg-[#ffe4e1] py-10 text-[50px] text-[#555] shadow-[10px_16px_24px_rgba(0,0,0,0.35)]">
          Lập nhóm mới
        </button>
      </div>

      <BottomNav active="find-group" />
    </PhoneFrame>
  )
}

export default FindGroupMenuPage
