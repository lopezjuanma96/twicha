import { PathOrFileDescriptor, readFileSync, writeFileSync } from "fs";
import { Post } from "posts.types";

const postFilePath: PathOrFileDescriptor = "../data/posts.json";

export class Posts{

    private static instance: Posts;

    temporalPosts: Array<Post>;
    permanentPosts: Array<Post>;
    expiration: number;
    permanentProbability: number; //probability of returning a permanent post on getPost

    constructor(){ //one day is default expiration
        this.expiration = 24*60*60*1000;
        this.permanentProbability = 0.1;
        this.loadPosts();
    }

    static getInstance(): Posts {
        if (!Posts.instance) Posts.instance = new Posts();
        return Posts.instance;
    }

    getExpiration(): number {return this.expiration};
    setExpiration(val: number): void {this.expiration = Math.floor(val)}

    getPermanentProbability(): number {return this.permanentProbability}
    setPermanentProbability(val: number): void {this.permanentProbability = val}
    
    addTemporalPost(user: string, message: string): Post {
        const toAdd: Post = {
            user,
            message,
            date: Date.now(),
            permanent: false
        };
        this.temporalPosts.push(toAdd);
        return toAdd;
    }
    addPermanentPost(user: string, message: string): Post {
        const toAdd: Post = {
            user,
            message,
            date: Date.now(),
            permanent: true
        };
        this.permanentPosts.push(toAdd);
        return toAdd;
    }

    resetTemporalPosts(): void {
        this.temporalPosts = [];
    }

    private getTemporalPost(): Post {
        return this.temporalPosts.splice(-1, 1)[0];
    }
    private getPermanentPost(): Post {
        if (this.permanentPosts.length == 0) return;
        const index = Math.floor(this.permanentPosts.length * Math.random());
        return this.permanentPosts[index];
    }

    getPost(): Post {
        const returnPermanent = Math.random() <= this.permanentProbability;
        if (returnPermanent || this.temporalPosts.length > 0) return this.getPermanentPost();
        else this.getTemporalPost();
    }
    getPostsLength(): number {
        return this.temporalPosts.length + this.permanentPosts.length;
    }

    async savePosts(): Promise<void> {
        const saveObj: Object = {temporal: this.temporalPosts, permanent: this.permanentPosts}
        return writeFileSync(postFilePath, JSON.stringify(saveObj), {encoding: 'utf-8'})
    }
    loadPosts(): void {
        try {
            const oldPostsFile: string = readFileSync(postFilePath, {encoding: 'utf-8'});
            const oldPosts: Array<Post> = JSON.parse(oldPostsFile);
            this.temporalPosts = oldPosts.filter(e => !e.permanent && (Date.now() - e.date) < this.expiration); //here load old posts that are still valid  
            this.permanentPosts = oldPosts.filter(e => e.permanent) //here load old posts
        } catch (e) {
            if (e.code == 'ENOENT') {
                this.temporalPosts = [];
                this.permanentPosts = [];
            } else throw e;
        }
    }
}