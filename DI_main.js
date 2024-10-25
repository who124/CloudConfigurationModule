import { sleep } from 'k6'
import { request_prod_timestamp1 } from './modules/01_product-timestamp_product1.js';
import { request_prod_timestamp2 } from './modules/01_product-timestamp_product2.js';
import { request_prod_timestamp3 } from './modules/01_product-timestamp_product3.js';
import { config } from './Test_config.js';
import { request_DirectInput1 } from './modules/02_direct-input_product1.js';
import { request_DirectInput2 } from './modules/02_direct-input_product2.js';
import { request_createConfiguration } from './modules/03_createconfiguration_product3.js';
import { request_setCstic1 } from './modules/04_finishconfiguration_product3.js';

export let options = {
    //vus:2, duration: '3m',

    
    stages: [
        {duration: '60s', target:2},
        {duration: '1m', target:4},
        {duration: '1m', target:6},
        {duration: '1m30s', target:0},
    ],
    
    thresholds: {
        'http_req_duration{name:CCMrequest_DI1}': ['med<1180', 'p(95)<1240'],
        'http_req_duration{name:CCMrequest_DI2}': ['med<1180', 'p(95)<1240'],
        'http_req_duration{name:CCMrequest_cc3}': ['med<1180', 'p(95)<1240'],
        'http_reqs{name:CCMrequest_DI1}': ['count>0'], 
        'http_reqs{name:CCMrequest_DI2}': ['count>0'], 
        'http_reqs{name:CCMrequest_cc3}': ['count>0'], 
        'http_reqs{name:CCMrequest_timestamp3}': ['count>0'], 
        'http_req_duration{name:CCMrequest_timestamp3}': ['med<1180', 'p(95)<1240'],
         http_req_failed: ['rate<0.01'] // error %    
}
};

export function setup() {
    const  responseNumber1 = request_prod_timestamp1();
    const  responseNumber2 = request_prod_timestamp2();
    const  responseNumber3 = request_prod_timestamp3();

    // Return the data object to pass it to the default function
    return { responseNumber1, responseNumber2, responseNumber3 };
}

export default function (data) {
    // Here I retrieve the timestamp value obtained from the setup function
    let responseNumber1 = data.responseNumber1;  
    let responseNumber2 = data.responseNumber2;  
    let responseNumber3 = data.responseNumber3;  
    
    // The 1st Direct input for productID1
    let configurationId1 = request_DirectInput1(responseNumber1); // directly get configurationId
    const actual_configurationID1 = configurationId1.configurationId;  // extract the configID value
    console.log(`Product1 ${config.req_payload.productID1} configurationId:`, actual_configurationID1);

    // The 2nd Direct input for productID1
    let configurationId2 = request_DirectInput2(responseNumber2); // directly get configurationId
    const actual_configurationID2 = configurationId2.configurationId;  // extract the configID value
    console.log(`Product2 ${config.req_payload.productID2} configurationId:`, actual_configurationID2);
    
    // The 1st Create configuration request for productID3
    let configurationId3 = request_createConfiguration(responseNumber3); // directly get configurationId
    const actual_configurationID3 = configurationId3.configurationId;  // extract the configID value
    console.log(`Product3 ${config.req_payload.productID3} configurationId:`, actual_configurationID3);

    // Finish the configuration for productID3
    let extracted_events = request_setCstic1(actual_configurationID3, responseNumber3); // directly get configurationId
    console.log('Extracted Events:', extracted_events);
    
    sleep(3); 
    return {configurationId1, configurationId2, configurationId3}; 
}
