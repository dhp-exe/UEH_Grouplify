import { useMemo, useState } from 'react'
import { MessageCircleMore, Plus, Search } from 'lucide-react'
import avtImg1 from '../assets/avt_img_1.png'
import avtImg2 from '../assets/avt_img_2.png'
import avtImg3 from '../assets/avt_img_3.png'
import BottomNav from '../components/BottomNav'
import PhoneFrame from '../components/PhoneFrame'
import StatusBar from '../components/StatusBar'

type ExploreItem = {
  name: string
  subtitle: string
  type: 'Courses' | 'Activity'
  major: string
  detail: string
  tags?: string[]
  image: string
}

const items: ExploreItem[] = [
  {
    name: 'Đỗ Nguyễn Hải Vân',
    subtitle: 'Luật kinh tế - K50',
    type: 'Activity',
    major: 'Muốn tìm đồng đội thi Olympic Khoa học Mac-Lênin',
    detail: '',
    image: avtImg1,
  },
  {
    name: 'Đỗ Lê Anh Thư',
    subtitle: 'Tài chính - K51',
    type: 'Courses',
    major: 'Mã học phần: 26D1HCM51000438',
    detail: 'Điểm mạnh:',
    tags: ['Nội dung', 'Thiết kế'],
    image: avtImg2,
  },
  {
    name: 'Lê Quỳnh Bảo Ngọc',
    subtitle: 'ArtTech - K49',
    type: 'Activity',
    major: 'Muốn tìm bạn cùng chạy điểm rèn luyện',
    detail: '',
    image: avtImg3,
  },
]

type ExploreFilter = 'All' | 'Courses' | 'Activities'

function ExplorePage() {
  const [searchText, setSearchText] = useState('')
  const [activeFilter, setActiveFilter] = useState<ExploreFilter>('All')

  const filteredItems = useMemo(() => {
    const normalizedQuery = searchText.trim().toLowerCase()

    return items.filter((item) => {
      const matchesCategory =
        activeFilter === 'All'
          ? true
          : activeFilter === 'Courses'
            ? item.type === 'Courses'
            : item.type === 'Activity'

      const matchesSearch = item.major.toLowerCase().includes(normalizedQuery)

      return matchesCategory && matchesSearch
    })
  }, [activeFilter, searchText])

  return (
    <PhoneFrame tone="light">
      <StatusBar dark={false} />

      <section className="mt-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl text-[#195459]">Khám phá</h1>
            <button className="rounded-full transition hover:scale-110 bg-[#be1d2b] p-2 text-white shadow-lg">
              <Plus className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-4 flex items-center rounded-full bg-[#edf0f4] px-4 py-3 text-[#80848a] shadow-lg">
            <Search className="mr-2 h-4 w-4" />
            <input
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="Hãy nhập mã lớp hay hoạt động bạn muốn tìm..."
              className="w-full bg-transparent text-xs sm:text-sm text-[#4d4f54] outline-none placeholder:text-[#80848a]"
            />
          </div>

          <div className="mt-5 flex gap-3">
            {(['All', 'Môn học', 'Hoạt động'] as ExploreFilter[]).map((filterOption) => {
              const isActive = activeFilter === filterOption

              return (
                <button
                  key={filterOption}
                  type="button"
                  onClick={() => setActiveFilter(filterOption)}
                  className={`rounded-full px-4 py-2 text-sm text-black shadow-lg transition hover:scale-105 focus-visible:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f8a29e] ${
                    isActive ? 'bg-[#f8a29e]' : 'bg-[#ffe4e1]'
                  }`}
                >
                  {filterOption}
                </button>
              )
            })}
          </div>

          <div className="mt-5 space-y-4">
            {filteredItems.map((item) => (
              <article key={item.name} className="rounded-[28px] bg-[#ffe4e1] p-4 shadow-xl">
                <div className="flex gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div className="min-w-0 flex-1 text-[#195459]">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm leading-tight">{item.name}</h3>
                      <span className="text-xs text-[#2e2f31]">{item.subtitle}</span>
                    </div>
                    <p className="mt-1 text-xs text-[#6d7073]">{item.major}</p>
                    {item.tags && item.tags.length > 0 && (
                      <>
                        <p className="text-xs text-[#2e2f31]">{item.detail}</p>
                        <div className="mt-2 flex gap-2">
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

            {filteredItems.length === 0 && (
              <p className="rounded-2xl bg-[#ffe4e1] px-4 py-3 text-center text-xs text-[#195459]">
                Không tìm thấy kết quả phù hợp.
              </p>
            )}
          </div>
      </section>

      <BottomNav active="explore" />
    </PhoneFrame>
  )
}

export default ExplorePage
