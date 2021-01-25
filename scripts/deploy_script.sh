#!/usr/bin/env bash

# configure the bucket to serve static file. May this can be done once.
aws s3 website s3://si-project-webapp-bucket --index-document index.html --error-document error.html
# path to be found in angular.json, it is SI-Projekt-Anamnese-Web
aws s3 sync dist/SI-Projekt-Anamnese-Web s3://si-project-webapp-bucket
