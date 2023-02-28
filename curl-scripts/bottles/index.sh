#!/bin/sh

API="http://localhost:8000"
URL_PATH="/bottles"

curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}"

echo
