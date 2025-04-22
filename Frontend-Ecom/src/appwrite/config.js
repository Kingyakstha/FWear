
import conf from '../conf/conf'
import {Client,Databases,ID,Storage, Query} from 'appwrite'

export class DbService{
    client=new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.databases=new Databases(this.client);
        this.bucket=new Storage(this.client);
    }

    async addProduct({Name,Category,Image,New_price,Description}){
        const unik= ID.unique()


        try {
            console.log('id is ',)
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
               unik,
                {Name,Category,Image,New_price,Description}

            )
            
        } catch (error) {
            console.log('DbService error : addProduct',error)
            console.log(unik)
            console.log(unik)
            if (error.type==='document_already_exists')
            {
                await this.databases.getDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId,
                    ID.unique(),
                    []
                )
            }
        }
    }
    async updateProduct(uniqueId,{name,category,image,price}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                uniqueId,
                {name,category,image,price}

            )
            
        } catch (error) {
            console.log('DbService error : updateProduct',error)
        }
    }
    async deleteProduct(uniqueId){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                uniqueId,
            )
            return true
        } catch (error) {
            console.log('DbService error : deleteProduct',error)
            return false
        }
    }
    async getProducts(queries=[]){
        try {
            const products=await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
            if( products)
            {
                console.log('Products came but empty',products)
                return products.documents
            }
        } catch (error) {
            console.log('DbService error : getProducts',error)
            return false
        }
    }

    async addToCart({Name,Image,Price,Quantity,UserId,ProductId,Size}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCartCollectionId,
                ID.unique(),
                {Name,Image,Price,Quantity,UserId,ProductId,Size}
            )
            
        } catch (error) {
            console.log('DbService error : add to cart',error)
        }
    }

    async getCartItem(){
        try {
            const list=await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCartCollectionId,
                []
               
            )
            return list
            
        } catch (error) {
            console.log('DbService error : get cart items',error)

        }

    }
    async deleteCartItem(id){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCartCollectionId,
                id
            )
            return true;
        } catch (error) {
            console.log('DbService error : delete cart items',error)
            return false;

        }

    }
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
            
        } catch (error) {
            console.log('DbService error : uploadFile',error)
            return false
        }
    }
    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log('DbService error : deleteFile',error)
            return false
        }
    }
    getFilePreview(fileId){
        try {

            return this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log('DbService error : getFilePreview',error)
            return false
        }
    }
 
}

const dbService=new DbService()

export default dbService