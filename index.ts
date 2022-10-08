import { exec } from "child_process";
import cluster from "cluster";
import { cpus } from "os";

interface options {
  instance?: number;
  log?: boolean;
}

enum logTypesEnum {
  INFO = "info",
  ERROR = "error",
}

/**
 * Module exports.
 * @public
 */

/**
 * Module dependencies.
 * @private
 */

/**
 * @param {number} port port of currently running application
 * @param {options} opts options of middleware
 */

export default async function grupo(port: number, opts: options) {
  const instances = opts.instance || 0;
  const logs = opts.log || false;

  if (!logs) {
    console.log = function () {};
  }

  let pid: string;
  try {
    pid = await getPid(port);
    runWorkers(pid, instances);
  } catch (err) {
    logger(err, logTypesEnum.ERROR);
  }
}

/**
 * @param {string} pid pid of parent process
 * @param {number} instance instance of fork count
 */
async function runWorkers(pid: string, instance: number) {
  const totalCPUs = instance || cpus().length;

  logger(`Number of CPUs is ${totalCPUs}`, logTypesEnum.INFO);
  logger(`Master ${pid} is running`, logTypesEnum.INFO);

  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    logger(`worker ${worker.process.pid} died`, logTypesEnum.INFO);
    logger("new worker creating again", logTypesEnum.INFO);
    cluster.fork();
  });
}

/**
 *
 * @param {number} port to find pid by port
 * @returns {Promise<string>} returns pid of application
 */
async function getPid(port: number): Promise<string> {
  return await new Promise((resolve, reject) => {
    exec(`lsof -n -i :${port} | grep LISTEN`, (err, stdout) => {
      if (err) {
        reject(err);
      }

      let out: string;

      // Getting everytime 1st element
      out = stdout.match(/\b(\w+)\b/g)[1];

      resolve(out);
    });
  });
}

/**
 *
 * @param {string} message message of log
 * @param {logTypesEnum} type type of log
 */

function logger(message: string, type: logTypesEnum) {
  switch (type) {
    case logTypesEnum.INFO:
      console.log("\x1b[36m%s\x1b[0m", `[${logTypesEnum.INFO}]: ${message}`);
      break;

    case logTypesEnum.ERROR:
      console.log("\x1b[31m%s\x1b[0m", `[${logTypesEnum.INFO}]: ${message}`);
      break;
  }
}

module.exports = grupo;
