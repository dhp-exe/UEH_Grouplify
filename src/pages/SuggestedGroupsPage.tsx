import { CheckCircle2, PlusCircle, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import PhoneFrame from '../components/PhoneFrame'
import StatusBar from '../components/StatusBar'

function GroupCard({
  title,
  members,
  have,
  miss,
}: {
  title: string
  members: string[]
  have: string[]
  miss: string[]
}) {
  return (
    <section className="rounded-[30px] bg-[#9eb9be] p-4 shadow-[10px_14px_0_rgba(6,53,65,0.8)]">
      <h3 className="text-lg sm:text-xl text-[#d6b9da] drop-shadow-[0_3px_8px_rgba(31,27,44,0.5)]">{title}</h3>
      <div className="mt-2 flex items-center gap-3">
        {members.map((member) => (
          <div key={member} className="text-center">
            <div className="h-10 w-10 rounded-full bg-[#b5ebf1] text-xs text-black leading-[40px]">
              {member.slice(0, 2)}
            </div>
          </div>
        ))}
        <PlusCircle className="h-8 w-8 text-[#ddd4d2]" />
      </div>

      <div className="mt-3 text-xs sm:text-sm text-[#1f2324]">
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
        to="/chat/flareup"
        className="mt-3 block rounded-full bg-[#9ceaf0] py-3 text-center text-xs sm:text-sm text-[#2d3435]"
      >
        Tham gia nhóm
      </Link>
    </section>
  )
}

function SuggestedGroupsPage() {
  return (
    <PhoneFrame tone="teal">
      <StatusBar />
      <section className="mt-3">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-xl sm:text-3xl">Đã tìm thấy!</h1>
              <p className="text-sm sm:text-lg">Đề xuất 2 nhóm phù hợp với bạn</p>
            </div>
            <Link to="/find-group/menu" className="rounded-full bg-[#c0c7c5] p-2">
              <X className="h-5 w-5 text-[#195459]" />
            </Link>
          </div>

          <div className="mt-4 space-y-5">
            <GroupCard
              title="Nhóm Groupy"
              members={['AT', 'DA', 'MA']}
              have={['Nội dung', 'Thiết kế', 'Xử lý Data']}
              miss={['Thuyết trình']}
            />
            <GroupCard
              title="Nhóm FlareUp"
              members={['NH', 'TD']}
              have={['Thiết kế', 'Xử lý Data']}
              miss={['Thuyết trình', 'Nội dung']}
            />
          </div>
      </section>
    </PhoneFrame>
  )
}

export default SuggestedGroupsPage
