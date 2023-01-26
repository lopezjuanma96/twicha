import { PathOrFileDescriptor, readFileSync } from "fs";
import { Post } from "posts.types";

const postFilePath: PathOrFileDescriptor = "../data/posts.json";

export class Posts{

    temporalPosts: Array<Post>;
    permanentPosts: Array<Post>;
    expiration: number;
    permanentProbability: number; //probability of returning a permanent post on getPost

    constructor(_exp: number = 24*60*60*1000, _prob: number = 0.1){ //one day is default expiration
        this.expiration = _exp;
        this.permanentProbability = _prob;
        const oldPostsFile: string = readFileSync(postFilePath, {encoding: 'utf-8'});
        if (oldPostsFile) {
            const oldPosts: Array<Post> = JSON.parse(oldPostsFile);
            this.temporalPosts = oldPosts.filter(e => !e.permanent && (Date.now() - e.date) < this.expiration);
            this.permanentPosts = oldPosts.filter(e => e.permanent)
        } else {
            this.temporalPosts = []; //here load old posts that are still valid  
            this.permanentPosts = []; //here load old posts
        }
    }

    getExpiration(): number {return this.expiration};
    setExpiration(val: number): void {this.expiration = Math.floor(val)}
    
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
        const index = Math.floor(this.permanentPosts.length * Math.random());
        return this.permanentPosts[index];
    }

    getPost(): Post {
        const returnPermanent = Math.random() <= this.permanentProbability;
        if (returnPermanent || this.temporalPosts.length > 0) return this.getPermanentPost();
        else this.getTemporalPost();
    }

    savePosts(): {}
}