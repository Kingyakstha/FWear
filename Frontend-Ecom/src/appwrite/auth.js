import conf from '../conf/conf'
import {Client,Account,ID} from 'appwrite'

export class AuthService{
    client=new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account=new Account(this.client)

        window.addEventListener('beforeunload', this.handleAppUnload.bind(this));
    }

      // Cleanup function for app unload
      async handleAppUnload() {
        try {
            console.log('App is closing, logging out user...');
            await this.userLogout();
        } catch (error) {
            console.log('Error during app unload logout', error);
        }
    }
    
    async createAccount({name,email,password}){
        try {
            const userAccount=await this.account.create(ID.unique(),email,password,name)
            if (userAccount)
            {
                return this.userLogin({email,password})
            }
            else return userAccount

        } catch (error) {
            console.log('Authservice error : creating account',error)
        }

    }

    async userLogin({email,password}){
        try {
            const user=await this.account.createEmailPasswordSession(email,password)
            if (user){
                console.log('user after login',user)
                return user
            }
            return null
        } catch (error) {
            console.log('Authservice error : user login',error)
        }
    }

    setupAutoLogout() {
        
        window.addEventListener('unload', async () => {
          try {
            await account.deleteSessions(); // Ends all sessions
            console.log("Logged out on window close");
          } catch (error) {
            console.error("Error during logout:", error.message);
          }
        });
      }

    async userLogout(){
        try {
            const userSession=await this.account.deleteSessions('current')
            return userSession
        } catch (error) {
            console.log('Authservice error : user logout',error)
            return false
        }
    }
    async  getCurrentUser(){
        try {
            const userSession=await this.account.get()
            if (userSession){
                console.log('user session is ',userSession)
                return userSession
            }
            else return false
        } catch (error) {
            console.log('Authservice error : getCurrentUser',error)
        }
    }
}

const authService=new AuthService()

export default authService