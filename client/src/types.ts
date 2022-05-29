export enum Category {
  Journal = 'journal',
  Article = 'article',
  Book = 'book',
  Thesis = 'thesis',
  Other = 'other',
}

export enum Status {
  Available = 'available',
  Borrowed = 'borrowed',
}

export type Book = {
  _id: string;
  isbn: string;
  title: string;
  description: string;
  authors: string[];
  publisher: string;
  publishedDate: Date;
  category: string;
  numPage: number;
  status: Status;
};

export type Author = {
  _id: string;
  firstName: string;
  lastName: string;
  biography: string;
  books: string[];
};

export type ApiDataType = {
  message: string;
  status: string;
  books: Book[];
  book?: Book;
};
