export class AstriaAi {
    imgUrl: any;
    prompt: string;
    imgCount: number;
    imgSize: any;
    createdAt: Date;
    filePath?: any;
    maskImg? :any;

    private static astriaAi: AstriaAi;

    private constructor() {
      if (!this.createdAt) {
        this.createdAt = new Date();
      }
    }

    public static getInstance() {
      if (!AstriaAi.astriaAi) {
        AstriaAi.astriaAi = new AstriaAi();
      }

      return AstriaAi.astriaAi;
    }
  }
