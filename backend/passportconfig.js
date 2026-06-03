const passport = require('passport');
import { Strategy as LocalStrategy } from "passport-local";
import User from "./model/accountdb.js";

passport.use(
  new LocalStrategy(async (username, password, done) => {
    
    try {
      
      const user = await User.findOne({username});
      
      if (!user) {
        
        return done(null, false, { message: "no such user or password" });
      }
      // If a user is found, check if the provided password is valid for that user.
      // The 'isValidPassword' method is usually defined in the User model.
      const passwordCheck = await user.isValidPassword(password);
      
      if (!passwordCheck) {
       
        return done(null, false, { message: "no such user or password" });
      }
      

      return done(null, user);
    } catch (error) {
      
      return done("passport error");
    }
  })
);


passport.serializeUser((user, done) => {
  
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    
    const user = await User.findById(id);
    
    done(null, { username: user.username });
  } catch (error) {
    
    done("Issue in deserialize");
  }
});