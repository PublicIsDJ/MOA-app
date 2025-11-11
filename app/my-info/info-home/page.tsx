
export default function ProfileScreen() {
  return (
    <div className="min-h-screen bg-[#F6F6F6]">
      {/* 상단 상태바 여백 */}
      <div className="h-6" />



      {/* 컨텐츠 래퍼 */}
      <main className="mx-auto max-w-sm pb-24 px-4">
        {/* 제목 */}
        <header className="pt-4">
          <h1 className="text-center text-base font-extrabold text-gray-900">내 정보</h1>
        </header>

        {/* 아바타 카드 */}
        <section className="mt-4 flex flex-col items-center">
          <div className="relative">
            <img
              src="https://picsum.photos/160/160"
              alt="프로필"
              className="h-32 w-32 rounded-2xl object-cover shadow-sm"
            />
            {/* 카메라 아이콘 버튼 */}
            <button
              className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-white shadow grid place-items-center border border-gray-200"
              aria-label="프로필 사진 변경"
            >
              {/* 카메라 아이콘 */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3l2-3h8l2 3h3a2 2 0 0 1 2 2z"></path>
                <circle cx="12" cy="13" r="4"></circle>
              </svg>
            </button>
          </div>
          <h2 className="mt-3 text-lg font-extrabold text-gray-900">김모아</h2>
          <button className="mt-2 rounded-full bg-[#3E56F6] px-4 py-2 text-xs font-bold text-white shadow-sm active:scale-[0.99]">내 정보 수정</button>
        </section>


        {/* 통계 카드 */}
        <section className="">
          <div className="rounded-2xl bg-white p-3 shadow-sm mt-4">
            <div className="grid grid-cols-3 gap-2">
              {/* 총 학습 시간 */}
              <StatItem
                label="총 학습 시간"
                value="20시간"
                icon={
                  <span className="inline-grid h-9 w-9 place-items-center rounded-full bg-[#F2F6FF]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#3E56F6]">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  </span>
                }
              />

              {/* 함께한날 */}
              <StatItem
                label="함께한날"
                value="12일째"
                icon={
                  <span className="inline-grid h-9 w-9 place-items-center rounded-full bg-[#F2F6FF]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#3E56F6]">
                      <path d="M3 4h18M8 2v4M16 2v4M3 10h18M5 14h14M7 18h10"></path>
                    </svg>
                  </span>
                }
              />

              {/* 총 학습 횟수 */}
              <StatItem
                label="총 학습 횟수"
                value="8회"
                icon={
                  <span className="inline-grid h-9 w-9 place-items-center rounded-full bg-[#F2F6FF]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#3E56F6]">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </span>
                }
              />
            </div>
          </div>
        </section>

        {/* 나의 분석 */}
        <section className="mt-5">
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <h3 className="text-[15px] font-extrabold text-gray-900">나의 분석</h3>

            <ul className="mt-3 divide-y divide-gray-100">
              <ListItem title="활동 리포트" subtitle="상세한 활동 분석 보기" />
              <ListItem title="감정 트렌드" subtitle="최근 감정 상태 분석" icon="rainbow" />
            </ul>
          </div>
        </section>

        {/* 로그아웃 */}
        <div className="py-6 text-center">
          <button className="text-sm font-bold text-gray-500 underline underline-offset-2">로그아웃</button>
        </div>
      </main>

      {/* 하단 탭바 */}
      <nav className="fixed bottom-0 left-0 right-0 mx-auto max-w-sm border-t border-gray-200 bg-white/95 backdrop-blur px-3 py-2">
        <ul className="grid grid-cols-4">
          <TabItem label="홈" />
          <TabItem label="카드" />
          <TabItem label="보관함" />
          <TabItem label="내정보" active />
        </ul>
      </nav>
    </div>
  );
}

function StatItem({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-3 text-center">
      <div className="mb-1 flex items-center justify-center gap-1">
        {icon}
      </div>
      <p className="text-[11px] text-gray-500">{label}</p>
      <p className="mt-0.5 text-sm font-extrabold text-[#3E56F6]">{value}</p>
    </div>
  );
}

function ListItem({ title, subtitle, icon }: { title: string; subtitle: string; icon?: "rainbow" }) {
  return (
    <li className="flex items-center justify-between py-3">
      <div className="flex items-center gap-3">
        <div className="grid h-8 w-8 place-items-center rounded-lg bg-gray-50">
          {icon === "rainbow" ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-500">
              <path d="M22 17a10 10 0 0 0-20 0" />
              <path d="M18 17a6 6 0 0 0-12 0" />
              <path d="M14 17a2 2 0 0 0-4 0" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#3E56F6]">
              <path d="M3 3h18v14H3z" />
              <path d="M3 9h18" />
              <path d="M7 21h10" />
              <path d="M9 17h6" />
            </svg>
          )}
        </div>
        <div>
          <p className="text-[15px] font-bold text-gray-900">{title}</p>
          <p className="text-[12px] text-gray-500">{subtitle}</p>
        </div>
      </div>

      {/* 우측 화살표 */}
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </li>
  );
}

function TabItem({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <li className="flex flex-col items-center justify-center gap-1 py-1">
      {/* 아이콘 더미 */}
      <div className={`h-5 w-5 rounded ${active ? "bg-[#3E56F6]" : "bg-gray-300"}`} />
      <span className={`text-[11px] ${active ? "font-extrabold text-[#3E56F6]" : "text-gray-500"}`}>{label}</span>
    </li>
  );
}
