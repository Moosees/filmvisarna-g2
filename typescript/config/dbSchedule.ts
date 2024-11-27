import schedule from 'node-schedule';
import sendEmail from '../utils/sendEmail.js';

process.on('SIGINT', async () => {
  console.log('gracefully shutting down node-schedule');
  await schedule.gracefulShutdown();
  process.exit(0);
});

export const scheduleMovieMover = () => {
  const job = schedule.scheduleJob('0 30 1 * * *', () => {
    console.log('running job', new Date());
    sendEmail(
      'filmvisarnabio@gmail.com',
      'Visningarna uppdateras',
      '<div>Fast det fungerar inte än</div>'
    );
  });

  console.log(job.nextInvocation());
  return job;
};
