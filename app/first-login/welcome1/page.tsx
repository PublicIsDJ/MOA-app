'use client';


import { Button } from '@/shared/ui/button';

export default function FirstLoginPage() {

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-white px-6 py-10">
      {/* 최소 높이를 브라우저 화면의 최대 높이로 설정, Flexbox 레이아웃을 활성화, 세로방향 정렬, 아이템들은 가운데로 정렬, 세로방향으로 위에서 아래까지 배치, 배경은 흰색, 좌우여백 6, 상하여백 10*/}
      <div className="flex justify-center mt-4 space-x-2">
        {/* 안에 요소를 가로로 나열하며 가운데 정렬하고 상단에서 약 4만큼 띄우고 각각의 간격은 2만큼 띄운다 */}
        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
        {/* 가로 세로 2, 완전한 원형 배경색은 파랑과 회색 */}
        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
      </div>

      {/* 메인 콘텐츠 : 컨테이너 안에 남은 공간을 모두 차지*/}
      <div className="flex-1 flex flex-col items-center justify-center">
        {/* 이모지: 5배 크게, 아래화 6배 간격 띄우기 */}
        <div className="text-5xl mb-6">📝</div>

        {/* 제목 */}
        <h1 className="text-2xl font-bold text-gray-900 mb-3">만나서 반가워요!</h1>

        {/* 설명 */}
        <p className="text-center text-gray-500 text-base leading-relaxed">
          맞춤형 서비스를 위해
          <br />
          간단한 정보를 입력해 주세요
        </p>
      </div>

      {/* 하단 버튼 */}
      <Button
        status="default"
        className="py-[12px] mt-[30px]"
      >
        다음으로
      </Button> 
    </div>
  );
}
