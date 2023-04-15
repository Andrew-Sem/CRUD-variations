import {$api} from "@/http/api";
import type {IPost} from "@/models/Post";

export class PostService{
    static async fetchPosts():Promise<IPost[]>{
        const res = await $api.get<IPost[]>("/posts")
        return res.data
    }
}