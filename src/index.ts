import express, { Request, Response } from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Chào mừng bạn đến với API sử dụng TypeScript và Express!, Hello Team-Backend');
});

app.get('/api/test', (req: Request, res: Response) => {
  const data = {
    message: 'Dữ liệu test từ API TypeScript',
    timestamp: new Date().toISOString()
  };
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server đang chạy trên cổng ${port}`);
});
