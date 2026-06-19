import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost ({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                conf.appwritedDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            raise(error)
        }
    }


    async updatePost (slug,{title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwritedDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                     content,
                     featuredImage,
                     status,
                }
            )
        } catch (error) {
            raise(error);
        }
    }

    async deletePost(slug){
        try {
             await this.databases.deleteDocument(
                conf.appwritedDatabaseId,
                conf.appwriteCollectionId,
                slug
             )
             return true;
        } catch (error) {
            raise(error)
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwritedDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("APPwrite service :: getPost :: error",error);
            
        }
    }

    async getPosts(queries= [Query.equal("status","active")]){
        try{
            return await this.databases.listDocuments(
                conf.appwritedDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
        }catch (error){
            console.log("Appwrite Service :: getPosts :: error", error);
        }
    }

    // file upload method
    async uploadFile(file){
        try{
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
            return true;
        }catch(error){
            console.log("Appwrite Service :: uploadPosts :: error", error);
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId,
            )
            return true;
        } catch (error) {
            console.log("Appwrite Service :: deletePosts :: error", error);
            return false;
            
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId,
        )
    }


};

const service = new Service()
export default service;
