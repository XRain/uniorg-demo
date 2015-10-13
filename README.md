Demo  code of my UniOrg project (http://eur.uniorg.nl).
It is an old intermediate version, now it is refactored and optimized, but here you can look at the sample of my code and the way i build simple applications.

If you want to launch it locally, you will need to modify app config sample (get it at /app/docs/sample.config,js).
Fill in your MongoDB connection string, rename this file to 'config.js' and put it one directory above the project dir.
After, just type npm install && gulp.
Npm may build a native module for LWIP processor, so 'npm install' could take some time.
