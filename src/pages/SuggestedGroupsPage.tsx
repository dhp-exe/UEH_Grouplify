import { CheckCircle2, PlusCircle, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import PhoneFrame from '../components/PhoneFrame'
import BottomNav from '../components/BottomNav'

function GroupCard({
  title,
  chatSlug,
  members,
  have,
  miss,
}: {
  title: string
  chatSlug: string
  members: { initials: string; firstName: string }[]
  have: string[]
  miss: string[]
}) {
  return (
    <section className="rounded-[30px] bg-[#9eb9be] p-4 shadow-[10px_14px_0_rgba(6,53,65,0.8)]">
      <h3 className="text-xl text-[#d6b9da] drop-shadow-[0_3px_8px_rgba(31,27,44,0.5)]">{title}</h3>
      <div className="mt-2 flex items-start gap-3">
        {members.map((member) => (
          <div key={member.initials} className="text-center">
            <div className="h-10 w-10 rounded-full bg-[#b5ebf1] text-xs text-black leading-[40px]">
              {member.initials}
            </div>
            <p className="mt-1 text-[10px] text-[#1f2324]">{member.firstName}</p>
          </div>
        ))}
        <div className="text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#7da6ad]">
            <PlusCircle className="h-6 w-6 text-[#ddd4d2]" />
          </div>
          <p className="mt-1 text-[10px] text-[#1f2324]">Bạn?</p>
        </div>
      </div>

      <div className="mt-3 text-sm text-[#1f2324]">
        <p className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-green-700" /> Đã có:
          {have.map((skill) => (
            <span key={skill} className="rounded-full bg-[#b9edb2] px-2 text-[10px] sm:text-xs">
              {skill}
            </span>
          ))}
        </p>
        <p className="mt-1 flex items-center gap-2">
          <X className="h-4 w-4 text-red-600" /> Thiếu:
          {miss.map((skill) => (
            <span key={skill} className="rounded-full bg-[#f3b5b1] px-2 text-[10px] sm:text-xs">
              {skill}
            </span>
          ))}
        </p>
      </div>

      <Link
        to={`/chat/${chatSlug}`}
        className="mt-3 block rounded-full bg-[#9ceaf0] transition hover:scale-105 py-3 text-center text-sm font-semibold text-[#2d3435]"
      >
        Tham gia nhóm
      </Link>
    </section>
  )
}

function SuggestedGroupsPage() {
  return (
    <PhoneFrame tone="teal">
      <section className="mt-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl">Đã tìm thấy!</h1>
              <p className="text-lg">Đề xuất 2 nhóm phù hợp với bạn</p>
            </div>
            <Link to="/find-group/menu" className="rounded-full transition hover:scale-110 bg-[#c0c7c5] p-2">
              <X className="h-5 w-5 text-[#195459]" />
            </Link>
          </div>

          <div className="mt-4 space-y-5">
            <GroupCard
              title="Nhóm Groupy"
              chatSlug="groupy"
              members={[
                { initials: 'AT', firstName: 'Thư' },
                { initials: 'ĐA', firstName: 'Anh' },
                { initials: 'MA', firstName: 'Ánh' },
              ]}
              have={['Nội dung', 'Thiết kế', 'Xử lý Data']}
              miss={['Thuyết trình']}
            />
            <GroupCard
              title="Nhóm FlareUp"
              chatSlug="flareup"
              members={[
                { initials: 'NH', firstName: 'Huyền' },
                { initials: 'TD', firstName: 'Duy' },
              ]}
              have={['Thiết kế', 'Xử lý Data']}
              miss={['Thuyết trình', 'Nội dung']}
            />
          </div>
      </section>
      <BottomNav active="find-group" highlightAllLabels />
    </PhoneFrame>
  )
}

export default SuggestedGroupsPage
