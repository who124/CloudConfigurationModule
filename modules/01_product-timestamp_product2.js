import http from 'k6/http';
import {check} from 'k6';
import { sleep } from 'k6';
import { urls } from '../Test_config.js';
import { config } from '../Test_config.js';



// Function to get the product-timestamp

export function request_prod_timestamp2 () {

    const url = urls.url_link_timestamp_prod2;
    console.log('Product2 timestamp URL:', url);
    

    const headers = {
        'accept': 'application/json, text/plain, */*',
        'accept-encoding': 'gzip, deflate, br, zstd',
        'content-type': 'application/json',
    };

    let res = http.get(url, { headers: headers ,  tags: { name: 'CCMrequest_timestamp2' } });
    sleep(1);

    try{
        let responseNumber2 = Number(res.body);
        
        console.log('Product2 timestamp Response status:', res.status);
        console.log(`Product2 timestamp: ${responseNumber2}`);
        return responseNumber2; 

    } catch (e) {
        console.log('Request product timestamp - Response status:', res.status);
        console.log('Request product timestamp - Response Body:', res.body);
        return { responseNumber2: null }; // Return null if parsing fails
    }

};