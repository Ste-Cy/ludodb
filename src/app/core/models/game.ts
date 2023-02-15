export class Game {
  constructor(
    public id: number,
    public title: string,
    public yearPub: number,
    public playerMin: number,
    public playerMax: number,
    public durationMinutesMin: number,
    public durationMinutesMax: number,
    public age: number,
    public description: string,
    public cover: string,
  ) { }
}
