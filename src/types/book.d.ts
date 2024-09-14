export interface Books {
  meta: Meta;
  documents: Document[];
}

interface Meta {
  total_count: number;
  pageable_count: number;
  is_end: boolean; // 마지막 페이지 여부
}

export interface Document {
  title: string; // 제목
  contents: string; // 소개 글
  url: string; // 상세 url
  isbn: string;
  datetime: string; // 출판일
  authors: string[]; // 저자 리스트
  publisher: string; // 출판사
  translators: string[]; // 번역자 리스트
  price: number; // 정가
  sale_price: number; // 판매가
  thumbnail: string; // 표지 미리보기 url
  status: string;
}
