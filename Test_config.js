const usedURL = 'https://malldev.industry.siemens.com/spice/cloudcm/';

const stage_url = 'https://mallstage.industry.siemens.com/spice/cloudcm/';
const dev_url = 'https://malldev.industry.siemens.com/spice/cloudcm/';

export const config = {
    req_payload: {
        productID1: "1LE1X",
        productID2: "1FN3",
        mlfb1: "1LE1",
        mlfb2: "1FN3",
    }
};

export const urls = {
    url_link_directInput: `${usedURL}rest/configuration/directinput`, 
    url_link_timestamp_prod1: `${usedURL}rest/update-timestamp/product/${config.req_payload.productID1}/product-timestamp`, 
    url_link_timestamp_prod2: `${usedURL}rest/update-timestamp/product/${config.req_payload.productID2}/product-timestamp`, 
}