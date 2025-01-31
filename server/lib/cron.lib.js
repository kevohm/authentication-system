import {CronJob} from "cron"
import { pool} from "../src/config/mysql.config";
// Function to clear expired sessions
async function clearExpiredSessions() {

  try {
    // Query to delete expired sessions
    const query = `
      DELETE FROM sessions
      WHERE expires < NOW()
    `;
    
    // Execute the query
    const [result] = await pool.execute(query);
    console.log(`Cleared ${result.affectedRows} expired sessions.`);
  } catch (error) {
    console.error('Error clearing expired sessions:', error);
  } finally {
    // Close the database connection
    if (pool) await connection.end();
  }
}

// Set up the cron job to run every 12 hours
const job = new CronJob(
  '*/5 * * * *', // Cron expression for every 12 hours
  clearExpiredSessions, // Function to execute
  null, // onComplete callback (optional)
  true, // Start the job immediately
  'UTC' // Time zone (optional, defaults to system time)
);