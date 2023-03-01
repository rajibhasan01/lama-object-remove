// External import
import { MongoClient, ObjectId } from "mongodb";


// Internal import
import { AstriaAi } from "../../../model/model.astria";
import { ConfigService } from "../../../utilities/service.config";
import { downloadFile } from "../../../utilities/downloadFile";

const config = ConfigService.getInstance().getConfig();

export class DbAstriaAi {
  private static dbAstriaAi: DbAstriaAi;
  private collectionName: string;
  private avatarCollection: string;
  private promptCollection: string;

  constructor() {
    this.collectionName = "astriaAi";
    this.avatarCollection = "astriaAvatar";
    this.promptCollection = "previewPrompt";
  }
  /**
   * getInstance
   */
  public static getInstance() {
    if (!DbAstriaAi.dbAstriaAi) {
      DbAstriaAi.dbAstriaAi = new DbAstriaAi();
    }
    return DbAstriaAi.dbAstriaAi;
  }
  /**
   * DB Connection
   */
  private async getDbConnection() {
    const dbConnection = await new MongoClient(config.mongo.url).connect();
    return dbConnection;
  }
  /**
   * saveFineTune
   */
  public async saveFineTune(post: any) {
    try {
      return await new Promise(async (resolve, reject) => {
        const dbConn = await this.getDbConnection();
        const db = dbConn.db(config.mongo.dbName);
        const dbCollection = db.collection(this.collectionName);
        post.createdAt = new Date();

        const result = await dbCollection.insertOne(post).catch((error) => {
          reject(error);
        });
        await dbConn.close();
        if (result) {
          resolve(result);
        } else {
          reject(result);
        }
      }).catch((error) => {
        console.log(
          "Error in saveFineTune method of DbAstriaAi class: ",
          error
        );
        throw error;
      });
    } catch (error) {
      console.log(
        "Error in saveFineTune method of DbAstriaAi class: ",
        error.message
      );
      throw error;
    }
  };

/**
 * saveFineTune
 */
public async saveAvatar(post: any) {
  try {
    return await new Promise(async (resolve, reject) => {
      const dbConn = await this.getDbConnection();
      const db = dbConn.db(config.mongo.dbName);
      const dbCollection = db.collection(this.avatarCollection);
      post.createdAt = new Date();

      const result = await dbCollection.insertOne(post).catch((error) => {
        reject(error);
      });
      await dbConn.close();
      if (result) {
        resolve(result);
      } else {
        reject(result);
      }
    }).catch((error) => {
      console.log(
        "Error in saveAvatar method of DbAstriaAi class: ",
        error
      );
      throw error;
    });
  } catch (error) {
    console.log(
      "Error in saveAvatar method of DbAstriaAi class: ",
      error.message
    );
    throw error;
  }
}

  /** Get Image info */
  public async getImageInfo(imgId: any) {
    try {
      return await new Promise(async (resolve, reject) => {
        const dbConn = await this.getDbConnection();
        const db = dbConn.db(config.mongo.dbName);
        const dbCollection = db.collection(this.collectionName);
        const result = await dbCollection
          .findOne({ _id: new ObjectId(imgId) })
          .catch((error) => {
            reject(error);
          });
        await dbConn.close();
        if (result) {
          resolve(result);
        } else {
          reject(result);
        }
      }).catch((error) => {
        console.log(
          "Error in getImageInfo method of DbAstriaAi class: ",
          error
        );
        throw error;
      });
    } catch (error) {
      console.log(
        "Error in getImageInfo method of DbAstriaAi class: ",
        error.message
      );
      throw error;
    }
  }

/**
 * Update astria database
 */
public async updateFineTune(post: any) {
  try {
    return await new Promise(async (resolve, reject) => {
      const dbConn = await this.getDbConnection();
      const db = dbConn.db(config.mongo.dbName);
      const dbCollection = db.collection(this.collectionName);
      post.updatedAt = new Date();
      const query = {
        id: post?.tune?.id,
      };

      const searchResult: any = await dbCollection
        .findOne(query)
        .catch((error: any) => {
          reject(error);
        });

      post.active = searchResult?.active ? 'yes' : 'no';
      const result = await dbCollection
        .updateOne(query, { $set: post })
        .catch((error) => {
          reject(error);
        });
      await dbConn.close();
      if (result) {
        resolve(result);
      } else {
        reject(result);
      }
    }).catch((error) => {
      console.log(
        "Error in updateFineTune method of DbAstriaAi class: ",
        error
      );
      throw error;
    });
  } catch (error) {
    console.log(
      "Error in updateFineTune of DbAstriaAi class: ",
      error.message
    );
    throw error;
  }
}

/**
 * Update Avatar database
 */
public async updateAvatarDB(post: any) {
  try {
    return await new Promise(async (resolve, reject) => {
      const dbConn = await this.getDbConnection();
      const db = dbConn.db(config.mongo.dbName);
      const dbCollection = db.collection(this.avatarCollection);
      post.updatedAt = new Date();
      const ID = post?.prompt?.id;
      const folderPath = post?.prompt?.tune_id + '/' + ID;
      const images = post?.prompt?.images;

      const query = {
        id: ID, tune_id: post?.prompt?.tune_id
      };
      const imgurl = [];
      for(const img of images){
        const downLoadResult = await downloadFile(img, folderPath).catch((error)=>{
          console.log(error);
        });
        imgurl.push(`${folderPath}/${downLoadResult}`)
      }
      const result = await dbCollection
        .updateOne(query, { $set: {images,
        localImg: imgurl} })
        .catch((error) => {
          reject(error);
        });
      await dbConn.close();
      if (result) {
        resolve(result);
      } else {
        reject(result);
      }
    }).catch((error) => {
      console.log(
        "Error in updateFineTune method of DbAstriaAi class: ",
        error
      );
      throw error;
    });
  } catch (error) {
    console.log(
      "Error in updateFineTune of DbAstriaAi class: ",
      error.message
    );
    throw error;
  }
}

/**
 * Get Active Tune by Email
 */
public async getTuneByEmail(email: any) {
  try {
    return await new Promise(async (resolve, reject) => {
      const dbConn = await this.getDbConnection();
      const db = dbConn.db(config.mongo.dbName);
      const dbCollection = db.collection(this.collectionName);
      const query = {
        userEmail: email, active: "yes"
      };

      const result:any = await dbCollection
        .find(query)
        .toArray()
        .catch((error) => {
          reject(error);
        });
      await dbConn.close();
      if (result) {
        resolve(result);
      } else {
        reject(result);
      }
    }).catch((error) => {
      console.log(
        "Error in getAllTuneByEmail method of DbAstriaAi class: ",
        error
      );
      throw error;
    });
  } catch (error) {
    console.log(
      "Error in getAllTuneByEmail of DbAstriaAi class: ",
      error.message
    );
    throw error;
  }
}

/**
 * save preview prompt
 */
public async savePreviewPrompt(post: any) {
  try {
    return await new Promise(async (resolve, reject) => {
      const dbConn = await this.getDbConnection();
      const db = dbConn.db(config.mongo.dbName);
      const dbCollection = db.collection(this.promptCollection);
      post.createdAt = new Date();

      const result = await dbCollection.insertOne(post).catch((error) => {
        reject(error);
      });
      await dbConn.close();
      if (result) {
        resolve(result);
      } else {
        reject(result);
      }
    }).catch((error) => {
      console.log(
        "Error in savePreviewPrompt method of DbAstriaAi class: ",
        error
      );
      throw error;
    });
  } catch (error) {
    console.log(
      "Error in savePreviewPrompt method of DbAstriaAi class: ",
      error.message
    );
    throw error;
  }
}

/**
 * Get All Preview Prompt
 */
public async getAllPreviewPrompt() {
  try {
    return await new Promise(async (resolve, reject) => {
      const dbConn = await this.getDbConnection();
      const db = dbConn.db(config.mongo.dbName);
      const dbCollection = db.collection(this.promptCollection);

      const result = await dbCollection.find({}).toArray().catch((error) => {
        reject(error);
      });
      await dbConn.close();
      if (result) {
        resolve(result);
      } else {
        reject(result);
      }
    }).catch((error) => {
      console.log(
        "Error in getAllPreviewPrompt method of DbAstriaAi class: ",
        error
      );
      throw error;
    });
  } catch (error) {
    console.log(
      "Error in getAllPreviewPrompt method of DbAstriaAi class: ",
      error.message
    );
    throw error;
  }
}


/**
 * Get All Preview Prompt
 */
public async getMyAvatarFromDB(ID:any) {
  try {
    return new Promise(async (resolve, reject) => {
      const dbConn = await this.getDbConnection();
      const db = dbConn.db(config.mongo.dbName);
      const dbCollection = db.collection(this.avatarCollection);

      const query = {
        id: Number(ID)
      };

      const result = await dbCollection.findOne(query)
      await dbConn.close();
      if (result) {
        resolve(result);
      } else {
        reject(result);
      }
    }).catch((error) => {
      console.log(
        "Error in getAllPreviewPrompt method of DbAstriaAi class: ",
        error
      );
      throw error;
    });
  } catch (error) {
    console.log(
      "Error in getAllPreviewPrompt method of DbAstriaAi class: ",
      error.message
    );
    throw error;
  }
}

/**
 * Get All Avatar by tune id
 */
public async getAllAvatarByTuneIdFromDB(ID:any) {
  try {
    return new Promise(async (resolve, reject) => {
      const dbConn = await this.getDbConnection();
      const db = dbConn.db(config.mongo.dbName);
      const dbCollection = db.collection(this.avatarCollection);

      const query = {
        tune_id: Number(ID),
        localImg: {"$exists":true}
      };

      const result = await dbCollection.aggregate([
        {$match: query},
        {$sort: {createdAt: -1}},
        {
          $project: {
            _id: 0, // exclude the _id field
            localImg: 1 // include only the localImg field
          }
        },
        {
          $group: {
            _id: null,
            allLocalImg: { $push: "$localImg" } // push all localImg arrays into one array
          }
        },
        {
          $project: {
            _id: 0,
            localImg: { $concatArrays: "$allLocalImg" } // concatenate all localImg arrays into one array
          }
        },
        {
          $unwind: "$localImg"
        },
        {
          $group: {
            _id: null,
            localImg: { $push: "$localImg" }
          }
        },
        {
          $project: {
            _id: 0,
            localImg: {
              $reduce: {
                input: "$localImg",
                initialValue: [],
                in: { $concatArrays: ["$$value", "$$this"] }
              }
            }
          }
        }
      ]).toArray().catch(async(error) => {
        await dbConn.close();
        reject(error);
      })
      await dbConn.close();
      if (result) {
        resolve(result);
      } else {
        reject(result);
      }
    }).catch((error) => {
      console.log(
        "Error in getAllAvatarByTuneIdFromDB method of DbAstriaAi class: ",
        error
      );
      throw error;
    });
  } catch (error) {
    console.log(
      "Error in getAllAvatarByTuneIdFromDB method of DbAstriaAi class: ",
      error.message
    );
    throw error;
  }
}
}

