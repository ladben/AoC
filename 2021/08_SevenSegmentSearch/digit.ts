export default class digit {
  a: boolean = false;
  b: boolean = false;
  c: boolean = false;
  d: boolean = false;
  e: boolean = false;
  f: boolean = false;
  g: boolean = false;
  value: number;

  constructor(value: number) {
    this.value = value;
    this.a = value !== 1 && value !== 4;
    this.b = value !== 1 && value !== 2 && value !== 3 && value !== 7;
    this.c = value !== 5 && value !== 6;
    this.d = value !== 0 && value !== 1 && value !== 7;
    this.e = value === 0 || value === 2 || value === 6 || value === 8;
    this.f = value !== 2;
    this.g = value !== 1 && value !== 4 && value !== 7;
  }
}
