// External import
import createError from 'http-errors';
import fs from "fs";

// 404 not found handler
export const notFoundHandler = (req: any, res: any, next: any) => {
    res.locals.html = true;
    next(createError(404, "Your requested content was not found!"));
}

// default error handler
export const errorHandler = (err: any, req: any, res: any, next: any) => {
  if(res.headersSent){
    next(err.message);
  } else {
    res.locals.error = process.env.NODE_ENV === "development" ? { message: err.message } : { message: err.message };

    res.status(err.status || 500);

    if (res.locals.html) {
        res.locals.html = false;
        // html response
        res.render("pages/error.ejs", {
        title: "Error page",
        });
    } else {
        // json response
        res.json(res.locals.error);
    }
  }
}

