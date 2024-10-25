import http from 'k6/http';
import {check} from 'k6';
import { sleep } from 'k6';
import { urls } from '../Test_config.js';
import { config } from '../Test_config.js';



// Function to get the product-timestamp

export function request_prod_timestamp3 () {

    const url = urls.url_link_timestamp_prod3;
    console.log('Product3 timestamp URL:', url);
    

    const headers = {
        'accept': 'application/json, text/plain, */*',
        'accept-encoding': 'gzip, deflate, br, zstd',
        'content-type': 'application/json',
    };

    let res = http.get(url, { headers: headers ,  tags: { name: 'CCMrequest_timestamp3' } });
    sleep(1);

    try{
        let responseNumber3 = Number(res.body);
        
        console.log('Product3 timestamp Response status:', res.status);
        console.log(`Product3 timestamp: ${responseNumber3}`);
        return responseNumber3; 

    } catch (e) {
        console.log('Request product timestamp - Response status:', res.status);
        console.log('Request product timestamp - Response Body:', res.body);
        return { responseNumber2: null }; // Return null if parsing fails
    }

};