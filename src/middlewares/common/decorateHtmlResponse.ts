export const decorateHtmlResponse = (pageTitle: any) => {
    return (req: any, res: any, next: any) => {
      res.locals.html = true;
      res.locals.title = `${pageTitle} - ${process.env.APP_NAME}`;
      res.locals.loggedInUser = {};
      res.locals.errors = {};
      res.locals.data = {};
      next();
    };
  }
