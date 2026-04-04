import { ArrowRight, BookOpen, GraduationCap, IdCard, UserRound } from 'lucide-react'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import PhoneFrame from '../components/PhoneFrame'

const featuredSkills = ['Nội dung', 'Thiết kế', 'Thuyết trình']
const otherSkills = [
  'Tư duy phản biện',
  'Kỹ năng giải quyết vấn đề',
  'Kỹ năng tin học',
  'Thuyết trình',
  'Nội dung',
  'Chủ động',
  'Tự tin',
  'Khác',
]

function Field({
  label,
  value,
  icon,
  name,
  placeholder,
  onChange,
}: {
  label: string
  value: string
  icon: ReactNode
  name: string
  placeholder?: string
  onChange: (name: string, value: string) => void
}) {
  return (
    <div className="mb-3">
      <p className="mb-1 text-xs sm:text-sm text-[#195459]">{label}</p>
      <div className="flex items-center gap-2 rounded-full bg-[#f2f2f2] px-4 py-2 text-[#666]">
        {icon}
        <input
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(name, e.target.value)}
          className="w-full bg-transparent outline-none text-xs sm:text-sm"
        />
      </div>
    </div>
  )
}

function ProfilePage() {
  const [form, setForm] = useState({
    name: '',
    khoa: '',
    lop: '',
    nganh: '',
  })
  const [selectedFeaturedSkills, setSelectedFeaturedSkills] = useState<string[]>([
    featuredSkills[2],
  ])
  const [selectedOtherSkillIndexes, setSelectedOtherSkillIndexes] = useState<number[]>([4])

  const handleChange = (name: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const toggleFeaturedSkill = (skill: string) => {
    setSelectedFeaturedSkills((prev) =>
      prev.includes(skill) ? prev.filter((item) => item !== skill) : [...prev, skill],
    )
  }

  const toggleOtherSkill = (index: number) => {
    setSelectedOtherSkillIndexes((prev) =>
      prev.includes(index) ? prev.filter((item) => item !== index) : [...prev, index],
    )
  }

  return (
    <PhoneFrame tone="teal">
      <h2 className="font-fresca text-center text-xl sm:text-3xl text-[#ffe4e1]">GROUPLIFY</h2>
      <h1 className="mt-2 mb-5 text-center text-xl sm:text-3xl leading-tight">
        Thông tin cá nhân
      </h1>

      <section className="rounded-2xl bg-[#ffe4e1] p-4 text-[#195459]">
        <Field
          label="Họ tên"
          name="name"
          value={form.name}
          icon={<UserRound className="h-4 w-4" />}
          placeholder='Lâm Hà Thảo Như'
          onChange={handleChange}
        />
        <Field
          label="Khoá"
          name="khoa"
          value={form.khoa}
          icon={<IdCard className="h-4 w-4" />}
          placeholder='K50'
          onChange={handleChange}
        />
        <Field
          label="Lớp"
          name="lop"
          value={form.lop}
          icon={<BookOpen className="h-4 w-4" />}
          placeholder='EL0001'
          onChange={handleChange}
        />
        <Field
          label="Ngành"
          name="nganh"
          value={form.nganh}
          icon={<GraduationCap className="h-4 w-4" />}
          placeholder='Luật Kinh Tế'
          onChange={handleChange}
        />
      </section>

      <section className="mt-3">
        <h3 className="text-lg sm:text-xl">Điểm mạnh của tôi</h3>
        <p className="text-xs sm:text-sm text-[#daf0ef]">Điểm mạnh nổi trội</p>
        <div className="mt-2 flex flex-wrap gap-3">
          {featuredSkills.map((skill) => {
            const isSelected = selectedFeaturedSkills.includes(skill)

            return (
            <button
              key={skill}
              type="button"
              aria-pressed={isSelected}
              onClick={() => toggleFeaturedSkill(skill)}
              className={`rounded-full px-4 py-1 text-xs sm:text-sm transition-transform duration-200 transition hover:scale-105 focus-visible:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f8a29e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#195459] ${
                isSelected
                  ? 'bg-[#f8a29e] text-[#195459]'
                  : 'bg-[#ffe4e1] text-[#195459]'
              }`}
            >
              {skill}
            </button>
            )
          })}
        </div>

        <p className="mt-4 text-xs sm:text-sm text-[#daf0ef]">
          Những điểm mạnh khác
        </p>
        <div className="mt-2 flex flex-wrap gap-3">
          {otherSkills.map((skill, idx) => (
            <button
              key={`${skill}-${idx}`}
              type="button"
              aria-pressed={selectedOtherSkillIndexes.includes(idx)}
              onClick={() => toggleOtherSkill(idx)}
              className={`rounded-full px-4 py-1 text-[10px] sm:text-xs transition-transform duration-200 transition hover:scale-105 focus-visible:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f8a29e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#195459] ${
                selectedOtherSkillIndexes.includes(idx)
                  ? 'bg-[#f8a29e] text-[#195459]'
                  : 'bg-[#fff1f1] text-[#195459]'
              }`}
            >
              {skill}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-4">
        <h4 className="text-xs sm:text-sm">
          Sản phẩm, dự án đã thực hiện:
        </h4>
        <div className="mt-2 rounded-2xl bg-[#b8bec5] px-3 py-2 text-[10px] sm:text-xs text-[#f5f5f5]">
          https://researchhub.university.edu/project/smart-student-network
        </div>
      </section>

      <Link
        to="/find-group/menu"
        className="absolute bottom-16 right-4 flex h-10 w-10 items-center justify-center rounded-full transition hover:scale-110 bg-[#cfd0fa]"
      >
        <ArrowRight className="h-5 w-5 text-[#ffe86f]" />
      </Link>
    </PhoneFrame>
  )
}

export default ProfilePage
