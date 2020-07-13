# AnGraTS - An Angular GraphQL Demo Application - TypeScript Version

---

    This project is working prototype showing the use of GraphQL in an Angular Application.
    (Server uses the simple TS version - Angular project is TS version)

> ### TypeScript + GraphQL + Angular + Express + SqlLite

## How to use

Simply clone this repository and run following command on terminal to update the required packages

    > npm install

### Quick Check on GraphQL Server

Check developer mode

    > npm run start:dev

### Build for development

    > npm run build:dev
 
### Build for production 

    > npm run build

This will generate the dist folder automatically and copy all the required files to be deployed.


### Quick Check on GraphQL Server


Run the following query on localhost:1000/graphql

    {
        flights(flight_code: "9E-3422") {
            flight_code
            origin
            destination
            carrier {
            tailnum
            flight_ref
            airline
            }
        }
    }

---

### Quick check on Angular App

Run the following command after starting the server in another terminal by switching to client directory

    > ng serve


---

Disclaimer:
For simplicity and to make things easy to understand, there is no abstraction of queries is done. Inline queries are not a know best practice, Please follow the best coding practices at your end, do NOT replicate this structure for your actual project.
