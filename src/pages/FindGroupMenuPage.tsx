import { MousePointerClick } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import PhoneFrame from '../components/PhoneFrame'

const groupSkillOptions = ['Nội dung', 'Thuyết trình', 'Thiết kế', 'Xử lý data', "Làm slides", "Khác"]
const customGroupsStorageKey = 'grouplify-custom-groups'

type StoredGroup = {
  title: string
  chatSlug: string
  members: { initials: string; firstName: string }[]
  have: string[]
  miss: string[]
}

function FindGroupMenuPage() {
  const navigate = useNavigate()
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [groupName, setGroupName] = useState('')
  const [membersRaw, setMembersRaw] = useState('')
  const [presentJobs, setPresentJobs] = useState<string[]>([])
  const [missingJobs, setMissingJobs] = useState<string[]>([])

  const togglePresentJob = (skill: string) => {
    setPresentJobs((prev) =>
      prev.includes(skill) ? prev.filter((item) => item !== skill) : [...prev, skill],
    )
    setMissingJobs((prev) => prev.filter((item) => item !== skill))
  }

  const toggleMissingJob = (skill: string) => {
    setMissingJobs((prev) =>
      prev.includes(skill) ? prev.filter((item) => item !== skill) : [...prev, skill],
    )
    setPresentJobs((prev) => prev.filter((item) => item !== skill))
  }

  const parseMembers = (value: string) => {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
      .map((fullName) => {
        const parts = fullName.split(/\s+/).filter(Boolean)
        const initialsFromParts =
          parts.length >= 2
            ? `${parts[0][0] ?? ''}${parts[1][0] ?? ''}`.toUpperCase()
            : (parts[0] || '').slice(0, 2).toUpperCase()
        const displayFirstName = parts[parts.length - 1] || fullName

        return {
          firstName: displayFirstName,
          initials: initialsFromParts,
        }
      })
  }

  const slugifyGroupName = (value: string) => {
    return value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  const handleCreateGroup = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const trimmedGroupName = groupName.trim()
    if (!trimmedGroupName) return

    const members = parseMembers(membersRaw)
    const baseSlug = slugifyGroupName(trimmedGroupName) || 'new-group'
    const chatSlug = `${baseSlug}-${Date.now()}`

    const createdGroup: StoredGroup = {
      title: trimmedGroupName,
      chatSlug,
      members,
      have: presentJobs,
      miss: missingJobs,
    }

    const existingGroups = JSON.parse(localStorage.getItem(customGroupsStorageKey) || '[]') as StoredGroup[]
    localStorage.setItem(customGroupsStorageKey, JSON.stringify([createdGroup, ...existingGroups]))

    setIsCreateOpen(false)
    setGroupName('')
    setMembersRaw('')
    setPresentJobs([])
    setMissingJobs([])
    navigate('/find-group/suggestions')
  }

  return (
    <PhoneFrame tone="teal">
      <h1 className="mb-8 mt-12 text-center text-3xl sm:text-3xl uppercase tracking-wide">Tìm nhóm</h1>

      <div className="mt-12 space-y-8 px-1">
        <button className="w-full rounded-3xl border-2 border-black transition hover:scale-105 bg-white py-6 text-xl sm:text-xl text-[#555] shadow-[10px_16px_24px_rgba(0,0,0,0.35)]">
          Ghép nhóm nhanh
        </button>

        <div className="relative">
          <Link
            to="/find-group/loading"
            className="block w-full rounded-3xl border-2 border-[#35c4d0] bg-[#a5edf1] transition hover:scale-105 py-6 text-center text-xl sm:text-xl text-[#555] shadow-[10px_16px_24px_rgba(0,0,0,0.35)]"
          >
            Ghép nhóm cân bằng kỹ năng
            <span className="block text-[#d85b59]">(Đề xuất)</span>
          </Link>
          <MousePointerClick className="absolute bottom-[-10px] right-2 h-10 w-10 text-black" />
        </div>

        <button
          type="button"
          onClick={() => setIsCreateOpen(true)}
          className="w-full rounded-3xl border-2 border-black bg-[#ffe4e1] transition hover:scale-105 py-6 text-xl sm:text-xl text-[#555] shadow-[10px_16px_24px_rgba(0,0,0,0.35)]"
        >
          Lập nhóm mới
        </button>
      </div>

      {isCreateOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
          <form
            onSubmit={handleCreateGroup}
            className="w-full rounded-[30px] bg-[#d8d5d7] p-5 text-[#195459] shadow-[0_18px_35px_rgba(0,0,0,0.3)]"
          >
            <h2 className="rounded-xl bg-[#ecd7d7] px-4 py-4 text-center text-2xl text-[#884548]">LẬP NHÓM MỚI</h2>

            <div className="mt-5 rounded-[24px] bg-[#d1ced0] p-5">
              <label htmlFor="group-name" className="block text-xl">
                Tên nhóm
              </label>
              <input
                id="group-name"
                value={groupName}
                onChange={(event) => setGroupName(event.target.value)}
                placeholder="Nhập tên nhóm"
                className="mt-3 w-full rounded-full bg-[#ecdddd] px-4 py-3 text-lg text-[#6d7073] outline-none placeholder:text-[#7f8084]"
              />

              <label htmlFor="group-members" className="mt-5 block text-xl">
                Thành viên
              </label>
              <input
                id="group-members"
                value={membersRaw}
                onChange={(event) => setMembersRaw(event.target.value)}
                placeholder="Ví dụ: Thu Thuỷ, Minh Thư"
                className="mt-3 w-full rounded-full bg-[#ecdddd] px-4 py-3 text-lg text-[#6d7073] outline-none placeholder:text-[#7f8084]"
              />

              <p className="mt-5 text-xl">Đã có</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {groupSkillOptions.map((skill) => {
                  const isSelected = presentJobs.includes(skill)
                  return (
                    <button
                      key={`have-${skill}`}
                      type="button"
                      onClick={() => togglePresentJob(skill)}
                      className={`rounded-full px-3 py-1 text-sm transition ${
                        isSelected ? 'bg-[#b9edb2] text-[#195459]' : 'bg-[#ecdddd] text-[#4f5559]'
                      }`}
                    >
                      {skill}
                    </button>
                  )
                })}
              </div>

              <p className="mt-5 text-xl">Thiếu</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {groupSkillOptions.map((skill) => {
                  const isSelected = missingJobs.includes(skill)
                  return (
                    <button
                      key={`miss-${skill}`}
                      type="button"
                      onClick={() => toggleMissingJob(skill)}
                      className={`rounded-full px-3 py-1 text-sm transition ${
                        isSelected ? 'bg-[#f3b5b1] text-[#6b2f35]' : 'bg-[#ecdddd] text-[#4f5559]'
                      }`}
                    >
                      {skill}
                    </button>
                  )
                })}
              </div>

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

      <BottomNav active="find-group" highlightAllLabels />
    </PhoneFrame>
  )
}

export default FindGroupMenuPage
