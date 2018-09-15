# moopoo
🐮💩

## Cloud Function Endpoints

 - ```https://europe-west1-moopoo-216507.cloudfunctions.net/poopify```

## Deploy Google Cloud function

Install `glcoud` utility: https://cloud.google.com/sdk/docs/downloads-interactive

Deploy (e.g. poop function):

```
cd cloud/functions/poop/
gcloud functions deploy poopify --region=europe-west1 --trigger-http
```