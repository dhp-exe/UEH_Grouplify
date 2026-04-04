import { useMemo, useState } from 'react'
import { MessageCircleMore, Plus, Search } from 'lucide-react'
import avtImg1 from '../assets/avt_img_1.png'
import avtImg2 from '../assets/avt_img_2.png'
import avtImg3 from '../assets/avt_img_3.png'
import BottomNav from '../components/BottomNav'
import PhoneFrame from '../components/PhoneFrame'

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

const filterOptions: { value: ExploreFilter; label: string }[] = [
  { value: 'All', label: 'Tất cả' },
  { value: 'Courses', label: 'Môn học' },
  { value: 'Activities', label: 'Hoạt động' },
]

const strengthOptions = [
  'Nội dung',
  'Thiết kế',
  'Thuyết trình',
  'Tư duy phản biện',
  'Giải quyết vấn đề',
  'Kỹ năng tin học',
  'Chủ động',
  'Tự tin',
]

function ExplorePage() {
  const [searchText, setSearchText] = useState('')
  const [activeFilter, setActiveFilter] = useState<ExploreFilter>('All')
  const [userPosts, setUserPosts] = useState<ExploreItem[]>([])
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [draftType, setDraftType] = useState<'Courses' | 'Activity'>('Activity')
  const [draftCourseId, setDraftCourseId] = useState('')
  const [draftMajor, setDraftMajor] = useState('')
  const [selectedStrengths, setSelectedStrengths] = useState<string[]>([])

  const filteredItems = useMemo(() => {
    const normalizedQuery = searchText.trim().toLowerCase()
    const allItems = [...userPosts, ...items]

    return allItems.filter((item) => {
      const matchesCategory =
        activeFilter === 'All'
          ? true
          : activeFilter === 'Courses'
            ? item.type === 'Courses'
            : item.type === 'Activity'

      const matchesSearch = item.major.toLowerCase().includes(normalizedQuery)

      return matchesCategory && matchesSearch
    })
  }, [activeFilter, searchText, userPosts])

  const handleCreatePost = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const content = draftMajor.trim()
    const courseId = draftCourseId.trim()

    if (draftType === 'Courses' && (!courseId || selectedStrengths.length === 0)) return
    if (draftType === 'Activity' && !content) return

    const createdItem: ExploreItem = {
      name: 'Bạn',
      subtitle: 'Vừa đăng',
      type: draftType,
      major: draftType === 'Courses' ? `Mã học phần: ${courseId}` : content,
      detail: draftType === 'Courses' ? 'Điểm mạnh:' : '',
      tags: draftType === 'Courses' ? selectedStrengths : undefined,
      image: avtImg1,
    }

    setUserPosts((prev) => [createdItem, ...prev])
    setDraftMajor('')
    setDraftType('Activity')
    setDraftCourseId('')
    setSelectedStrengths([])
    setIsCreateOpen(false)
  }

  const toggleStrength = (strength: string) => {
    setSelectedStrengths((prev) =>
      prev.includes(strength)
        ? prev.filter((item) => item !== strength)
        : [...prev, strength],
    )
  }

  return (
    <PhoneFrame tone="light">
      <section className="mt-10">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl text-[#195459]">Khám phá</h1>
            <button
              type="button"
              onClick={() => setIsCreateOpen(true)}
              className="rounded-full transition hover:scale-105 bg-[#be1d2b] p-2 text-white shadow-lg"
            >
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
            {filterOptions.map((filterOption) => {
              const isActive = activeFilter === filterOption.value

              return (
                <button
                  key={filterOption.value}
                  type="button"
                  onClick={() => setActiveFilter(filterOption.value)}
                  className={`rounded-full px-4 py-2 text-sm text-black shadow-lg transition hover:scale-105 focus-visible:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f8a29e] ${
                    isActive ? 'bg-[#f8a29e]' : 'bg-[#ffe4e1]'
                  }`}
                >
                  {filterOption.label}
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

      {isCreateOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
          <form
            onSubmit={handleCreatePost}
            className="w-full rounded-[30px] bg-[#d8d5d7] p-5 text-[#195459] shadow-[0_18px_35px_rgba(0,0,0,0.3)]"
          >
            <h2 className="rounded-3xl bg-[#ecd7d7] px-4 py-4 text-center text-2xl text-[#884548]">TẠO MỘT BÀI ĐĂNG</h2>

            <div className="mt-5 rounded-[24px] bg-[#d1ced0] p-5">
              <p className="text-xl">Phân loại</p>
              <div className="mt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setDraftType('Courses')}
                  className={`flex-1 rounded-full px-4 py-2 text-xl text-black shadow-lg transition hover:scale-[1.02] ${
                    draftType === 'Courses' ? 'bg-[#f1a39a]' : 'bg-[#f1dfdf]'
                  }`}
                >
                  Môn học
                </button>
                <button
                  type="button"
                  onClick={() => setDraftType('Activity')}
                  className={`flex-1 rounded-full px-4 py-2 text-lg text-black shadow-lg transition hover:scale-[1.02] ${
                    draftType === 'Activity' ? 'bg-[#f1a39a]' : 'bg-[#f1dfdf]'
                  }`}
                >
                  Hoạt động
                </button>
              </div>

              {draftType === 'Courses' && (
                <>
                  <label className="mt-6 block text-xl" htmlFor="explore-course-id">
                    Mã học phần
                  </label>
                  <input
                    id="explore-course-id"
                    value={draftCourseId}
                    onChange={(event) => setDraftCourseId(event.target.value)}
                    placeholder="Ví dụ: 26D1HCM51000438"
                    className="mt-3 w-full rounded-[24px] bg-[#ecdddd] px-4 py-3 text-sm text-[#6d7073] outline-none placeholder:text-[#7f8084]"
                  />

                  <p className="mt-6 text-xl">Điểm mạnh</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {strengthOptions.map((strength) => {
                      const isSelected = selectedStrengths.includes(strength)

                      return (
                        <button
                          key={strength}
                          type="button"
                          onClick={() => toggleStrength(strength)}
                          className={`rounded-full px-4 py-2 text-sm transition-transform duration-200 focus-visible:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f8a29e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#d1ced0] ${
                            isSelected ? 'bg-[#f8a29e] text-[#195459]' : 'bg-[#f1dfdf] text-[#195459]'
                          }`}
                        >
                          {strength}
                        </button>
                      )
                    })}
                  </div>
                </>
              )}

              {draftType === 'Activity' && (
                <>
                  <label className="mt-6 block text-xl" htmlFor="explore-content">
                    Nội dung
                  </label>
                  <input
                    id="explore-content"
                    value={draftMajor}
                    onChange={(event) => setDraftMajor(event.target.value)}
                    placeholder="VD: Muốn tìm bạn cày điểm rèn luyện.."
                    className="mt-3 w-full rounded-[24px] bg-[#ecdddd] px-4 py-3 text-sm text-[#6d7073] outline-none placeholder:text-[#7f8084]"
                  />
                </>
              )}

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

      <BottomNav active="explore" />
    </PhoneFrame>
  )
}

export default ExplorePage
