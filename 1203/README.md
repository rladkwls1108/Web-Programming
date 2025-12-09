# 💊 나으리 (Nauri)

AI 기반 증상 분석 및 약 추천 PWA 서비스

## 📌 프로젝트 소개

사용자가 자신의 증상을 간단히 입력하면, AI가 실시간으로 증상을 분석하고 적합한 약을 추천해주는 웹 서비스입니다.

## 🎯 개발 배경

- **정확한 약 선택의 어려움**: 약국에서 수많은 약 중 선택이 어렵고, 부작용이나 복약 오류의 위험
- **신뢰할 정보 부족**: 인터넷 의약품 정보의 정확성이 보장되지 않음
- **의료 정보 접근성 격차**: 약 성분, 금기 사항 등 의료 정보 이해의 어려움

## ✨ 주요 기능

| 기능 | 설명 |
|------|------|
| 정확한 증상 분석 | AI가 사용자 입력 증상을 정밀하게 분석 |
| 실시간 약 추천 | 증상에 가장 적합한 약 정보를 실시간 제공 |
| 주변 약국 찾기 | 추천받은 약을 구매할 수 있는 주변 약국 지도 표시 |

## 🛠️ 기술 스택

- **Frontend**: HTML, CSS, JavaScript
- **PWA**: manifest.json, Service Worker
- **Design**: Figma
- **Deployment**: Lovable

## 📡 활용 API

| API | 용도 |
|-----|------|
| Gemini API | 사용자 증상 분석 및 맞춤형 약 추천 (AI 자연어 처리) |
| 식품의약품안전처 e약은요 API | 공식 의약품 정보, 복용법, 부작용 데이터 |
| Kakao Map API | 주변 약국 위치 검색 및 지도 표시 |

## 📱 서비스 흐름
```
1. 증상 입력 → 사용자가 자연어로 증상 입력
2. AI 분석 → 실시간 증상 분석 및 추가 질문 생성
3. 약 추천 → 분석 결과 기반 적합한 약 추천
4. 상세 정보 → 복용법, 주의사항, 부작용 등 제공
```

## 📂 프로젝트 구조
```
├── index.html
├── manifest.json
├── pwabuilder-sw.js
├── offline.html
└── icons/
    ├── icon-144x144.png
    ├── icon-192x192.png
    ├── icon-512x512.png
    └── apple-touch-icon.png
```

## 🚀 PWA 지원

- 홈 화면 추가 (앱처럼 사용)
- 오프라인 캐싱 지원
- Service Worker를 통한 API 응답 캐싱

## 💡 기대효과

- AI 기반 분석으로 정확한 약 선택 지원
- 시간/장소 제약 없이 신뢰할 수 있는 의료 정보 접근
- 이해하기 쉬운 정보 제공으로 자기 건강관리 능력 강화
- 직관적인 UI와 실시간 처리로 빠르고 간편한 서비스 이용

## 🔗 참고 자료

- [Google AI Studio](https://ai.google.dev/aistudio?hl=ko)
- [Gemini](https://gemini.google.com/app?hl=ko)
- [Lovable](https://lovable.dev/)
- [공공데이터포털](https://www.data.go.kr/)
- [Kakao Developers](https://developers.kakao.com/)

---

© 2025 애플파이 팀 - 나으리
