echo "\n# BAPI CREDENTIALS" >> .env

JWT_SECRET="${TENANT}_JWT_SECRET"
BAPI_USERNAME="${ENVIRONMENT}_${TENANT}_BAPI_USERNAME"
BAPI_PASSWORD="${ENVIRONMENT}_${TENANT}_BAPI_PASSWORD"

echo "BAPI_USERNAME='$(eval echo "\$$BAPI_USERNAME")'" >> .env
echo "BAPI_PASSWORD='$(eval echo "\$$BAPI_PASSWORD")'" >> .env
echo "JWT_SECRET='$(eval echo "\$$JWT_SECRET")'" >> .env

echo "\n# CLOUD MIDDLEWARE CREDENTIALS" >> .env

CMW_SECRET="${ENVIRONMENT}_${TENANT}_CMW_SECRET"
echo "CLOUD_MIDDLEWARE_SECRET='$(eval echo "\$$CMW_SECRET")'" >> .env

echo "\n# CHECKOUT APP SECRETS" >> .env

for i in `delims=${SHOP_IDS//[^,]}; seq 1 $((${#delims} + 1))`
do
    SHOP_ID="`echo $SHOP_IDS | cut -d',' -f$i`"
    CHECKOUT_APP_SECRET="${ENVIRONMENT}_${TENANT}_CHECKOUT_APP_SECRET_$SHOP_ID"
    echo "CHECKOUT_APP_SECRET_${SHOP_ID}='$(eval echo "\$$CHECKOUT_APP_SECRET")'" >> .env
done
