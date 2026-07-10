# VisioCon — 하자진단 영상분석 소프트웨어 (웹 프로토타입)

드론으로 촬영한 건축물 외벽 영상을 분석해 결함(균열·박리·철근노출)을 검출하고 외관조사망도에 매핑하는 VisioCon의 인터랙티브 화면 프로토타입입니다. 런처 → 신규 점검 마법사 → 분석 진행 → 검수 워크스페이스 → 검수 완료의 6개 화면을 하나의 정적 사이트로 묶었습니다.

단일 HTML 프로토타입을 **편집 가능한 모듈 구조(구성 B)** 로 재구성한 것으로, 빌드 단계 없이 GitHub Pages에서 그대로 실행됩니다.

---

## 실행

이 저장소는 **정적 HTTP 서버**에서 동작합니다. ES 모듈과 `fetch`(파셜 로딩)는 `file://` 에서 차단되므로, 파일을 브라우저로 직접 열지 말고 아래처럼 서버로 여세요.

```bash
# 로컬 미리보기
python3 -m http.server 8000
# → http://localhost:8000
```

### GitHub Pages 배포

1. 이 폴더(`visiocon-web/`)의 내용을 저장소 루트(또는 `docs/`)에 올립니다.
2. Settings → Pages → Source를 해당 브랜치/폴더로 지정합니다.
3. 발행된 URL로 접속하면 됩니다. `.nojekyll` 파일이 포함되어 있어 Jekyll 전처리 없이 그대로 서빙됩니다.

각 화면은 해시 URL을 가집니다: `#/launcher`, `#/wizard`, `#/reopen`, `#/progress`, `#/workspace`, `#/complete`. URL을 공유하면 해당 화면으로 바로 진입합니다.

---

## 저장소 구조

```
visiocon-web/
├─ index.html               셸: 데모바 + 무대(960px 고정) + 파셜 마운트(#app)
├─ .nojekyll                GitHub Pages Jekyll 우회
├─ assets/
│  ├─ css/
│  │  ├─ tokens.css         디자인 토큰(:root) + 다크모드 (색·반경·서체 변수)
│  │  ├─ fonts.css          Paperlogy @font-face (WOFF2)
│  │  └─ app.css            전역 + 화면별 스타일 전량
│  ├─ fonts/                Paperlogy-3Light / 5Medium / 7Bold (.woff2)
│  └─ img/
│     ├─ logo.png           표시용 로고(최적화본)
│     └─ logo-full.png      로고 원본(소스 보관용)
├─ js/
│  ├─ main.js               진입점: 해시 라우터 + 파셜 로더 + 액션 디스패처
│  ├─ icons.js              인라인 SVG 아이콘 레지스트리(+ MutationObserver 자동 렌더)
│  ├─ fit.js                무대 전체 확대/축소 스케일러
│  └─ screens/
│     ├─ wizard.js          신규 점검 마법사
│     ├─ reopen.js          기존 프로젝트 재열기
│     ├─ progress.js        분석 진행 애니메이션
│     ├─ workspace.js       검수/편집/핀 워크스페이스(탭·단축키)
│     └─ complete.js        검수 완료·산출물 다운로드
└─ partials/                화면 6개 마크업(런타임 주입)
   ├─ launcher.html
   ├─ wizard.html
   ├─ reopen.html
   ├─ progress.html
   ├─ workspace.html
   └─ complete.html
```

---

## 편집 가이드

**화면 내용을 고치려면** → `partials/<화면>.html` 을 직접 편집합니다. 마크업만 담겨 있어 독립적으로 수정 가능합니다.

**색·서체·반경 등 디자인 토큰** → `assets/css/tokens.css` 의 CSS 변수만 바꾸면 전체에 반영됩니다. 결함 색은 `--crack` / `--spall` / `--rebar`.

**아이콘 추가** → `js/icons.js` 의 `ICONS` 객체에 `'이름':'<path.../>'` 한 줄만 추가한 뒤, 마크업에서 `<i class="ti ti-이름"></i>` 로 사용합니다. 정적·동적 주입 모두 자동 렌더됩니다.

**버튼·입력 동작 배선(구성 B)** → 인라인 `onclick` 대신 선언적 `data-*` 속성을 사용합니다. `main.js` 의 디스패처가 이를 `addEventListener` 로 연결합니다.

| 속성 | 의미 | 예 |
|---|---|---|
| `data-go="wizard"` | 해당 화면으로 이동(해시 라우팅) | 내비/카드 버튼 |
| `data-act="함수명"` | `window.함수명(...)` 호출 | `data-act="pickV"` |
| `data-arg` / `data-arg2` | 인자(숫자 문자열은 자동 숫자 변환) | `data-act="wNav" data-arg="1"` |
| `data-on="input\|change"` | 클릭 대신 해당 이벤트에 바인딩 | 입력 필드 |
| `data-pass="value"` | 요소의 `value`를 인자로 전달 | `data-act="syncSite" data-on="input" data-pass="value"` |
| `data-el` | 요소 자신을 인자로 전달 | `data-act="sSwap" data-arg="0" data-el` |
| `data-toggle="on"` | 자신에게 클래스 토글 | 칩 선택 |

새 액션을 만들려면 화면 모듈에서 함수를 정의하고 `window.함수명 = 함수명;` 으로 노출한 뒤, 마크업에 `data-act` 를 붙이면 됩니다.

**화면 추가** → `partials/새화면.html` 에 `<section class="screen" id="scr-새화면">…</section>` 를 만들고, `main.js` 의 `SCREENS` 배열과 `index.html` 데모바에 이름을 추가합니다.

**데모바 숨기기(발표/제품용)** → `index.html` 의 `<div class="demobar">…</div>` 블록만 삭제하면 됩니다. 화면 전환은 해시 URL로 그대로 동작합니다.

---

## 아키텍처 메모 (구성 B)

- **파셜 로더**: 부팅 시 6개 화면 파셜을 모두 fetch해 `#app` 에 주입하고, 해시 라우터가 `.screen.on` 을 토글합니다. 화면 간 이동에도 상태가 한 페이지에 유지됩니다.
- **해시 라우터**: `location.hash`(`#/화면`)를 화면과 동기화 — 화면마다 공유 가능한 URL이 생기고, 서버 없이 Pages·로컬 모두 동작합니다.
- **선언적 디스패처**: 모든 상호작용은 `data-*` → `addEventListener` 로 연결됩니다(인라인 핸들러 없음).
- **뷰포트**: 무대(`.frame`)를 **960px 고정**으로 두고, 화면 폭에 따라 레이아웃 재배치 없이 **전체를 확대/축소**(contain-fit)합니다. 형태·간격 비율은 항상 동일하게 유지됩니다.
- **아이콘**: 외부 CDN 없이 인라인 SVG 레지스트리로 렌더 — 오프라인·Pages에서 안정적이며 확장이 쉽습니다.

---

## 자산·라이선스

- **서체**: Paperlogy (재배포·임베드 가능, 서체 자체 라이선스에 따름).
- **로고·코드·디자인**: VisioCon 독점 자산. 무단 **수정·재배포 금지**. 자세한 조건은 [`LICENSE`](./LICENSE) 참조.
