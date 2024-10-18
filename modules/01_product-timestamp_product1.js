import http from 'k6/http';
import {check} from 'k6';
import { sleep } from 'k6';
import { urls } from '../Test_config.js';
import { config } from '../Test_config.js';



// Function to get the product-timestamp

export function request_prod_timestamp1 () {

    const url = urls.url_link_timestamp_prod1;
    console.log('Product1 timestamp URL:', url);
    

    const headers = {
        'accept': 'application/json, text/plain, */*',
        'accept-encoding': 'gzip, deflate, br, zstd',
        'content-type': 'application/json',
    };

    let res = http.get(url, { headers: headers ,  tags: { name: 'CCMrequest_timestamp1' } });
    sleep(1);

    try{
        let responseNumber1 = Number(res.body);
        
        console.log('Product1 timestamp Response status:', res.status);
        console.log(`Product1 timestamp: ${responseNumber1}`);
        return responseNumber1; 

    } catch (e) {
        console.log('Request product timestamp - Response status:', res.status);
        console.log('Request product timestamp - Response Body:', res.body);
        return { responseNumber1: null }; // Return null if parsing fails
    }

};