# WeatherWear 🌤️👔

날씨 정보를 확인하고 옷차림을 추천해주는 웹 애플리케이션입니다.

## 주요 기능

- 📍 지역별 실시간 날씨 정보 제공
- 🌡️ 온도, 습도, 풍속, 체감온도 표시
- 🌬️ 대기질 정보 (미세먼지, 초미세먼지)
- 👔 날씨에 맞는 옷차림 추천
- 🎨 날씨에 따라 변하는 배경색
- 👤 로그인/회원가입 기능

## 설치 및 실행 방법

### 1. API 키 설정

1. config.example.js 파일을 복사하여 config.js로 이름 변경
2. 공공데이터포털(https://www.data.go.kr)에서 API 키 발급
   - "기상청_단기예보 조회서비스" 신청
3. config.js 파일을 열고 YOUR_API_KEY_HERE를 발급받은 키로 교체

const CONFIG = {
    API_KEY: '여기에_발급받은_API_키_입력'
};

### 2. 실행

- VS Code의 Live Server 확장 프로그램 사용
- 또는 index.html 파일을 브라우저로 직접 열기
