import { requestGet } from "../baseService";

export const getSiteMatchmaking = async () => 
    requestGet("https://teksas-api.devlabs.id/site/getallbatch/", {}); 

