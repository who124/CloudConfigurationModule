import http from 'k6/http';
import {check} from 'k6';
import { sleep } from 'k6';
import { config } from '../Test_config.js';
import { urls } from '../Test_config.js';


// Function to get the product-timestamp

export function request_prod_timestamp_multipleP () {

    const headers = {
        'accept': 'application/json, text/plain, */*',
        'accept-encoding': 'gzip, deflate, br, zstd',
        'content-type': 'application/json',
    };

    // 1st Timestamp request
    const url1 = urls.request_prod_timestampID1URL;
    console.log('Product1 timestamp URL:', url1);
    
    let res1 = http.get(url1, { headers: headers ,  tags: { name: 'CCMrequest_PT1' } });
    sleep(1);

    let responseNumber1;
    try{
        responseNumber1 = Number(res1.body);
        
        console.log('Product1 timestamp - Response status:', res1.status);
        console.log(`Product1 timestamp: ${responseNumber1}`);
        
    } catch (e) {
        console.log('Request product1 timestamp - Response status:', res1.status);
        console.log('Request product1 timestamp - Response Body:', res1.body);
        return { responseNumber1: null }; // Return null if parsing fails
    }

    // 2nt Timestamp request
    const url2 = urls.request_prod_timestampID2URL;
    console.log('Product2 timestamp URL:', url2);
    

    let res2 = http.get(url2, { headers: headers ,  tags: { name: 'CCMrequest_PT2' } });
    sleep(1);

    let responseNumber2;
    try{
        responseNumber2 = Number(res2.body);
        
        console.log('Product2 timestamp - Response status:', res2.status);
        console.log(`Product2 timestamp: ${responseNumber2}`);
        

    } catch (e) {
        console.log('Request product timestamp - Response status:', res2.status);
        console.log('Request product timestamp - Response Body:', res2.body);
        return { responseNumber1: null }; // Return null if parsing fails
    }
// Return both responses as an object
    return { responseNumber1, responseNumber2 };

};