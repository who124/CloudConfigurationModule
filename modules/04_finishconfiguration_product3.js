import http from 'k6/http';
import {sleep} from 'k6';
import { urls } from '../Test_config.js';
import { config } from '../Test_config.js';

// Function that performs the finishing of configuration
export function request_setCstic1 (data, timestamp){


    const url = `${urls.url_link_setCstic1}${data}/setCstic`;
    console.log('Product3 setCstic URL:', url); 
    
    const headers = {
        'accept': 'application/json, text/plain, */*',
        'accept-encoding': 'gzip, deflate, br, zstd',
        'content-type': 'application/json',
    };
    
    const payload = JSON.stringify({
        "instanceId": "1",
        "csticName": "I_MAX_APP_DCDCCON",
        "csticValues": ["5"],
        "timestamp": timestamp,
        "rootInstanceId": "1"
    });

    console.log('Product3 setCstic req Payload:\n', payload); 

    let res = http.put(url, payload, { headers: headers ,  tags: { name: 'CCMsetCstic1' } });
    sleep(1);


    try {
        let responseBody = JSON.parse(res.body.trim());
        
        console.log('Product3 setCstic1 Response Status:', res.status);
        
        // Extract event values using native JavaScript
        let eventValues = responseBody.events.map(event => event.event);

        return eventValues ; // Return the extracted value
    } catch (e) {
        console.log('Product3 setCstic1 - Response Status:', res.status);
        console.log('there was an error');
        console.error('Parsing Error:', e.message); // Log the error message
      //  console.log('Product3 setCstic1 - Response Body:', res.body);
        return { eventValues: null }; // Return null if parsing fails
    }



}