// External import
import "dotenv/config";

// Internal import
import { config } from "../../config";

export class ConfigService{
    private static configInstance : ConfigService;
    private constructor(){};

    static getInstance(){
        if(!ConfigService.configInstance){
            ConfigService.configInstance = new ConfigService();
        }
        return ConfigService.configInstance;
    }

    public getConfig(){
        return config;
    }
};
