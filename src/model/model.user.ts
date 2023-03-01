// Internal import

class User{
    _id? : object;
    email : string;
    password? : string;
    emailVerified? : boolean;
    privacyPolicy? : boolean;
    createDate? : Date;
    phone? : string;
    otp? : string;
    authToken? : string;
    facebookProfile? : string;
    appleProfile? : string;
    twitterProfile? : string;
    blogUrl? : string;
    profilePic? : string;
    coverPic? : string;
    userName? : string;
    displayName? : string;
    about? : string;
    instagramProfile? : string;
    pinterestProfile? : string;
    channelPrivacy? : string;
    favouriteImages? : object[];
    providerName? : string;
    providerObject? : string;
    appleSub? : string;

    private static user: User;
    private constructor() {
        if(!User.user){
            User.user = new User();
        }
        return User.user;
    }
}

export { User };