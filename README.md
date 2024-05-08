### 

### 소개
![chrome-capture-2024-5-9](https://github.com/Sovidi/movies/assets/133857264/1dfaf081-315f-4dd8-b7da-08172ab03b62)



> React.js 프레임워크 와 RestAPI 를 활용하여 영화 검색기를 제작하였습니다.
> 

### 개발기간

> 2023.06.28 ~ 2023.07.05
> 안정화 2024.05 ~
> 

### 개발환경

- Visual Studio Code <br><br>
![](https://img.shields.io/badge/javascript-F7DF1E.svg?&style=for-the-badge&logo=javascript&logoColor=ffffff)
![](https://img.shields.io/badge/css3-1572B6.svg?&style=for-the-badge&logo=css3&logoColor=ffffff)
![](https://img.shields.io/badge/html5-E34F26.svg?&style=for-the-badge&logo=html5&logoColor=ffffff)
![](https://img.shields.io/badge/jquery-0769AD.svg?&style=for-the-badge&logo=html5&logoColor=ffffff)

### API

- MovieDB

### 개발이슈

> 서버 명령어로 axios 를 도입하여 사용해본 최초의 프로젝트입니다. 서버와의 데이터 교환을 하는것은 아니나 추후 서버개발에 있어 쿼리를 보다 손쉽게 교환할 수 있을 것으로 예상됩니다.
>

> API 자체에서 movie 와 tv 의 자료요청이 강제되어 있어 스위칭을 자연스럽게 하기 위해 데이터를 보여주는 리스트는 두개의 컴포넌트로 나누었고 내부 객체는 Item 컴포넌트로 통일화 하였습니다.
> 

> 렌더링중 사이트 이동을 최소화 시키는 구조로 설계되어 있습니다. 단점으로는 그런만큼 params 값을 최소한으로 사용하기에 새로고침 시에 날아가게되는 설정값이 많습니다.
> 

> Context 를 통해 보여주는 영상 정보 데이터는 중앙구조화 되어 각 필요한 컴포넌트 단으로 뿌려주는 구조로 되어있습니다.
> 

> Detail 데이터는 원 데이터를 filter 시키기엔 API 상 제한이 많아 클릭시에 해당 아이템 자체를 useNavigate 의 State 시스템으로 구조분해된 상태로 오브젝트를 보내주도록 설계되었습니다.
>
