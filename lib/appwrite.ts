import { Account, Avatars, Client, Databases, ID, Models, Query } from 'react-native-appwrite';

export const appWriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.sahil.aora',
    projectId: '677e0dbe001f6eec00c3',
    databaseId: '677e0f45003aaf31f5e7',
    userCollectionId: '677e0f72001618023d39',
    videoCollectionId: '677e0f9b002eaf4200c8',
    storageId: '677e117d003ab770f77d'
}



const client = new Client();

client
    .setEndpoint(appWriteConfig.endpoint) 
    .setProject(appWriteConfig.projectId) 
    .setPlatform(appWriteConfig.platform);

const account = new Account(client)
const avatars = new Avatars(client)
const databases = new Databases(client)

export const createUser = async (email : string , password : string , username : string) : Promise<Models.Document> => {
   try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )

        if(!newAccount) {
            throw Error
        }
        const avatarUrl = avatars.getInitials(username)
        await signIn(email , password)
        const newUser = await databases.createDocument(
            appWriteConfig.databaseId,
            appWriteConfig.userCollectionId,
            ID.unique(),
            {
              accountId: newAccount.$id,
              email,
              username,
              avatar: avatarUrl,
            }
          )
          return newUser
   } catch (error : any) {
        console.log(error)
        throw new Error(error)
   }
}


export const signIn  = async (email : string , password : string) : Promise<Models.Session> => {
    try {
        const session =  await account.createEmailPasswordSession(email , password)
        return session
    } catch (error : any) {
        throw new Error(error)
    }
}

export const signInWithActiveSession = async (email : string , password : string) : Promise<Models.Session> => {
    try {
        const sessions = await account.listSessions(); 
        if (sessions.sessions.length > 0) {
          console.log("User is already signed in");
          return sessions.sessions[0];
        }
        const session =  await account.createEmailPasswordSession(email , password)
        return session
    } catch (error : any) {
        throw new Error(error)
    }
}

export const  getCurrentUser = async () : Promise<Models.Document | null>  => {
    try {
        const currentAccount =  await account.get()
        if(!currentAccount) {
            throw Error
        }
        const currentUser =  await databases.listDocuments(
            appWriteConfig.databaseId,
            appWriteConfig.userCollectionId,
            [Query.equal('accountId' , currentAccount.$id)]
        )
        if(!currentUser) {
            throw Error
        }
        return currentUser.documents[0]
    } catch (error) {
        console.log(error)
        return null
    }
}



