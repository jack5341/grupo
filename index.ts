import { exec } from "child_process";

/**
 * Module exports.
 * @public
 */

/**
 * Module dependencies.
 * @private
 */

module.exports = grupo;

/**
 *
 * @param instance // Number of instance
 */

async function grupo(port: number, instance?: number) {
  let pid: string;
  pid = String(await getPid(3000));
}

/**
 *
 * @param port pid of application
 * @returns {<Promise<string>>}
 */
async function getPid(port: number) {
  return await new Promise((resolve, reject) => {
    exec(`lsof -n -i :${port} | grep LISTEN`, (err, stdout) => {
      if (err) {
        reject(err);
      }

      let out: any;

      // Getting everytime 1st element
      out = stdout.match(/\b(\w+)\b/g)[1];

      resolve(out);
    });
  });
}

grupo(3000, 1);
