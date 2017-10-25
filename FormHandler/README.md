Before deploying this function to the Cloud Functions, 
it needs the cloud environment variables to be set.

using:
firebase functions:config:set gmail.email="myusername@gmail.com" gmail.password="secretpassword"

This will be invisible in the codebase, but will be accessible during runtime.
