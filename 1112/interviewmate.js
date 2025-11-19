// ============================================================
// 인증 관련
// ============================================================

let currentUser = JSON.parse(localStorage.getItem('currentUser'));
let users = JSON.parse(localStorage.getItem('users') || '[]');

function checkAuth() {
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupHeaderBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const userName = document.getElementById('userName');

    if (!currentUser) {
        loginBtn.classList.remove('hidden');
        signupBtn.classList.remove('hidden');
        logoutBtn.classList.add('hidden');
        userName.classList.add('hidden');
    } else {
        loginBtn.classList.add('hidden');
        signupBtn.classList.add('hidden');
        logoutBtn.classList.remove('hidden');
        userName.classList.remove('hidden');
        userName.textContent = currentUser.name + '님';
    }
}

function openLoginModal() {
    document.getElementById('loginModal').classList.remove('hidden');
}

function closeLoginModal() {
    document.getElementById('loginModal').classList.add('hidden');
}

function openSignupModal() {
    document.getElementById('signupModal').classList.remove('hidden');
}

function closeSignupModal() {
    document.getElementById('signupModal').classList.add('hidden');
}

function login(email, password) {
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        checkAuth();
        closeLoginModal();
        showToast('로그인되었습니다');
        return true;
    } else {
        showToast('이메일 또는 비밀번호가 올바르지 않습니다');
        return false;
    }
}

function signup(name, email, password) {
    if (users.find(u => u.email === email)) {
        showToast('이미 가입된 이메일입니다');
        return false;
    }
    
    const newUser = { name, email, password, createdAt: new Date().toISOString() };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    currentUser = newUser;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    checkAuth();
    closeSignupModal();
    showToast('회원가입이 완료되었습니다');
    return true;
}

function logout() {
    if (confirm('로그아웃하시겠습니까?')) {
        currentUser = null;
        localStorage.removeItem('currentUser');
        checkAuth();
        showToast('로그아웃되었습니다');
    }
}

// ============================================================
// 데이터 - 각 분야별 질문 10개 이상
// ============================================================

const interviewQuestions = {
    // IT/컴퓨터
    it: [
        // 인성 - 초급
        { text: "자기소개를 해주세요.", category: "personality", difficulty: "easy", field: "it" },
        { text: "IT 분야에 지원한 이유는 무엇인가요?", category: "personality", difficulty: "easy", field: "it" },
        { text: "프로그래밍 언어 중 가장 좋아하는 것은 무엇인가요?", category: "personality", difficulty: "easy", field: "it" },
        { text: "개발자가 되고 싶은 이유는 무엇인가요?", category: "personality", difficulty: "easy", field: "it" },
        
        // 전공 - 초급
        { text: "가장 자신 있는 프로그래밍 언어는 무엇인가요?", category: "major", difficulty: "easy", field: "it" },
        { text: "Git을 사용한 경험이 있나요?", category: "major", difficulty: "easy", field: "it" },
        { text: "프론트엔드와 백엔드의 차이점은 무엇인가요?", category: "major", difficulty: "easy", field: "it" },
        { text: "HTML, CSS, JavaScript의 역할을 설명해주세요.", category: "major", difficulty: "easy", field: "it" },
        { text: "데이터베이스를 사용해본 경험이 있나요?", category: "major", difficulty: "easy", field: "it" },
        { text: "API가 무엇인지 설명해주세요.", category: "major", difficulty: "easy", field: "it" },
        
        // 전공 - 중급
        { text: "본인의 기술 스택을 소개해주세요.", category: "major", difficulty: "medium", field: "it" },
        { text: "객체지향 프로그래밍(OOP)에 대해 설명해주세요.", category: "major", difficulty: "medium", field: "it" },
        { text: "RESTful API란 무엇인가요?", category: "major", difficulty: "medium", field: "it" },
        { text: "비동기 프로그래밍이란 무엇인가요?", category: "major", difficulty: "medium", field: "it" },
        { text: "버전 관리의 중요성에 대해 설명해주세요.", category: "major", difficulty: "medium", field: "it" },
        
        // 전공 - 고급
        { text: "데이터베이스 정규화에 대해 설명해주세요.", category: "major", difficulty: "hard", field: "it" },
        { text: "웹 성능 최적화 방법에는 어떤 것들이 있나요?", category: "major", difficulty: "hard", field: "it" },
        { text: "마이크로서비스 아키텍처란 무엇인가요?", category: "major", difficulty: "hard", field: "it" },
        { text: "캐싱 전략에 대해 설명해주세요.", category: "major", difficulty: "hard", field: "it" },
        
        // 상황
        { text: "프로젝트 마감 기한이 촉박한데 예상치 못한 버그가 발생했습니다. 어떻게 대응하시겠습니까?", category: "situational", difficulty: "hard", field: "it" },
        { text: "기술 부채가 쌓인 레거시 코드를 맡게 되었다면?", category: "situational", difficulty: "hard", field: "it" },
        { text: "팀원과 기술적 의견이 충돌했을 때 어떻게 해결하시겠습니까?", category: "situational", difficulty: "medium", field: "it" }
    ],
    
    // 경영/경제
    business: [
        { text: "경영/경제 분야에 관심을 갖게 된 계기는?", category: "personality", difficulty: "easy", field: "business" },
        { text: "리더십을 발휘했던 경험이 있나요?", category: "personality", difficulty: "medium", field: "business" },
        { text: "경영자로서 가장 중요한 덕목은 무엇이라고 생각하나요?", category: "personality", difficulty: "medium", field: "business" },
        { text: "최근 관심있게 본 경제 뉴스가 있나요?", category: "major", difficulty: "easy", field: "business" },
        { text: "마케팅의 4P에 대해 설명해주세요.", category: "major", difficulty: "medium", field: "business" },
        { text: "재무제표의 종류와 각각의 역할을 설명해주세요.", category: "major", difficulty: "hard", field: "business" },
        { text: "SWOT 분석이란 무엇인가요?", category: "major", difficulty: "medium", field: "business" },
        { text: "손익분기점에 대해 설명해주세요.", category: "major", difficulty: "medium", field: "business" },
        { text: "기업의 사회적 책임(CSR)에 대해 어떻게 생각하나요?", category: "major", difficulty: "hard", field: "business" },
        { text: "예산이 부족한 상황에서 프로젝트를 진행해야 한다면?", category: "situational", difficulty: "medium", field: "business" },
        { text: "경쟁사와의 차별화 전략을 어떻게 세우시겠습니까?", category: "situational", difficulty: "hard", field: "business" },
        { text: "불확실한 시장에서의 의사결정 방법은?", category: "situational", difficulty: "hard", field: "business" }
    ],
    
    // 법학/행정
    law: [
        { text: "법학/행정 분야를 선택한 이유는?", category: "personality", difficulty: "easy", field: "law" },
        { text: "공익과 사익이 충돌할 때 어떻게 판단하시겠습니까?", category: "personality", difficulty: "hard", field: "law" },
        { text: "법조인으로서 가장 중요한 자질은 무엇이라고 생각하나요?", category: "personality", difficulty: "medium", field: "law" },
        { text: "법치주의와 법의 지배의 차이점은?", category: "major", difficulty: "medium", field: "law" },
        { text: "행정절차의 원칙에 대해 설명해주세요.", category: "major", difficulty: "hard", field: "law" },
        { text: "헌법의 기본권에 대해 설명해주세요.", category: "major", difficulty: "medium", field: "law" },
        { text: "삼권분립의 의미와 중요성은?", category: "major", difficulty: "easy", field: "law" },
        { text: "민법과 형법의 차이점은 무엇인가요?", category: "major", difficulty: "easy", field: "law" },
        { text: "법적 분쟁이 발생했을 때 해결 방법은?", category: "situational", difficulty: "medium", field: "law" },
        { text: "법과 정의가 충돌하는 상황에서의 판단 기준은?", category: "situational", difficulty: "hard", field: "law" },
        { text: "공무원으로서 업무상 부당한 압력을 받았을 때?", category: "situational", difficulty: "hard", field: "law" }
    ],
    
    // 의학/보건
    medical: [
        { text: "의료인으로서 가장 중요하다고 생각하는 가치는?", category: "personality", difficulty: "easy", field: "medical" },
        { text: "환자와의 소통에서 중요한 점은 무엇인가요?", category: "personality", difficulty: "medium", field: "medical" },
        { text: "의료 분야에 종사하고 싶은 이유는?", category: "personality", difficulty: "easy", field: "medical" },
        { text: "의료윤리의 4대 원칙에 대해 설명해주세요.", category: "major", difficulty: "hard", field: "medical" },
        { text: "감염 관리의 중요성에 대해 말씀해주세요.", category: "major", difficulty: "medium", field: "medical" },
        { text: "환자안전이란 무엇인가요?", category: "major", difficulty: "medium", field: "medical" },
        { text: "의료정보 보호의 중요성은?", category: "major", difficulty: "medium", field: "medical" },
        { text: "응급 상황에서 우선순위를 어떻게 정하시겠습니까?", category: "situational", difficulty: "hard", field: "medical" },
        { text: "환자의 요구와 의학적 판단이 다를 때?", category: "situational", difficulty: "hard", field: "medical" },
        { text: "의료사고가 발생했을 때의 대처 방법은?", category: "situational", difficulty: "hard", field: "medical" },
        { text: "어려운 진단을 환자에게 어떻게 전달하시겠습니까?", category: "situational", difficulty: "medium", field: "medical" }
    ],

    // 자연과학
    science: [
        { text: "과학 분야에 관심을 갖게 된 계기는?", category: "personality", difficulty: "easy", field: "science" },
        { text: "가장 존경하는 과학자는 누구인가요?", category: "personality", difficulty: "easy", field: "science" },
        { text: "과학연구에서 가장 중요한 자세는?", category: "personality", difficulty: "medium", field: "science" },
        { text: "최근 관심있는 과학 분야의 이슈는?", category: "major", difficulty: "easy", field: "science" },
        { text: "실험 설계의 중요한 요소들은?", category: "major", difficulty: "medium", field: "science" },
        { text: "과학적 방법론에 대해 설명해주세요.", category: "major", difficulty: "medium", field: "science" },
        { text: "연구윤리의 중요성에 대해 말씀해주세요.", category: "major", difficulty: "hard", field: "science" },
        { text: "데이터 분석 경험이 있나요?", category: "major", difficulty: "medium", field: "science" },
        { text: "실험 결과가 예상과 다를 때 어떻게 하시겠습니까?", category: "situational", difficulty: "medium", field: "science" },
        { text: "연구 중 윤리적 딜레마에 직면했다면?", category: "situational", difficulty: "hard", field: "science" },
        { text: "연구비 부족으로 실험을 계속할 수 없다면?", category: "situational", difficulty: "hard", field: "science" }
    ],

    // 공학
    engineering: [
        { text: "공학 분야를 선택한 이유는?", category: "personality", difficulty: "easy", field: "engineering" },
        { text: "엔지니어로서 가장 중요한 자질은?", category: "personality", difficulty: "medium", field: "engineering" },
        { text: "팀 프로젝트 경험이 있나요?", category: "personality", difficulty: "easy", field: "engineering" },
        { text: "공학 설계 프로세스에 대해 설명해주세요.", category: "major", difficulty: "medium", field: "engineering" },
        { text: "CAD 프로그램을 다룰 수 있나요?", category: "major", difficulty: "easy", field: "engineering" },
        { text: "품질 관리의 중요성은?", category: "major", difficulty: "medium", field: "engineering" },
        { text: "안전 설계 원칙에 대해 설명해주세요.", category: "major", difficulty: "hard", field: "engineering" },
        { text: "지속가능한 공학이란 무엇인가요?", category: "major", difficulty: "hard", field: "engineering" },
        { text: "설계 도중 예산 초과가 예상된다면?", category: "situational", difficulty: "medium", field: "engineering" },
        { text: "안전과 비용이 충돌할 때의 판단 기준은?", category: "situational", difficulty: "hard", field: "engineering" },
        { text: "프로젝트 납기가 임박했는데 결함이 발견되었다면?", category: "situational", difficulty: "hard", field: "engineering" }
    ],

    // 인문학
    humanities: [
        { text: "인문학을 전공하게 된 이유는?", category: "personality", difficulty: "easy", field: "humanities" },
        { text: "가장 감명깊게 읽은 책은?", category: "personality", difficulty: "easy", field: "humanities" },
        { text: "인문학적 사고가 필요한 이유는?", category: "personality", difficulty: "medium", field: "humanities" },
        { text: "비판적 사고란 무엇인가요?", category: "major", difficulty: "medium", field: "humanities" },
        { text: "문화의 다양성을 존중하는 이유는?", category: "major", difficulty: "medium", field: "humanities" },
        { text: "역사를 배우는 의미는 무엇인가요?", category: "major", difficulty: "easy", field: "humanities" },
        { text: "철학적 사고의 중요성은?", category: "major", difficulty: "hard", field: "humanities" },
        { text: "글쓰기와 논리적 표현력의 관계는?", category: "major", difficulty: "medium", field: "humanities" },
        { text: "상반된 가치관이 충돌할 때 어떻게 조율하나요?", category: "situational", difficulty: "hard", field: "humanities" },
        { text: "연구 주제 선정에 어려움이 있을 때?", category: "situational", difficulty: "medium", field: "humanities" },
        { text: "문화적 차이로 인한 오해가 생겼을 때?", category: "situational", difficulty: "medium", field: "humanities" }
    ],

    // 예체능
    arts: [
        { text: "예술/체육 분야를 선택한 이유는?", category: "personality", difficulty: "easy", field: "arts" },
        { text: "가장 존경하는 예술가나 선수는?", category: "personality", difficulty: "easy", field: "arts" },
        { text: "창의성을 발휘했던 경험은?", category: "personality", difficulty: "medium", field: "arts" },
        { text: "예술적 표현에서 가장 중요한 것은?", category: "major", difficulty: "medium", field: "arts" },
        { text: "본인의 작품 스타일을 설명해주세요.", category: "major", difficulty: "easy", field: "arts" },
        { text: "비평을 받아들이는 자세는?", category: "major", difficulty: "medium", field: "arts" },
        { text: "예술과 상업성의 균형을 어떻게 맞추나요?", category: "major", difficulty: "hard", field: "arts" },
        { text: "슬럼프를 극복하는 방법은?", category: "situational", difficulty: "medium", field: "arts" },
        { text: "창작 과정에서 영감이 떠오르지 않을 때?", category: "situational", difficulty: "medium", field: "arts" },
        { text: "작품에 대한 부정적 평가를 받았을 때?", category: "situational", difficulty: "hard", field: "arts" },
        { text: "협업 작업에서 의견 충돌이 있을 때?", category: "situational", difficulty: "medium", field: "arts" }
    ],

    // 언론/미디어
    media: [
        { text: "언론/미디어 분야에 관심을 갖게 된 이유는?", category: "personality", difficulty: "easy", field: "media" },
        { text: "언론인으로서 가장 중요한 가치는?", category: "personality", difficulty: "medium", field: "media" },
        { text: "객관적 보도란 무엇이라고 생각하나요?", category: "major", difficulty: "medium", field: "media" },
        { text: "취재 윤리의 중요성은?", category: "major", difficulty: "hard", field: "media" },
        { text: "디지털 미디어 시대의 특징은?", category: "major", difficulty: "medium", field: "media" },
        { text: "팩트체크의 중요성에 대해 설명해주세요.", category: "major", difficulty: "medium", field: "media" },
        { text: "미디어 리터러시란 무엇인가요?", category: "major", difficulty: "easy", field: "media" },
        { text: "가짜뉴스 문제를 어떻게 해결할 수 있을까요?", category: "major", difficulty: "hard", field: "media" },
        { text: "압력을 받으며 취재해야 하는 상황이라면?", category: "situational", difficulty: "hard", field: "media" },
        { text: "공익과 개인정보 보호가 충돌할 때?", category: "situational", difficulty: "hard", field: "media" },
        { text: "속보 경쟁과 정확성 사이에서의 판단은?", category: "situational", difficulty: "medium", field: "media" }
    ],

    // 사회과학
    social: [
        { text: "사회과학 분야를 선택한 이유는?", category: "personality", difficulty: "easy", field: "social" },
        { text: "사회 문제에 관심을 갖게 된 계기는?", category: "personality", difficulty: "easy", field: "social" },
        { text: "사회학적 상상력이란 무엇인가요?", category: "major", difficulty: "medium", field: "social" },
        { text: "질적 연구와 양적 연구의 차이는?", category: "major", difficulty: "medium", field: "social" },
        { text: "사회조사 방법론에 대해 설명해주세요.", category: "major", difficulty: "hard", field: "social" },
        { text: "사회 불평등 문제를 어떻게 바라보나요?", category: "major", difficulty: "hard", field: "social" },
        { text: "정책 분석 경험이 있나요?", category: "major", difficulty: "medium", field: "social" },
        { text: "사회복지의 역할은 무엇인가요?", category: "major", difficulty: "medium", field: "social" },
        { text: "연구 대상자의 윤리적 보호 방법은?", category: "situational", difficulty: "hard", field: "social" },
        { text: "상충하는 정책 목표를 조정해야 한다면?", category: "situational", difficulty: "hard", field: "social" },
        { text: "현장 조사 중 예상치 못한 상황이 발생했을 때?", category: "situational", difficulty: "medium", field: "social" }
    ],
    
    // 공통 질문
    all: [
        { text: "자기소개를 해주세요.", category: "personality", difficulty: "easy", field: "all" },
        { text: "우리 회사에 지원한 이유는 무엇인가요?", category: "personality", difficulty: "easy", field: "all" },
        { text: "본인의 장점과 단점은 무엇인가요?", category: "personality", difficulty: "easy", field: "all" },
        { text: "5년 후 자신의 모습은 어떨 것 같나요?", category: "personality", difficulty: "medium", field: "all" },
        { text: "팀 프로젝트에서 갈등이 생겼을 때 어떻게 해결하나요?", category: "personality", difficulty: "hard", field: "all" },
        { text: "실패했던 경험과 그로부터 배운 점은?", category: "personality", difficulty: "hard", field: "all" },
        { text: "여러 업무가 동시에 주어졌을 때 우선순위를 어떻게 정하나요?", category: "situational", difficulty: "easy", field: "all" },
        { text: "상사의 지시가 비효율적이라고 생각될 때 어떻게 하시겠습니까?", category: "situational", difficulty: "medium", field: "all" },
        { text: "프로젝트 도중 요구사항이 크게 변경되었습니다. 어떻게 하시겠습니까?", category: "situational", difficulty: "hard", field: "all" },
        { text: "스트레스 관리 방법은 무엇인가요?", category: "personality", difficulty: "easy", field: "all" }
    ]
};

let currentQuestionIndex = 0;
let questionCount = 0;
let selectedField = 'all';
let selectedCategory = 'all';
let selectedDifficulty = 'easy';
let filteredQuestions = [];
let answerHistory = JSON.parse(localStorage.getItem('answerHistory') || '[]');
let practiceStats = JSON.parse(localStorage.getItem('practiceStats') || '{"totalQuestions": 0, "totalAnswers": 0, "categoryStats": {}}');

let timerInterval = null;
let timerSeconds = 0;
let isTimerRunning = false;

let mediaRecorder = null;
let audioChunks = [];
let currentAudioUrl = null;
let recognition = null;  // 음성인식 객체
let finalTranscript = '';  // 음성인식 최종 텍스트

const categoryNames = {
    'personality': '인성',
    'major': '전공',
    'situational': '상황'
};

const categoryIcons = {
    'personality': '👤',
    'major': '💻',
    'situational': '🎯'
};

const difficultyNames = {
    'easy': '초급',
    'medium': '중급',
    'hard': '고급'
};

// ============================================================
// 초기화
// ============================================================

function init() {
    checkAuth();
    updateHistoryDisplay();
    updateStatsDisplay();
    shuffleQuestions();
    setupEventListeners();
    checkRecordingSupport();
    loadTheme();
    initSpeechRecognition();  // 음성인식 초기화
}

function setupEventListeners() {
    // 인증 - 로그인
    document.getElementById('loginBtn').addEventListener('click', openLoginModal);
    document.getElementById('closeLogin').addEventListener('click', closeLoginModal);
    document.querySelector('#loginModal .modal-overlay').addEventListener('click', closeLoginModal);
    
    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        login(email, password);
    });

    // 인증 - 회원가입
    document.getElementById('signupHeaderBtn').addEventListener('click', openSignupModal);
    document.getElementById('closeSignup').addEventListener('click', closeSignupModal);
    document.querySelector('#signupModal .modal-overlay').addEventListener('click', closeSignupModal);
    
    document.getElementById('signupForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const passwordConfirm = document.getElementById('signupPasswordConfirm').value;
        
        if (password !== passwordConfirm) {
            showToast('비밀번호가 일치하지 않습니다');
            return;
        }
        
        signup(name, email, password);
    });

    // 모달 간 전환
    document.getElementById('showSignupFromLogin').addEventListener('click', (e) => {
        e.preventDefault();
        closeLoginModal();
        openSignupModal();
    });

    document.getElementById('showLoginFromSignup').addEventListener('click', (e) => {
        e.preventDefault();
        closeSignupModal();
        openLoginModal();
    });

    document.getElementById('logoutBtn').addEventListener('click', logout);

    // 탭 전환
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });

    // 테마 토글
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);

    // 분야 선택
    document.getElementById('fieldSelect').addEventListener('change', (e) => {
        filterByField(e.target.value);
    });

    // 난이도 필터
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => filterByDifficulty(btn.dataset.difficulty));
    });

    // 카테고리 필터
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', () => filterByCategory(btn.dataset.category));
    });

    // 질문 관련
    document.getElementById('nextBtn').addEventListener('click', showNextQuestion);
    document.getElementById('feedbackBtn').addEventListener('click', generateAiFeedback);

    // 답변 관련
    document.getElementById('answerText').addEventListener('input', updateCharCount);
    document.getElementById('saveBtn').addEventListener('click', saveAnswer);

    // 타이머
    document.getElementById('startTimer').addEventListener('click', startTimer);
    document.getElementById('pauseTimer').addEventListener('click', pauseTimer);
    document.getElementById('resetTimer').addEventListener('click', resetTimer);

    // 녹음
    document.getElementById('startRecord').addEventListener('click', startRecording);
    document.getElementById('stopRecord').addEventListener('click', stopRecording);

    // 히스토리
    document.getElementById('clearBtn').addEventListener('click', clearHistory);

    // PDF 내보내기
    document.getElementById('exportBtn').addEventListener('click', exportToPdf);
}

// ============================================================
// 음성인식 초기화 (Web Speech API)
// ============================================================

function initSpeechRecognition() {
    // 브라우저 지원 확인
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
        console.log('이 브라우저는 음성인식을 지원하지 않습니다.');
        return;
    }
    
    recognition = new SpeechRecognition();
    recognition.lang = 'ko-KR';
    recognition.continuous = true;
    recognition.interimResults = true;
    
    recognition.onresult = (event) => {
        let interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            
            if (event.results[i].isFinal) {
                finalTranscript += transcript + ' ';
            } else {
                interimTranscript += transcript;
            }
        }
        
        // 답변 텍스트 영역에 음성인식 결과 추가
        const answerText = document.getElementById('answerText');
        answerText.value = finalTranscript;
        updateCharCount();
    };
    
    recognition.onerror = (event) => {
        console.error('음성인식 오류:', event.error);
        if (event.error === 'no-speech') {
            showToast('음성이 감지되지 않았습니다');
        }
    };
    
    recognition.onend = () => {
        // 녹음 중이면 자동으로 다시 시작
        if (mediaRecorder && mediaRecorder.state === 'recording') {
            try {
                recognition.start();
            } catch (e) {
                console.log('음성인식 재시작 실패');
            }
        }
    };
}

// ============================================================
// 탭 전환
// ============================================================

function switchTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.tab === tabName) {
            btn.classList.add('active');
        }
    });

    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });

    document.getElementById(tabName + 'Tab').classList.add('active');

    if (tabName === 'stats') {
        updateStatsDisplay();
    }
}

// ============================================================
// 테마 전환
// ============================================================

function toggleTheme() {
    const body = document.body;
    const btn = document.getElementById('themeToggle');
    
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        btn.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        btn.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    }
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        document.getElementById('themeToggle').textContent = '☀️';
    }
}

// ============================================================
// 질문 필터링
// ============================================================

function getAllQuestions() {
    let allQuestions = [];
    for (let field in interviewQuestions) {
        allQuestions = allQuestions.concat(interviewQuestions[field]);
    }
    return allQuestions;
}

function shuffleQuestions() {
    // 분야별 질문 가져오기
    let questions = selectedField === 'all' ? getAllQuestions() : interviewQuestions[selectedField] || [];
    
    // 카테고리와 난이도로 필터링
    filteredQuestions = questions.filter(q => {
        const categoryMatch = selectedCategory === 'all' || q.category === selectedCategory;
        const difficultyMatch = q.difficulty === selectedDifficulty;
        return categoryMatch && difficultyMatch;
    });
    
    // 셔플
    for (let i = filteredQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [filteredQuestions[i], filteredQuestions[j]] = [filteredQuestions[j], filteredQuestions[i]];
    }
    
    currentQuestionIndex = 0;
}

function filterByField(field) {
    selectedField = field;
    shuffleQuestions();
    showToast(`${field === 'all' ? '전체' : document.querySelector(`option[value="${field}"]`).textContent} 분야로 변경되었습니다`);
}

function filterByCategory(category) {
    selectedCategory = category;
    
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        }
    });

    shuffleQuestions();
    showToast(`${category === 'all' ? '전체' : categoryNames[category]} 질문으로 변경되었습니다`);
}

function filterByDifficulty(difficulty) {
    selectedDifficulty = difficulty;
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.difficulty === difficulty) {
            btn.classList.add('active');
        }
    });

    shuffleQuestions();
    showToast(`${difficultyNames[difficulty]} 난이도로 변경되었습니다`);
}

function showNextQuestion() {
    if (currentQuestionIndex >= filteredQuestions.length) {
        currentQuestionIndex = 0;
        shuffleQuestions();
    }

    const question = filteredQuestions[currentQuestionIndex];
    questionCount++;
    practiceStats.totalQuestions++;
    
    document.getElementById('questionNum').textContent = `질문 #${questionCount}`;
    document.getElementById('questionText').textContent = question.text;
    document.getElementById('categoryTag').textContent = `${categoryIcons[question.category]} ${categoryNames[question.category]}`;
    
    const badge = document.getElementById('badge');
    badge.textContent = difficultyNames[question.difficulty];
    badge.className = `badge ${question.difficulty}`;

    currentQuestionIndex++;
    document.getElementById('answerText').value = '';
    updateCharCount();
    document.getElementById('feedbackSection').style.display = 'none';

    localStorage.setItem('practiceStats', JSON.stringify(practiceStats));
}

// ============================================================
// AI 피드백 (시뮬레이션)
// ============================================================

function generateAiFeedback() {
    const answer = document.getElementById('answerText').value.trim();
    const question = document.getElementById('questionText').textContent;
    
    if (!answer) {
        showToast('답변을 먼저 작성해주세요');
        return;
    }

    const section = document.getElementById('feedbackSection');
    const content = document.getElementById('feedbackContent');
    const feedbackBtn = document.getElementById('feedbackBtn');
    
    section.style.display = 'block';
    content.innerHTML = '<div class="feedback-loading">답변을 분석하고 있습니다...</div>';
    feedbackBtn.disabled = true;
    feedbackBtn.textContent = '분석 중...';

    // 시뮬레이션: 1초 후 결과 표시
    setTimeout(() => {
        const feedback = analyzeAnswer(answer, question);
        displayAiFeedback(feedback);
        feedbackBtn.disabled = false;
        feedbackBtn.textContent = '피드백';
        showToast('피드백이 생성되었습니다');
    }, 1000);
}

function analyzeAnswer(answer, question) {
    const wordCount = answer.split(/\s+/).length;

    const strengthsPool = [
        "• 핵심 내용을 잘 전달했습니다.",
        "• 표현이 명확하고 이해하기 쉬웠습니다.",
        "• 사례를 통해 설득력을 높였습니다.",
        "• 답변이 구조적으로 안정적입니다.",
        "• 의사 표현 능력이 돋보였습니다."
    ];

    const improvementsPool = [
        "• 조금 더 구체적인 사례가 있으면 좋습니다.",
        "• 분량을 늘려 풍부하게 설명해주세요.",
        "• 결론을 명확히 제시해보세요.",
        "• 핵심 포인트를 더 강조하면 좋겠습니다.",
        "• 문장을 다듬으면 더 설득력 있을 수 있습니다."
    ];

    const tailQuestionsPool = [
        "그 경험에서 가장 어려웠던 점은 무엇인가요?",
        "비슷한 상황이 다시 온다면 어떻게 대응하시겠습니까?",
        "구체적인 수치나 결과가 있을까요?",
        "다른 선택지를 고려해본 적이 있나요?",
        "이 경험을 통해 배운 점은 무엇인가요?"
    ];

    const pick = (arr, n=1) =>
        [...arr].sort(() => Math.random() - 0.5).slice(0, n);

    let score = 60 + Math.floor(Math.random() * 35);

    const feedback = `
        <strong>1) 종합 평가</strong><br>
        답변이 전반적으로 ***${score >= 80 ? '우수' : score >= 70 ? '양호' : '보통'}*** 합니다.<br><br>

        <strong>2) 강점</strong><br>
        ${pick(strengthsPool, 2).join("<br>")}<br><br>

        <strong>3) 개선 제안</strong><br>
        ${pick(improvementsPool, 2).join("<br>")}<br><br>

        <strong>4) 점수</strong><br>
        <span style="font-size: 24px; color: var(--primary); font-weight: bold;">
        ${score}점
        </span> / 100점
        <br><br>

        <strong>5) 꼬리 질문</strong><br>
        ${pick(tailQuestionsPool, 2).map(q => "• " + q).join("<br>")}
    `;

    return feedback;
}

function displayAiFeedback(feedback) {
    const content = document.getElementById('feedbackContent');
    content.innerHTML = `<p>${feedback}</p>`;

    setTimeout(() => {
        document.getElementById('feedbackSection').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest' 
        });
    }, 100);
}

// ============================================================
// 답변 저장
// ============================================================

function updateCharCount() {
    const length = document.getElementById('answerText').value.length;
    document.getElementById('charCount').textContent = `${length}자`;
}

function saveAnswer() {
    const answer = document.getElementById('answerText').value.trim();
    const question = document.getElementById('questionText').textContent;
    const category = selectedCategory === 'all' ? 
        filteredQuestions[currentQuestionIndex - 1].category : selectedCategory;
    
    if (!answer) {
        showToast('답변을 작성해주세요');
        return;
    }

    const historyItem = {
        question: question,
        answer: answer,
        timestamp: new Date().toLocaleString('ko-KR'),
        category: categoryNames[category],
        difficulty: selectedDifficulty,
        charCount: answer.length,
        timeSpent: timerSeconds,
        audioUrl: currentAudioUrl ? currentAudioUrl : null
    };

    answerHistory.unshift(historyItem);

    if (answerHistory.length > 50) {
        answerHistory = answerHistory.slice(0, 50);
    }

    practiceStats.totalAnswers++;
    if (!practiceStats.categoryStats[category]) {
        practiceStats.categoryStats[category] = 0;
    }
    practiceStats.categoryStats[category]++;

    localStorage.setItem('answerHistory', JSON.stringify(answerHistory));
    localStorage.setItem('practiceStats', JSON.stringify(practiceStats));
    
    updateHistoryDisplay();
    showToast('답변이 저장되었습니다');
    resetTimer();
}

function updateHistoryDisplay() {
    const historyList = document.getElementById('historyList');
    const clearBtn = document.getElementById('clearBtn');

    if (answerHistory.length === 0) {
        historyList.innerHTML = '<div class="empty">저장된 답변이 없습니다</div>';
        clearBtn.style.display = 'none';
        return;
    }

    clearBtn.style.display = 'block';
    historyList.innerHTML = answerHistory.slice(0, 10).map((item, index) => `
    <div class="history-item">
        <div class="history-question">${index + 1}. ${item.question}</div>

        <div class="history-answer">
            ${item.answer.substring(0, 100)}${item.answer.length > 100 ? '...' : ''}
            ${item.audioUrl ? `<br><audio controls src="${item.audioUrl}"></audio>` : ''}
        </div>

        <div class="history-meta">
            <span>${item.category}</span>
            <span>•</span>
            <span>${difficultyNames[item.difficulty]}</span>
            <span>•</span>
            <span>${item.charCount}자</span>
            <span>•</span>
            <span>${formatTime(item.timeSpent || 0)}</span>
        </div>
    </div>
`).join('');
}

function clearHistory() {
    if (confirm('정말로 모든 답변 히스토리를 삭제하시겠습니까?')) {
        answerHistory = [];
        localStorage.removeItem('answerHistory');
        updateHistoryDisplay();
        showToast('히스토리가 삭제되었습니다');
    }
}

// ============================================================
// 타이머
// ============================================================

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function startTimer() {
    if (!isTimerRunning) {
        isTimerRunning = true;
        timerInterval = setInterval(() => {
            timerSeconds++;
            document.getElementById('timer').textContent = formatTime(timerSeconds);
        }, 1000);
    }
}

function pauseTimer() {
    if (isTimerRunning) {
        isTimerRunning = false;
        clearInterval(timerInterval);
    }
}

function resetTimer() {
    isTimerRunning = false;
    clearInterval(timerInterval);
    timerSeconds = 0;
    document.getElementById('timer').textContent = '00:00';
}

// ============================================================
// 음성 녹음
// ============================================================

function checkRecordingSupport() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        document.getElementById('startRecord').disabled = true;
        document.getElementById('recordStatus').textContent = '지원 안됨';
    }
}

async function startRecording() {
    try {
        // 음성인식 텍스트 초기화
        finalTranscript = '';
        document.getElementById('answerText').value = '';
        updateCharCount();
        
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);
        audioChunks = [];

        mediaRecorder.addEventListener('dataavailable', event => {
            audioChunks.push(event.data);
        });

        mediaRecorder.addEventListener('stop', () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            const audioUrl = URL.createObjectURL(audioBlob);
            
            if (currentAudioUrl) {
                URL.revokeObjectURL(currentAudioUrl);
            }
            currentAudioUrl = audioUrl;
            
            stream.getTracks().forEach(track => track.stop());
        });

        mediaRecorder.start();
        document.getElementById('recordStatus').textContent = '녹음 중...';
        document.getElementById('startRecord').disabled = true;
        document.getElementById('stopRecord').disabled = false;
        
        // 음성인식 시작
        if (recognition) {
            try {
                recognition.start();
                showToast('음성 녹음 및 인식이 시작되었습니다');
            } catch (e) {
                console.log('음성인식 시작 실패:', e);
            }
        }
        
    } catch (error) {
        showToast('마이크 접근 권한이 필요합니다');
        console.error('Recording error:', error);
    }
}

function stopRecording() {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
        document.getElementById('recordStatus').textContent = '저장 중...';
        document.getElementById('startRecord').disabled = false;
        document.getElementById('stopRecord').disabled = true;
        
        // 음성인식 중지
        if (recognition) {
            recognition.stop();
        }
        
        // 녹음 종료 후 0.5초 대기 후 자동 저장
        setTimeout(() => {
            const answer = document.getElementById('answerText').value.trim();
            const question = document.getElementById('questionText').textContent;
            
            // 질문이 유효하고 (초기 상태가 아니고) 답변이나 음성이 있는 경우에만 저장
            if (question !== '다음 질문 버튼을 눌러 시작하세요' && (answer || currentAudioUrl)) {
                saveAnswer();
                document.getElementById('recordStatus').textContent = '저장 완료';
                showToast('음성 녹음이 최근 답변에 저장되었습니다');
            } else {
                document.getElementById('recordStatus').textContent = '준비';
                showToast('녹음 및 텍스트 변환이 완료되었습니다');
            }
        }, 500);
    }
}

// ============================================================
// 통계
// ============================================================

function updateStatsDisplay() {
    document.getElementById('totalQuestions').textContent = practiceStats.totalQuestions || 0;
    document.getElementById('totalAnswers').textContent = practiceStats.totalAnswers || 0;

    if (answerHistory.length > 0) {
        const avgTime = answerHistory.reduce((sum, item) => sum + (item.timeSpent || 0), 0) / answerHistory.length;
        document.getElementById('avgTime').textContent = formatTime(Math.round(avgTime));
        
        const avgLength = answerHistory.reduce((sum, item) => sum + item.charCount, 0) / answerHistory.length;
        document.getElementById('avgLength').textContent = Math.round(avgLength) + '자';
    }

    updateCategoryProgress();
}

function updateCategoryProgress() {
    const categories = ['personality', 'major', 'situational'];
    const allQuestions = getAllQuestions();
    const totalPerCategory = Math.floor(allQuestions.filter(q => q.difficulty === selectedDifficulty).length / 3);

    categories.forEach(cat => {
        const answered = practiceStats.categoryStats[cat] || 0;
        const percentage = totalPerCategory > 0 ? Math.min(100, Math.round((answered / totalPerCategory) * 100)) : 0;
        
        document.getElementById(cat + 'Pct').textContent = `${percentage}%`;
        document.getElementById(cat + 'Bar').style.width = `${percentage}%`;
    });
}

// ============================================================
// PDF 내보내기
// ============================================================

function exportToPdf() {
    let content = '=== InterviewMate 연습 리포트 ===\n\n';
    if (currentUser) {
        content += `사용자: ${currentUser.name}\n`;
    }
    content += `생성일: ${new Date().toLocaleDateString('ko-KR')}\n\n`;
    content += `총 연습 질문: ${practiceStats.totalQuestions}\n`;
    content += `작성한 답변: ${practiceStats.totalAnswers}\n\n`;
    content += '=== 최근 답변 ===\n\n';
    
    answerHistory.slice(0, 10).forEach((item, index) => {
        content += `${index + 1}. ${item.question}\n`;
        content += `   [${item.category} | ${difficultyNames[item.difficulty]} | ${item.charCount}자]\n`;
        content += `   답변: ${item.answer}\n`;
        content += `   작성일시: ${item.timestamp}\n\n`;
    });
    
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `InterviewMate_리포트_${new Date().toLocaleDateString('ko-KR')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    
    showToast('리포트가 다운로드되었습니다');
}

// ============================================================
// 토스트
// ============================================================

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// ============================================================
// 초기화
// ============================================================

init();
showNextQuestion();