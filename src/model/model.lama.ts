export class LamaAi {
    imgUrl: any;
    prompt: string;
    imgCount: number;
    imgSize: any;
    createdAt: Date;
    filePath?: any;
    maskImg? :any;

    private static lamaAi: LamaAi;

    private constructor() {
      if (!this.createdAt) {
        this.createdAt = new Date();
      }
    }

    public static getInstance() {
      if (!LamaAi.lamaAi) {
        LamaAi.lamaAi = new LamaAi();
      }

      return LamaAi.lamaAi;
    }
  }
