import schedule from 'node-schedule';
import sendEmail from '../utils/sendEmail.js';
import db from './connectDB.js';

const addTimeToScreenings = async () => {
  const query = `
    UPDATE screening
    SET start_time = DATE_ADD(start_time, INTERVAL 7 DAY) 
    WHERE start_time < CURRENT_DATE(); 
  `;

  const [queryResult] = await db.query(query);
  console.log(queryResult);
};

process.on('SIGINT', async () => {
  console.log('gracefully shutting down node-schedule');
  await schedule.gracefulShutdown();
  process.exit(0);
});

export const scheduleMovieMover = () => {
  const job = schedule.scheduleJob('0 30 1 * * *', async () => {
    console.log('running job at', new Date());
    await addTimeToScreenings();

    sendEmail(
      'filmvisarnabio@gmail.com',
      'Visningarna uppdateras',
      '<div>Fast det fungerar inte än</div>'
    );
  });

  console.log(job.nextInvocation());
  return job;
};
