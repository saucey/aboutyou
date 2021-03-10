import { Application, Request, Response } from 'express';
const fs = require('fs');

/*
 * Since a single instance can host multiple shops (e.g http://lascana.hu/ http://lascana.sk/)
 * We need a way to distribute different sitemap and robots files for each shop
 * The solution we use is to create files with the hostname as a prefix, that way we can identify the files on both sides
 * Client and Server. Once the server gets asked for a file, it parses the requests hosturl and response with the according file
 */
const redirectToSeoFiles = (redirectUrlFolder: string, fileName: string) => async (req: Request, res: Response) => {
  let pathToFile = redirectUrlFolder + '/assets/' + fileName;
  const urlArray = req.hostname.split('.');
  const filePrefix = req.hostname.replace('https://', '').replace('http://', '');

  if (urlArray.length > 2) {
    pathToFile = redirectUrlFolder + '/assets/' + filePrefix + '_' + fileName;
  }

  try {
    if (fs.existsSync(pathToFile)) {
      res.sendFile(pathToFile);
    }
  } catch (err) {
    console.error(err);
  }
};

export function addSeoRoutes(app: Application, DIST_FOLDER: string) {
  app.get('/robots.txt', redirectToSeoFiles(DIST_FOLDER, 'robots.txt'));
  app.get('/sitemap.xml', redirectToSeoFiles(DIST_FOLDER, 'sitemap.xml'));
}
