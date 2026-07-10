# VisioCon 웹 프로토타입

- 화면 6종(런처·마법사·재열기·분석진행·검수·완료)을 묶은 정적 사이트
- 빌드 단계 없음. 정적 HTTP 서버에서 그대로 실행(구성 B: 모듈 + 파셜 + 해시 라우터)

---

## 실행

- 정적 HTTP 서버 필요. ES 모듈·`fetch`(파셜 로딩)는 `file://`에서 차단되므로 브라우저로 파일 직접 열기 불가
- 로컬: `python3 -m http.server 8000` → `http://localhost:8000`
- GitHub Pages: 폴더 내용을 저장소 루트(또는 `docs/`)에 업로드 → Settings → Pages에서 소스 지정. `.nojekyll` 포함(Jekyll 전처리 우회)
- 화면별 해시 URL 존재: `#/launcher` `#/wizard` `#/reopen` `#/progress` `#/workspace` `#/complete` (URL 공유 시 해당 화면 진입)

---

## 저장소 구조

```
visiocon-web/
├─ index.html               셸. 데모바 + 무대(.frame, 960px 고정) + 파셜 마운트(#app)
├─ .nojekyll                Pages Jekyll 우회
├─ assets/
│  ├─ css/
│  │  ├─ tokens.css         디자인 토큰(:root 변수 + 다크모드). 색·반경·서체
│  │  ├─ fonts.css          Paperlogy @font-face(WOFF2)
│  │  └─ app.css            전역 + 화면별 스타일 전량
│  ├─ fonts/                Paperlogy 3Light / 5Medium / 7Bold (.woff2)
│  └─ img/
│     ├─ logo.png           표시용(최적화본, 마크업 참조 대상)
│     └─ logo-full.png      원본(소스 보관용, 미참조)
├─ js/
│  ├─ main.js               진입점. 해시 라우터 + 파셜 로더 + 액션 디스패처
│  ├─ icons.js              인라인 SVG 아이콘 레지스트리 + MutationObserver 자동 렌더
│  ├─ fit.js                무대 전체 확대/축소 스케일러
│  └─ screens/
│     ├─ wizard.js          신규 점검 마법사
│     ├─ reopen.js          기존 프로젝트 재열기
│     ├─ progress.js        분석 진행(startProgress/stopProgress)
│     ├─ workspace.js       검수/편집/핀 워크스페이스(탭·단축키)
│     └─ complete.js        검수 완료·산출물 다운로드
└─ partials/                화면 마크업 6종. 부팅 시 #app에 전량 주입
   ├─ launcher.html
   ├─ wizard.html
   ├─ reopen.html
   ├─ progress.html
   ├─ workspace.html
   └─ complete.html
```

- 화면 식별자 대응: `partials/<이름>.html` ↔ 섹션 `id="scr-<이름>"` ↔ `main.js`의 `SCREENS` 배열 항목
- `main.js`가 `SCREENS` 순회하며 `partials/<이름>.html`을 fetch → `#app` 주입 → 해시에 맞는 `.screen`에 `.on` 부여

---

## 편집

- 화면 내용 수정 → `partials/<이름>.html` 편집(마크업만 포함, 독립 수정)
- 색·서체·반경 → `assets/css/tokens.css` 변수 수정. 결함색 `--crack` `--spall` `--rebar`
- 아이콘 추가 → `js/icons.js`의 `ICONS`에 `'이름':'<path.../>'` 추가 → 마크업에서 `<i class="ti ti-이름"></i>`. 정적·동적 주입 모두 자동 렌더
- 새 액션 추가 → 화면 모듈에서 함수 정의 후 `window.함수명 = 함수명;`으로 노출 → 마크업에 `data-act` 부여
- 화면 추가 → `partials/<새이름>.html`에 `<section class="screen" id="scr-<새이름>">…</section>` 작성 → `main.js`의 `SCREENS` 배열과 `index.html` 데모바에 `<새이름>` 추가
- 데모바 제거(발표·제품 배포) → `index.html`의 `<div class="demobar">…</div>` 블록 삭제. 화면 전환은 해시 URL로 유지

### 동작 배선 (data-\* 규약)

- 인라인 `onclick` 미사용. 선언적 `data-*` 속성을 `main.js` 디스패처가 `addEventListener`로 연결

| 속성 | 동작 | 예 |
|---|---|---|
| `data-go="wizard"` | 해당 화면 이동(해시 라우팅) | 내비·카드 버튼 |
| `data-act="함수명"` | `window.함수명(...)` 호출 | `data-act="pickV"` |
| `data-arg` / `data-arg2` | 인자 전달(숫자 문자열 자동 변환) | `data-act="wNav" data-arg="1"` |
| `data-on="input\|change"` | click 대신 해당 이벤트에 바인딩 | 입력 필드 |
| `data-pass="value"` | 요소의 `value`를 인자로 전달 | `data-act="syncSite" data-on="input" data-pass="value"` |
| `data-el` | 요소 자신을 인자로 전달 | `data-act="sSwap" data-arg="0" data-el` |
| `data-toggle="on"` | 자신에게 해당 클래스 토글 | 칩 선택 |

---

## 뷰포트

- `.frame` 960px 고정. 화면 폭에 따른 레이아웃 재배치 없음
- `fit.js`가 무대 전체를 contain-fit으로 확대/축소. 형태·간격 비율 고정

---

## 자산·라이선스

- 서체: Paperlogy(재배포·임베드 가능, 서체 자체 라이선스 적용)
- 로고·코드·디자인: VisioCon 독점 자산, 무단 수정·재배포 금지. 조건은 [`LICENSE`](./LICENSE) 참조
