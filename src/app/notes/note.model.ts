export class Note {
  public name: string;
  public description: string;
  public statusDone: boolean;
  public image?: string;

  constructor(name: string,
              description: string,
              statusDone: boolean,
              image?: string) {
    this.name = name;
    this.description = description;
    this.statusDone = statusDone;
    this.image = image;
  }
}
