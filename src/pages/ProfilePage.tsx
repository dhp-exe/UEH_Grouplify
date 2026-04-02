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
      <p className="mb-1 text-[40px] text-[#195459]">{label}</p>
      <div className="flex items-center gap-3 rounded-full bg-[#f2f2f2] px-5 py-3 text-[#666]">
        {icon}
        <span className="text-[34px]">{value}</span>
      </div>
    </div>
  )
}

function ProfilePage() {
  return (
    <PhoneFrame tone="teal">
      <StatusBar />
      <h2 className="text-center text-[46px] text-[#ffe4e1]">GROUPLIFY</h2>
      <h1 className="mb-8 text-center text-[64px] leading-[0.95]">Thông tin cá nhân</h1>

      <section className="rounded-[20px] bg-[#ffe4e1] p-5 text-[#195459]">
        <Field label="Họ tên" value="Lâm Hà Thảo Như" icon={<UserRound className="h-8 w-8" />} />
        <Field label="Khoá" value="K50" icon={<IdCard className="h-8 w-8" />} />
        <Field label="Lớp" value="EL0001" icon={<BookOpen className="h-8 w-8" />} />
        <Field
          label="Ngành"
          value="Luật Kinh Tế"
          icon={<GraduationCap className="h-8 w-8" />}
        />
      </section>

      <section className="mt-3">
        <h3 className="text-[44px]">Điểm mạnh của tôi</h3>
        <p className="text-[30px] text-[#daf0ef]">Điểm mạnh nổi trội</p>
        <div className="mt-2 flex flex-wrap gap-3">
          {featuredSkills.map((skill, idx) => (
            <span
              key={skill}
              className={`rounded-full px-6 py-2 text-[30px] ${
                idx === 2 ? 'bg-[#f8a29e] text-[#195459]' : 'bg-[#ffe4e1] text-[#195459]'
              }`}
            >
              {skill}
            </span>
          ))}
        </div>

        <p className="mt-1 text-[30px] text-[#daf0ef]">Những điểm mạnh khác</p>
        <div className="mt-4 flex flex-wrap gap-3">
          {otherSkills.map((skill, idx) => (
            <span
              key={`${skill}-${idx}`}
              className={`rounded-full px-5 py-2 text-[24px] ${
                idx === 4 ? 'bg-[#f8a29e] text-[#195459]' : 'bg-[#fff1f1] text-[#195459]'
              }`}
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-4">
        <h4 className="text-[30px]">Sản phẩm, dự án đã thực hiện:</h4>
        <div className="rounded-2xl bg-[#b8bec5] px-4 py-3 text-[28px] text-[#f5f5f5]">
          https://researchhub.university.edu/project/smart-student-network
        </div>
      </section>

      <Link
        to="/find-group/menu"
        className="absolute bottom-7 right-5 flex h-24 w-24 items-center justify-center rounded-full bg-[#cfd0fa]"
      >
        <ArrowRight className="h-9 w-9 text-[#ffe86f]" />
      </Link>
    </PhoneFrame>
  )
}

export default ProfilePage
