#  웹 프로그래밍 09/10 수업 요약

## 1. HTML5 기본 구조
- `<!DOCTYPE html>` : HTML5 문서 선언  
- `<html>, <head>, <title>, <body>` 태그 필수  
- `<meta charset="utf-8">` 로 인코딩 지정  

## 2. 텍스트와 문서 구조
- 제목 태그: `<h1> ~ <h6>`  
- 단락: `<p>`, 줄바꿈 `<br>`, 수평선 `<hr>`  
- 특수문자: `&lt;`, `&copy;`, `&sum;` 등  
- 텍스트 꾸미기: `<b>, <i>, <em>, <small>, <del>, <ins>, <sup>, <sub>, <mark>`  

## 3. 블록 & 인라인 태그
- 블록 태그: `<div>, <p>, <h1>, <ul>`  
- 인라인 태그: `<span>, <a>, <img>, <strong>`  

## 4. 메타데이터 태그
- `<base>, <link>, <meta>, <style>, <script>`  
- 문서 정보, 외부 CSS 연결, 키워드/설명 삽입 가능  

## 5. 멀티미디어 & 이미지
- `<img src="경로" alt="대체텍스트">`  
- `<video src="video.mp4" controls>`  
- `<audio src="music.mp3" controls>`  

## 6. 리스트
- 순서 있는 리스트: `<ol>`  
- 순서 없는 리스트: `<ul>`  
- 정의 리스트: `<dl><dt><dd>`  

## 7. 표
- `<table>, <thead>, <tbody>, <tfoot>, <tr>, <th>, <td>`  
- `<caption>` : 표 제목  

## 8. 하이퍼링크
- `<a href="url">텍스트</a>`  
- `target="_blank"`, `target="_self"` 등  
- 앵커 링크: `<a href="#id">` + `<h3 id="id">`  

## 9. 인라인 프레임
- `<iframe src="page.html" width height>`  
- srcdoc 속성으로 직접 HTML 작성 가능  
