export class Login {
    username: string;
    password: string;


    private static login: Login;

    private constructor() {}

    public static getInstance() {
      if (!Login.login) {
        Login.login = new Login();
      }

      return Login.login;
    }
  }
