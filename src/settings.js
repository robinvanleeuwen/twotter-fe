import dotenv from  'dotenv'

let API_SERVER_VAL = '';

switch (process.env.NODE_ENV) {
    case 'development':
        API_SERVER_VAL = 'http://localhost:8000/';
        break;
    case 'production':
        API_SERVER_VAL = process.env.REACT_APP_API_SERVER_VAL;
        break;
    default:
        API_SERVER_VAL = 'http://twotter.rldsoftware.nl:5000/';
        break;
}

export const API_SERVER = API_SERVER_VAL;