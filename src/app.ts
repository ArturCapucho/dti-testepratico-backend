import express, { Request, Response } from 'express';
import {calculateBestPriceByDay} from './utils/priceutils';

const app = express();
const PORT = process.env.PORT || 3001;

app.get('/bestprice', (req: Request, res: Response) => {
    const { date, smallDogs, bigDogs } = req.query;
  
    if (typeof date !== 'string' || isNaN(Number(smallDogs)) || isNaN(Number(bigDogs))) {
      res.status(400).send('Invalid parameters');
      return;
    }
  
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      res.status(400).send('Invalid date format');
      return;
    }
    
    const bestPrice = calculateBestPriceByDay(parsedDate.getDay(), Number(smallDogs), Number(bigDogs));

    res.json({
        bestPrice: bestPrice
    });
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});