import { ArrowRight, BookOpen, GraduationCap, IdCard, UserRound } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import PhoneFrame from '../components/PhoneFrame'
import StatusBar from '../components/StatusBar'

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

function Field({ label, value, icon }: { label: string; value: string; icon: ReactNode }) {
  return (
    <div className="mb-3">
      <p className="mb-1 text-xs sm:text-sm text-[#195459]">{label}</p>
      <div className="flex items-center gap-2 rounded-full bg-[#f2f2f2] px-4 py-2 text-[#666]">
        {icon}
        <span className="text-xs sm:text-sm">{value}</span>
      </div>
    </div>
  )
}

function ProfilePage() {
  return (
    <PhoneFrame tone="teal">
      <StatusBar />
      <h2 className="text-center text-lg sm:text-xl text-[#ffe4e1]">GROUPLIFY</h2>
      <h1 className="mb-5 text-center text-xl sm:text-3xl leading-tight">Thông tin cá nhân</h1>

      <section className="rounded-2xl bg-[#ffe4e1] p-4 text-[#195459]">
        <Field label="Họ tên" value="Lâm Hà Thảo Như" icon={<UserRound className="h-4 w-4" />} />
        <Field label="Khoá" value="K50" icon={<IdCard className="h-4 w-4" />} />
        <Field label="Lớp" value="EL0001" icon={<BookOpen className="h-4 w-4" />} />
        <Field
          label="Ngành"
          value="Luật Kinh Tế"
          icon={<GraduationCap className="h-4 w-4" />}
        />
      </section>

      <section className="mt-3">
        <h3 className="text-lg sm:text-xl">Điểm mạnh của tôi</h3>
        <p className="text-xs sm:text-sm text-[#daf0ef]">Điểm mạnh nổi trội</p>
        <div className="mt-2 flex flex-wrap gap-3">
          {featuredSkills.map((skill, idx) => (
            <span
              key={skill}
              className={`rounded-full px-4 py-1 text-xs sm:text-sm ${
                idx === 2 ? 'bg-[#f8a29e] text-[#195459]' : 'bg-[#ffe4e1] text-[#195459]'
              }`}
            >
              {skill}
            </span>
          ))}
        </div>

        <p className="mt-1 text-xs sm:text-sm text-[#daf0ef]">Những điểm mạnh khác</p>
        <div className="mt-4 flex flex-wrap gap-3">
          {otherSkills.map((skill, idx) => (
            <span
              key={`${skill}-${idx}`}
              className={`rounded-full px-4 py-1 text-[10px] sm:text-xs ${
                idx === 4 ? 'bg-[#f8a29e] text-[#195459]' : 'bg-[#fff1f1] text-[#195459]'
              }`}
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-4">
        <h4 className="text-xs sm:text-sm">Sản phẩm, dự án đã thực hiện:</h4>
        <div className="rounded-2xl bg-[#b8bec5] px-3 py-2 text-[10px] sm:text-xs text-[#f5f5f5]">
          https://researchhub.university.edu/project/smart-student-network
        </div>
      </section>

      <Link
        to="/find-group/menu"
        className="absolute bottom-24 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#cfd0fa]"
      >
        <ArrowRight className="h-5 w-5 text-[#ffe86f]" />
      </Link>
    </PhoneFrame>
  )
}

export default ProfilePage
