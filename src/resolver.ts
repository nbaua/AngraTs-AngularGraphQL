import { IResolvers } from "graphql-tools";
import path from "path";

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(path.resolve(__dirname, "./database/data.sqlite"));

const resolver: IResolvers = {
  
  Query: {
    carriers(_: void, args: any): any {
      return queryHelper(
        `SELECT * FROM carrier LIMIT ${args.offset}, ${args.limit}`,
        false
      );
    },

    carrier(_: void, args: any): any {
      return queryHelper(`SELECT * FROM carrier WHERE id='${args.id}'`, true);
    },

    flights(_: void, args: any): any {
      return queryHelper(
        `SELECT * FROM flight LIMIT ${args.offset}, ${args.limit}`,
        false
      );
    },

    flight: (_: void, args: any) => {
      return queryHelper(`SELECT * FROM flight WHERE id='${args.id}'`, true);
    },

    carrier_flights: (_: void, args: any) => {
      return queryHelper(
        `SELECT f.airport, f.flight_code, f.origin, f.destination, f.air_time, f.distance, f.flight_date, 
                  c.flight_code, c.tailnum, c.airline, c.flight_ref
                  FROM flight AS f 
                  INNER JOIN carrier AS c 
                  ON f.flight_code = c.flight_code  WHERE
           c.flight_code='${args.flight_code}'`,
        false
      ).then((rows:any) =>
        rows.map((result : any) => {
          return {
            flight_code: result.flight_code,
            origin: result.origin,
            destination: result.destination,
            air_time: result.air_time,
            distance: result.distance,
            airport: result.airport,
            flight_date: result.flight_date,
            carrier: {
              flight_ref: result.flight_ref,
              tailnum: result.tailnum,
              airline: result.airline,
            },
          };
        })
      );
    },
  },
};

function queryHelper(sql: any, single: any) {
  return new Promise((resolve, reject) => {
    var callback = (err: any, result: any) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    };

    if (single) db.get(sql, callback);
    else db.all(sql, callback);
  });
}

export default resolver;
