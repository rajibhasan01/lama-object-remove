export const config = {
    mongo: {
      url: 'mongodb://localhost:27017',
      dbName: 'AiGeneratedImage',
    },
    "superadmin": {
      "username": "admin@braincraftapps.com",
      "password": "12345",
      "_id": "613f3e819a5bd32118cc8271"
  },
  "socialLogin": {
    "successURL": 'http://avater.braincraftapps.com/social-auth/success?token=',
    "failedURL": 'http://avater.braincraftapps.com',
    "google": {
      "clientId":
      '104443873174-d492ffnchecain2qsvmkrjei3tldobf9.apps.googleusercontent.com',
    "clientSecret": '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',
    "callbackURL": 'http://ai.braincraftapps.com/login/auth/google/callback',
    "failUrl": 'http://ai.braincraftapps.com/failure',
    },
  }
  };
