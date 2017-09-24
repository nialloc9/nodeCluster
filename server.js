import cluster from 'cluster';
import os from 'os';
import { app } from './config';

/**
 * is the cluster master? If not sete up server. If it is create new fork.
 */
if(!cluster.isMaster) {

    app.get('/*', (req, res) => {res.send('process ' + process.pid + ' says hello!').end();})

    app.listen(8000, () => {
        console.log('Process ' + process.pid + ' is listening to all incoming requests');
    });

} else {
    //gets number of cpus
    const numWorkers = os.cpus().length;

    console.log('Master cluster setting up ' + numWorkers + ' workers...');

    //fork cluster n times
    for(let i = 1; i <= numWorkers; i++) {
        cluster.fork();
    }

    //when a new fork is made
    cluster.on('online', (worker) => {
        console.log('Worker ' + worker.process.pid + ' is online');
    });

    //when a fork ends
    cluster.on('exit', (worker, code, signal) => {
        console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
        console.log('Starting a new worker');
        cluster.fork();
    });
}