export type Mission = {
  id: string
  title: string
  description: string
  category: '집중력' | '기억력' | '언어' | '수리'
}

export const missions: Mission[] = [
  {
    id: 'c01',
    title: '미션 01 — 집중 타이머',
    category: '집중력',
    description:
      '15분 동안 알림·소리·대화를 모두 끄고 한 가지 작업만 수행하세요. 끝나면 5분 휴식 후 느낀 점을 기록합니다.',
  },
  {
    id: 'c02',
    title: '미션 02 — 기억 카드',
    category: '기억력',
    description:
      '오늘 새로 알게 된 5가지를 메모하고 1시간 후 메모 없이 복기해 보세요. 빠진 항목을 비교 기록합니다.',
  },
  {
    id: 'c03',
    title: '미션 03 — 단어 연결',
    category: '언어',
    description:
      '임의의 세 단어로 문장 3개를 만듭니다. 각 문장에서 단어 간 논리적 연결을 설명해 보세요.',
  },
  {
    id: 'c04',
    title: '미션 04 — 수열 퍼즐',
    category: '수리',
    description:
      '수열 1, 2, 4, 7, ?의 규칙을 찾고 다음 수를 제시하세요. 규칙을 두 가지 방식으로 설명해 봅니다.',
  },
  {
    id: 'c05',
    title: '미션 05 — 방해 요소 지도',
    category: '집중력',
    description:
      '최근 1시간 활동을 회상하며 방해 요소를 3가지 분류로 정리하고, 각 분류의 제거 방법을 한 줄로 정의합니다.',
  },
  {
    id: 'c06',
    title: '미션 06 — 청킹 기억',
    category: '기억력',
    description:
      '무작위 숫자 10자리를 3~4개 덩어리로 나눠 외우고 10분 후 재기억합니다. 사용한 청킹 전략을 기록하세요.',
  },
  {
    id: 'c07',
    title: '미션 07 — 요약 100자',
    category: '언어',
    description:
      '짧은 기사/문단을 읽고 핵심 주장과 근거를 100자 이내로 요약합니다. 핵심 키워드 3개를 뽑으세요.',
  },
  {
    id: 'c08',
    title: '미션 08 — 계산 루틴',
    category: '수리',
    description:
      '암산으로 27×14, 125÷5, 19%의 260을 계산하고, 선택한 계산 전략(분배법칙, 반올림 보정 등)을 적습니다.',
  },
  {
    id: 'c09',
    title: '미션 09 — 포모도로 리뷰',
    category: '집중력',
    description:
      '25분 작업+5분 휴식 2세트를 수행하고, 각 세트의 목표 달성 여부와 방해 요소를 체크합니다.',
  },
  {
    id: 'c10',
    title: '미션 10 — 위치 기억법',
    category: '기억력',
    description:
      '장소법을 사용해 7개 항목을 순서대로 기억합니다. 각 항목-장소 매핑을 간단히 스케치하세요.',
  },
  {
    id: 'c11',
    title: '미션 11 — 역피라미드 글쓰기',
    category: '언어',
    description:
      '결론→근거→세부의 역피라미드 구조로 150자 글을 작성하세요. 한 문장 핵심 메시지를 맨 앞에 둡니다.',
  },
  {
    id: 'c12',
    title: '미션 12 — 비율 감각',
    category: '수리',
    description:
      '레시피 2인분을 3인분으로 바꾸며 재료 비율을 환산합니다. 각 항목의 변경 근거를 숫자로 표기합니다.',
  },
  {
    id: 'c13',
    title: '미션 13 — 딥워크 준비',
    category: '집중력',
    description:
      '90분 딥워크 세션을 계획하고, 시작 조건(장소, 소음, 기기), 종료 조건(산출물, 체크리스트)을 명시합니다.',
  },
  {
    id: 'c14',
    title: '미션 14 — 스토리텔링',
    category: '언어',
    description:
      '시작-갈등-해결의 3막 구조로 120자 이야기를 작성합니다. 핵심 감정을 1단어로 명명하세요.',
  },
  {
    id: 'c15',
    title: '미션 15 — 추정 계산',
    category: '수리',
    description:
      '오늘 걸음 수로 이동한 거리를 근사(평균 보폭 가정)하고, 오차 요인을 2가지 이상 나열합니다.',
  },
]

export function getMissionById(id: string): Mission | undefined {
  return missions.find((m) => m.id === id)
}

