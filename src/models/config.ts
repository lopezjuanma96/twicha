import { Config } from "config.types";
import { readFileSync, PathOrFileDescriptor, writeFile } from "fs";
import dns from "dns";
import os from "os";

const configFilePath: PathOrFileDescriptor = process.env.CONFIG_PATH;

export class Configs {
    private config: Config;
    private saved: Boolean;
    private static instance: Configs;

    constructor(){
        this.loadConfig();
    }

    static getInstance(){
        if (!this.instance) this.instance = new Configs();
        return this.instance;
    }

    getNewPostTimeout(){return this.config.newPostTimeout};
    setNewPostTimeout(value: number){
        this.config.newPostTimeout = Math.floor(value);
        this.saved = false;
        this.saveConfig()
    }

    private loadConfig(){
        this.config = JSON.parse(readFileSync(configFilePath, {encoding: 'utf-8'}));
    }
    private saveConfig(){
        writeFile(configFilePath, JSON.stringify(this.config), () => this.saved = true)
    }
    close(){
        if(!this.saved) this.saveConfig();
    }
}