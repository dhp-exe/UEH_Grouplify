import { MessageCircleMore, Plus, Search } from 'lucide-react'
import BottomNav from '../components/BottomNav'
import PhoneFrame from '../components/PhoneFrame'
import StatusBar from '../components/StatusBar'

type ExploreItem = {
  name: string
  subtitle: string
  major: string
  detail: string
  tags?: string[]
}

const items: ExploreItem[] = [
  {
    name: 'Đỗ Nguyễn Hải Vân',
    subtitle: 'Luật kinh tế - K50',
    major: 'Muốn tìm đồng đội thi Olympic Khoa học Mac-Lênin',
    detail: '',
  },
  {
    name: 'Đỗ Lê Anh Thư',
    subtitle: 'Tài chính - K51',
    major: 'Mã học phần: 26D1HCM51000438',
    detail: 'Điểm mạnh:',
    tags: ['Nội dung', 'Thiết kế'],
  },
  {
    name: 'Lê Quỳnh Bảo Ngọc',
    subtitle: 'ArtTech - K49',
    major: 'Muốn tìm bạn cùng chạy điểm rèn luyện',
    detail: '',
  },
]

function ExplorePage() {
  return (
    <PhoneFrame tone="light">
      <StatusBar dark={false} />

      <section className="mt-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl sm:text-3xl text-[#195459]">Khám phá</h1>
            <button className="rounded-full bg-[#be1d2b] p-2 text-white shadow-lg">
              <Plus className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-4 flex items-center rounded-full bg-[#edf0f4] px-4 py-3 text-[#80848a] shadow-lg">
            <Search className="mr-2 h-4 w-4" />
            <span className="text-xs sm:text-sm">Hãy nhập mã lớp học phần bạn muốn tìm</span>
          </div>

          <div className="mt-5 flex gap-3">
            <button className="rounded-full bg-[#f8a29e] px-4 py-2 text-xs sm:text-sm text-black shadow-lg">Tất cả</button>
            <button className="rounded-full bg-[#ffe4e1] px-4 py-2 text-xs sm:text-sm text-black shadow-lg">Môn học</button>
            <button className="rounded-full bg-[#ffe4e1] px-4 py-2 text-xs sm:text-sm text-black shadow-lg">Hoạt động</button>
          </div>

          <div className="mt-5 space-y-4">
            {items.map((item, index) => (
              <article key={item.name} className="rounded-[28px] bg-[#ffe4e1] p-4 shadow-xl">
                <div className="flex gap-3">
                  <div className="h-12 w-12 rounded-full bg-[#b7cae9]" />
                  <div className="min-w-0 flex-1 text-[#195459]">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-xs sm:text-sm leading-tight">{item.name}</h3>
                      <span className="text-[10px] sm:text-xs text-[#2e2f31]">{item.subtitle}</span>
                    </div>
                    <p className="text-[10px] sm:text-xs text-[#6d7073]">{item.major}</p>
                    {index === 1 && (
                      <>
                        <p className="text-[10px] sm:text-xs text-[#2e2f31]">{item.detail}</p>
                        <div className="mt-1 flex gap-2">
                          {item.tags?.map((tag) => (
                            <span key={tag} className="rounded-full bg-[#f8a29e] px-3 text-[10px] sm:text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                  <MessageCircleMore className="h-5 w-5 text-[#c68d90]" />
                </div>
              </article>
            ))}
          </div>
      </section>

      <BottomNav active="explore" />
    </PhoneFrame>
  )
}

export default ExplorePage
