# moopoo
🐮💩

## Deploy Google Cloud function

Install `glcoud` utility: https://cloud.google.com/sdk/docs/downloads-interactive

Deploy (e.g. poop function):

```
cd cloud/functions/poop/
gcloud functions deploy poopify --region=europe-west1 --trigger-http
```