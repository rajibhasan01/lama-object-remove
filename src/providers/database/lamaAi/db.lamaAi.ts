// External import
import { MongoClient, ObjectId } from "mongodb";


// Internal import
import { LamaAi } from "../../../model/model.lama";
import { ConfigService } from "../../../utilities/service.config";

const config = ConfigService.getInstance().getConfig();

export class DbLamaAi {
  private static dbLamaAi: DbLamaAi;
  private collectionName: string;

  constructor() {
    this.collectionName = "lamaAi";
  }
  /**
   * getInstance
   */
  public static getInstance() {
    if (!DbLamaAi.dbLamaAi) {
      DbLamaAi.dbLamaAi = new DbLamaAi();
    }
    return DbLamaAi.dbLamaAi;
  }
  /**
   * DB Connection
   */
  private async getDbConnection() {
    const dbConnection = await new MongoClient(config.mongo.url).connect();
    return dbConnection;
  }
}

