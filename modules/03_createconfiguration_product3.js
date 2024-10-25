import http from 'k6/http';
import {sleep} from 'k6';
import { urls } from '../Test_config.js';
import { config } from '../Test_config.js';

// Function that performs the Create configuration request
export function request_createConfiguration (data){

    const url = urls.url_link_createConfiguration;
    console.log('Product3 createConfiguration URL:', url); 
    
    const headers = {
        'accept': 'application/json, text/plain, */*',
        'accept-encoding': 'gzip, deflate, br, zstd',
        'content-type': 'application/json',
    };
    
    const payload = JSON.stringify({
        "productId": config.req_payload.productID3,
        "shortCodeInformation": [],
        "technicalParameters": "",
        "timestamp": data,
        "language": "en",
        "region": "DE"
    });

    console.log('Product3 CreateConfig req Payload:\n', payload); 

    let res = http.post(url, payload, { headers: headers ,  tags: { name: 'CCMrequest_cc3' } });
    sleep(1);

    try {
        let responseBody = JSON.parse(res.body);
        
        console.log('Product3 cc Response Status:', res.status);

        // Extract configurationID from the response
        let configurationId = responseBody.configurationId;
        //console.log('Product2 DI - Extracted configurationId:', configurationId);

        return { configurationId }; // Return the extracted value
    } catch (e) {
        console.log('Product3 DI - Response Status:', res.status);
        console.log('Product3 DI - Response Body:', res.body);
        return { configurationId: null }; // Return null if parsing fails
    }


}