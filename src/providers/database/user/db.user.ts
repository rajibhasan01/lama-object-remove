// External import
import { MongoClient, ObjectId } from "mongodb";

// Internal import
import { User } from "../../../model/model.user";
import { ConfigService } from "../../../utilities/service.config";

const config = ConfigService.getInstance().getConfig();

export class DbUser {
  private static dbUser: DbUser;
  private collectionName: string;

  constructor() {
    this.collectionName = "user";
  }
  /**
   * getInstance
   */
  public static getInstance() {
    if (!DbUser.dbUser) {
        DbUser.dbUser = new DbUser();
    }
    return DbUser.dbUser;
  }
  /**
   * DB Connection
   */
  private async getDbConnection() {
    const dbConnection = await new MongoClient(config.mongo.url).connect();
    return dbConnection;
  }
  /**
   * create User
   */
  public async createNewUser(post: any) {
    try {
      return await new Promise(async (resolve, reject) => {
        const dbConn = await this.getDbConnection();
        const db = dbConn.db(config.mongo.dbName);
        const dbCollection = db.collection(this.collectionName);
        post.createdAt = new Date();

        const result = await dbCollection.insertOne(post).catch(error => {
          reject(error);
        });
        await dbConn.close();
        if (result) {
          resolve(result);
        } else {
          reject(result);
        }
      }).catch((error) => {
        console.log("Error in CreatePost method of DbPost class: ", error);
        throw error;
      });
    } catch (error) {
      console.log(
        "Error in CreatePost method of DbPost class: ",
        error.message
      );
      throw error;
    }
  }

  public async getUserInfo(email: any) {
    try {
      return await new Promise(async (resolve, reject) => {
        const dbConn = await this.getDbConnection();
        const db = dbConn.db(config.mongo.dbName);
        const dbCollection = db.collection(this.collectionName);
        const result = await dbCollection.findOne({email}).catch(error => {
          reject(error);
        });
        await dbConn.close();
        if (result) {
          resolve(result);
        } else {
          resolve(result);
        }
      }).catch((error) => {
        console.log("Error in getPost method of DbPost class: ", error);
        throw error;
      });
    } catch (error) {
      console.log(
        "Error in getPost method of DbPost class: ",
        error
      );
      throw error;
    }
  }
}
