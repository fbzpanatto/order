export interface Order {
  idClientProduct: string;
  idTeProduct: string;
  cover: number; // Numeric with decimal places
  qtdDaily: number; // Integer
  description: string; // Text only
  clientCommentary: string; // Text and numbers
  teCommentary: string; // Text and numbers
  qtdDelivery: number; // Integer
}
