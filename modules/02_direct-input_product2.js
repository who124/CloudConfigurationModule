import http from 'k6/http';
import {sleep} from 'k6';
import { urls } from '../Test_config.js';
import { config } from '../Test_config.js';

// Function that performs the Direct input request

export function request_DirectInput2 (data){

    const url = urls.url_link_directInput;
    console.log('Product2 directInput URL:', url); 

    const headers = {
        'accept': 'application/json, text/plain, */*',
        'accept-encoding': 'gzip, deflate, br, zstd',
        'content-type': 'application/json',
    };

    const payload = JSON.stringify({
        "productId": config.req_payload.productID2,
        "mlfb": config.req_payload.mlfb2,
        "shortCodeInformation": [],
        "technicalParameters": "",
        "timestamp": data,
        "language": "en",
        "region": "DE"
    });
    console.log('Product2 DI req Payload:\n', payload); 

    let res = http.post(url, payload, { headers: headers ,  tags: { name: 'CCMrequest_DI2' } });
    sleep(1);

    try {
        let responseBody = JSON.parse(res.body);
        
        console.log('Product2 DI Response Status:', res.status);

        // Extract instancePollingId from the response
        let configurationId = responseBody.configurationId;
        //console.log('Product2 DI - Extracted configurationId:', configurationId);

        return { configurationId }; // Return the extracted value
    } catch (e) {
        console.log('Product2 DI - Response Status:', res.status);
        console.log('Product2 DI - Response Body:', res.body);
        return { configurationId: null }; // Return null if parsing fails
    }


}