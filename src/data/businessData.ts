import { RiAccountCircleLine, RiDatabase2Line, RiShieldCrossLine, RiShieldStarLine } from "@remixicon/react";

export interface BusinessFeature {
  title: string;
  desc: string;
}

export interface BusinessService {
  id: string;
  name: string;
  hero: {
    typo: string;
    desc: string;
  };
  problems: string[];
  features: BusinessFeature[];
  effects: {
    before: string;
    after: string;
    description: string;
  };
  projects: string[];
}

export interface BusinessCategory {
  id: string;
  title: string;
  desc: string;
  icon: any; // Remix Icon component
  services: BusinessService[];
}

export const businessCategories: BusinessCategory[] = [
  {
    id: "accounting",
    title: "회계·결산 시스템",
    desc: "금융회사의 회계기준(IFRS17, IFRS9)에 맞춘 통합 회계 및 결산 시스템을 제공합니다.",
    icon: RiAccountCircleLine,
    services: [
      {
        id: "ifrs",
        name: "IFRS",
        hero: {
          typo: "IFRS 회계 시스템",
          desc: "복잡한 보험 회계를 자동화하고 정확한 결산을 지원합니다."
        },
        problems: [
          "수작업으로 인한 결산 지연",
          "대용량 데이터 검증의 한계",
          "데이터 정합성 및 신뢰성 부족",
          "신규 IFRS 규제 대응의 어려움"
        ],
        features: [
          { title: "데이터 수집", desc: "분산된 원천 데이터 자동 수집 및 정제" },
          { title: "회계 처리", desc: "IFRS 기준에 맞춘 계리/회계 분개 자동화" },
          { title: "계산 엔진", desc: "초고속 대용량 병렬 처리 엔진" },
          { title: "리포트", desc: "경영진을 위한 시각화된 분석 리포트 제공" },
          { title: "공시", desc: "감독기관 규제 요건에 맞춘 자동 공시" }
        ],
        effects: {
          before: "수작업 기반의 비효율적 결산 프로세스",
          after: "시스템 자동화를 통한 결산 시간 획기적 단축",
          description: "결산 소요 시간을 50% 이상 단축하고 인적 오류를 원천 차단합니다."
        },
        projects: ["A 생명보험 IFRS17 구축", "B 손해보험 IFRS 결산 고도화", "C 은행 IFRS9 시스템"]
      },
      {
        id: "internal-accounting",
        name: "내부회계",
        hero: {
          typo: "내부회계 관리 시스템",
          desc: "기업의 재무적 신뢰성을 높이고 깐깐해진 외부 감사에 완벽 대비합니다."
        },
        problems: [
          "강화된 신외부감사법 대응 부담",
          "통제 절차의 문서화 및 관리의 어려움",
          "부서 간 원활한 통제 평가 협업 부족",
          "감사 증빙 자료 누락 리스크"
        ],
        features: [
          { title: "통제 체계 수립", desc: "프로세스 및 리스크에 따른 통제 활동 정의" },
          { title: "평가 스케줄링", desc: "설계평가 및 운영평가 자동 일정 관리" },
          { title: "증빙 관리", desc: "평가 결과 및 증빙 서류의 체계적 아카이빙" },
          { title: "모니터링", desc: "부서별 통제 수행 현황 대시보드" },
          { title: "감사 대응", desc: "외부 감사인을 위한 전용 뷰 및 리포트 지원" }
        ],
        effects: {
          before: "엑셀 수기 관리 및 부서별 파편화된 증빙",
          after: "통합 시스템을 통한 실시간 통제 평가 및 증빙 일원화",
          description: "내부 통제 평가 업무의 가시성을 확보하고 외부 감사를 투명하게 통과합니다."
        },
        projects: ["D 카드 내부회계관리제도 구축", "E 증권사 내부회계 고도화"]
      }
    ]
  },
  {
    id: "risk",
    title: "리스크 관리",
    desc: "금융 리스크를 정확히 측정하고 관리하여 안정적인 경영 의사결정을 지원합니다.",
    icon: RiShieldCrossLine,
    services: [
      {
        id: "rbc",
        name: "RBC",
        hero: {
          typo: "RBC (지급여력비율) 시스템",
          desc: "정교한 위험액 산출을 통해 보험사의 재무 건전성을 안전하게 유지합니다."
        },
        problems: [
          "감독원 산출 기준 변경에 따른 대응 지연",
          "방대한 계리 데이터 집계의 비효율",
          "위험액 산출 오류 시 발생하는 패널티 부담",
          "시나리오별 리스크 시뮬레이션 한계"
        ],
        features: [
          { title: "기준 정보 관리", desc: "감독원 규정 변경에 따른 산출 룰(Rule) 유연화" },
          { title: "데이터 매핑", desc: "자산/부채 및 익스포저 데이터 자동 매핑" },
          { title: "위험액 산출", desc: "시장/신용/운영 리스크 위험액 정밀 산출" },
          { title: "가용자본 산출", desc: "자본 항목별 가용자본 및 한도 관리" },
          { title: "비율 분석", desc: "시나리오별 RBC 비율 시뮬레이션 및 분석" }
        ],
        effects: {
          before: "잦은 규정 변경에 대응하기 어려운 경직된 수작업",
          after: "규정 변화에 유연한 룰 기반의 자동화 산출 엔진",
          description: "정확한 RBC 비율 산출로 감독기관 규제에 선제적으로 대응합니다."
        },
        projects: ["F 생명보험 K-ICS 대응 시스템", "G 손해보험 신지급여력제도 구축"]
      },
      {
        id: "total-risk",
        name: "통합리스크",
        hero: {
          typo: "통합리스크 관리 시스템",
          desc: "전사적 리스크 요인을 한눈에 파악하고 전략적으로 통제합니다."
        },
        problems: [
          "부서별 개별 관리로 인한 리스크 사각지대 발생",
          "리스크 한도 초과 시 실시간 알림 부재",
          "신종 리스크(ESG 등) 지표 통합의 어려움",
          "위기 상황 분석(Stress Test) 인프라 부족"
        ],
        features: [
          { title: "리스크 통합 집계", desc: "신용, 시장, 운영, 유동성 리스크 데이터 통합" },
          { title: "한도 관리", desc: "부서/상품/포트폴리오별 리스크 한도 설정" },
          { title: "대시보드", desc: "경영진을 위한 전사 리스크 현황 실시간 모니터링" },
          { title: "조기 경보", desc: "임계치 초과 예상 시 자동 알림(EWS) 발송" },
          { title: "위기 분석", desc: "다양한 거시 경제 지표를 반영한 스트레스 테스트" }
        ],
        effects: {
          before: "각 부서별 파편화된 보고서 위주의 후행적 리스크 파악",
          after: "전사 리스크 통합 모니터링을 통한 선제적 위기 대응 체계 확보",
          description: "기업 가치를 훼손할 수 있는 잠재적 리스크를 사전에 식별하고 차단합니다."
        },
        projects: ["H 은행 전사 통합리스크 고도화", "I 저축은행 리스크 관리 시스템"]
      },
      {
        id: "ncr",
        name: "NCR",
        hero: {
          typo: "NCR (영업용순자본비율) 시스템",
          desc: "증권사의 자본 적정성을 정밀하게 평가하고 영업 경쟁력을 확보합니다."
        },
        problems: [
          "복잡한 파생상품 및 구조화 상품의 위험액 산출 난해",
          "연결 NCR 산출 시 자회사 데이터 취합 지연",
          "실시간에 가까운 NCR 비율 파악 요구 증대",
          "감독원 보고 양식 자동 생성 인프라 부족"
        ],
        features: [
          { title: "포지션 집계", desc: "전 지점 및 부서의 자산/부채 포지션 일괄 수집" },
          { title: "영업용순자본", desc: "자본금, 이익잉여금 등 차감/가산 항목 자동 연산" },
          { title: "총위험액 산출", desc: "개별 파생상품의 시장/신용 위험액 정밀 계산" },
          { title: "시뮬레이션", desc: "신규 투자 진행 시 예상 NCR 변동 시뮬레이션" },
          { title: "감독 보고서", desc: "금감원 표준 양식 리포트 자동 생성" }
        ],
        effects: {
          before: "월 결산 이후에나 확인 가능했던 사후적 자본 비율 관리",
          after: "일일 NCR 산출 및 시뮬레이션을 통한 선제적 자본 운용",
          description: "적정 자본 유지와 공격적인 영업 투자 사이의 최적의 균형을 찾습니다."
        },
        projects: ["J 증권 신 NCR 산출 시스템 구축", "K 투자증권 자본 적정성 모니터링"]
      }
    ]
  },
  {
    id: "soundness",
    title: "건전성 관리",
    desc: "금융자산의 건전성을 평가하고 대손충당금을 효율적으로 관리합니다.",
    icon: RiShieldStarLine,
    services: [
      {
        id: "asset-quality",
        name: "자산건전성",
        hero: {
          typo: "자산건전성 분류 시스템",
          desc: "보유 자산의 부실 위험을 선제적으로 분류하고 건전성을 제고합니다."
        },
        problems: [
          "여신 자산의 차주 신용도 변동에 따른 실시간 분류 지연",
          "자산 재분류 시 복잡한 계좌 간 연관성 파악의 어려움",
          "주관적 판단 개입으로 인한 분류 기준 불일치",
          "부실 자산 사후 관리 모니터링 부재"
        ],
        features: [
          { title: "차주 정보 수집", desc: "내외부 신용평가 및 연체 정보 자동 연계" },
          { title: "자동 분류", desc: "감독원 가이드라인 기반의 건전성 단계별(정상~추정손실) 룰 자동 적용" },
          { title: "수동 재분류", desc: "예외 상황에 대비한 심사역의 재분류 승인 워크플로우" },
          { title: "변동 내역 추적", desc: "건전성 등급 변경 이력 및 사유 체계적 관리" },
          { title: "사후 관리", desc: "부실화 징후 자산 대상 워치리스트(Watch-list) 제공" }
        ],
        effects: {
          before: "담당자 수기에 의존한 부정확하고 지연되는 자산 분류",
          after: "객관적 룰(Rule)에 기반한 일 단위의 정밀한 자산 건전성 파악",
          description: "부실 자산을 조기에 식별하여 금융회사의 자산 포트폴리오를 건강하게 유지합니다."
        },
        projects: ["L 은행 자산건전성 재분류 고도화", "M 캐피탈 여신 건전성 관리"]
      },
      {
        id: "bad-debt-reserve",
        name: "대손충당금",
        hero: {
          typo: "대손충당금 산출 시스템",
          desc: "미래 발생 가능한 손실을 정확히 예측하여 적정 충당금을 적립합니다."
        },
        problems: [
          "IFRS9 기준의 예상신용손실(ECL) 모델 적용의 복잡성",
          "거시경제 변수 연동의 기술적 한계",
          "경영진의 목표 이익에 맞춘 시뮬레이션 환경 부족",
          "방대한 시계열 데이터 처리 시 성능 저하"
        ],
        features: [
          { title: "ECL 모델링", desc: "PD, LGD, EAD 모델 관리 및 산출 룰 적용" },
          { title: "거시 변수 적용", desc: "미래 전망(Forward-looking) 거시 경제 지표 반영" },
          { title: "충당금 산출", desc: "계좌/차주 단위의 대손충당금 초고속 병렬 계산" },
          { title: "시뮬레이션", desc: "경제 시나리오별 충당금 변동 및 재무 영향 분석" },
          { title: "회계 연동", desc: "산출된 충당금 결과의 회계 전표 자동 생성" }
        ],
        effects: {
          before: "과거 손실 경험에만 의존한 단순 충당금 적립",
          after: "다양한 시나리오를 반영한 IFRS9 기반의 정밀한 예측 충당금 산출",
          description: "결산 시 충당금 변동 폭을 사전에 예측하고 재무적 충격을 완화합니다."
        },
        projects: ["N 은행 IFRS9 대손충당금 시스템", "O 저축은행 예상신용손실 산출 고도화"]
      }
    ]
  },
  {
    id: "platform",
    title: "금융 데이터 플랫폼",
    desc: "빅데이터 통합부터 운영까지, 금융 비즈니스를 혁신하는 데이터 플랫폼을 제공합니다.",
    icon: RiDatabase2Line,
    services: [
      {
        id: "data-integration",
        name: "데이터 통합/정보계",
        hero: {
          typo: "정보계 데이터 플랫폼",
          desc: "사일로화된 금융 데이터를 통합하여 비즈니스 인사이트의 원천을 만듭니다."
        },
        problems: [
          "부서별로 산재된 데이터 원천으로 인한 정합성 오류",
          "레거시(Legacy) 시스템의 느린 데이터 추출 속도",
          "현업의 데이터 접근 및 분석의 어려움",
          "데이터 거버넌스 및 품질 관리 체계 부재"
        ],
        features: [
          { title: "데이터 수집(ETL)", desc: "다양한 원천 시스템으로부터 초고속 데이터 수집 및 가공" },
          { title: "통합 DW", desc: "전사 표준에 맞춘 대용량 데이터 저장 및 마트 구성" },
          { title: "거버넌스", desc: "메타 데이터, 표준 단어, 품질 검증 체계 확립" },
          { title: "대시보드", desc: "현업 부서에서 직관적으로 활용 가능한 시각화 분석 도구" },
          { title: "데이터 포털", desc: "누구나 필요한 데이터를 검색하고 신청할 수 있는 사내 포털" }
        ],
        effects: {
          before: "데이터를 요청하고 분석하기까지 수주가 소요되는 느린 사이클",
          after: "신뢰할 수 있는 전사 데이터를 현업이 직접 탐색하고 분석하는 셀프 서비스 환경",
          description: "단일 진실 공급원(Single Source of Truth)을 확보하여 데이터 기반 의사결정 기업으로 도약합니다."
        },
        projects: ["P 은행 차세대 정보계 구축", "Q 보험사 클라우드 데이터 레이크", "R 증권사 통합 데이터 포털"]
      },
      {
        id: "operations",
        name: "플랫폼 운영관리",
        hero: {
          typo: "플랫폼 운영관리 (ITO)",
          desc: "데이터 플랫폼의 중단 없는 안정적 운영과 지속적인 고도화를 책임집니다."
        },
        problems: [
          "시스템 오픈 이후 전문 운영 인력 확보의 어려움",
          "장애 발생 시 원인 파악 및 대응의 지연",
          "데이터 증가에 따른 플랫폼 성능 저하 이슈",
          "현업의 끊임없는 신규 데이터 분석 요건 백로그 적체"
        ],
        features: [
          { title: "상시 모니터링", desc: "플랫폼 인프라 및 데이터 파이프라인 상태 감시" },
          { title: "장애 선제 대응", desc: "이상 징후 탐지 알림 체계 및 신속 복구 가이드라인 운영" },
          { title: "성능 튜닝", desc: "대용량 쿼리 및 ETL 배치 성능 최적화 지속 수행" },
          { title: "현업 지원(SR)", desc: "신규 데이터 마트 구성 및 분석 리포트 요건 신속 지원" },
          { title: "보안 관리", desc: "금융 보안 규정을 준수하는 접근 제어 및 암호화 점검" }
        ],
        effects: {
          before: "장애 발생 시 사후 대응에 급급한 불안정한 인프라",
          after: "최고의 전문가가 전담하는 안정적이고 효율적인 플랫폼 운영",
          description: "플랫폼 운영 부담을 덜고, 고객은 비즈니스 가치 창출에만 집중할 수 있습니다."
        },
        projects: ["S 금융그룹 통합 DW 운영 유지보수", "T 카드사 빅데이터 플랫폼 ITO"]
      }
    ]
  }
];
