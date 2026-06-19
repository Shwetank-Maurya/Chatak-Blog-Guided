import conf  from "../conf/conf";

import { CLient, Account, ID } from "appwrite";


export class AuthService {
    client = new CLient();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({email,password,name}){
        try {
            const userAccount=await this.account.create(ID.unique(),email,password,name);
            if(userAccount){
                //call another method
                return this.Login({email,password});
            }
            else{
                return userAccount;
            }
        } catch (error){
            throw error;
        }
    }

    async Login(email,password){
        try{
            return await this.createEmailSession(email,password);
        } catch(error){
            throw(error);
        }
    }

    async getCurrentUser(){
        try{
            return await this.account.get();
        }catch(error){
            throw error;
        }
        return null;
    }

    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            throw(error);
        }
    }
}

const authService = new AuthService();

export default authService;
