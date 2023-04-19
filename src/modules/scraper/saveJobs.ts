import { TJob } from "types";
import { parsPath } from "./parsPath";
import prisma from "../db";

export async function checkAndSaveJobs(jobs: TJob[]) {
    let count = 0;
    try {
      await Promise.all(
        jobs.map(async job => {
          const job_name: string = parsPath(job.link);
          const existingJob = await prisma.job.findUnique({
            where: {
              job_name,
            },
          });
  
          if (!existingJob) {
            console.log('its unique:', job.title, job.link);
            count = count + 1;
            await prisma.job.create({
              data: {
                title: job.title,
                company: job.company,
                location: job.location,
                time: job.time,
                link: job.link,
                job_name: job_name,
              },
            });
          }
        }),
      );
  
      console.log('Jobs saved to database successfully!');
    } catch (e: any) {
      console.error(`Error saving jobs to database: ${e.message}`);
    } finally {
      console.log(jobs.length, 'jobs found');
      console.log('new items', count);
      await prisma.$disconnect();
    }
  }