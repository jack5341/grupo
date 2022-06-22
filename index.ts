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
  pid = await getPid(3000);
}

/**
 *
 * @param port to find pid by port
 * @returns {Promise<string>} returns pid of application
 */
async function getPid(port: number): Promise<string> {
  return await new Promise((resolve, reject) => {
    exec(`lsof -n -i :${port} | grep LISTEN`, (err, stdout) => {
      if (err) {
        reject(err);
      }

      let out: any;

      // Getting everytime 1st element
      out = stdout.match(/\b(\w+)\b/g)[1];

      resolve(String(out));
    });
  });
}

grupo(3000, 1);
