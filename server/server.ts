import * as express from 'express';
import * as http from 'http';
import * as cors from 'cors';
import * as path from 'path';
import * as feedings from './routes/feedings';
import * as motor from './routes/motor';
import { initializeWebSocketServer } from './services/socket';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';

dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use(express.static(path.join(__dirname, 'web')));
app.use(cors());
app.use(bodyParser.json());
app.use('/api/feedings', feedings);
app.use('/turn', motor)

app.get('*', (req, res) => {
    res.sendFile(path.resolve('./web/index.html'));
});

const server = http.createServer(app);
initializeWebSocketServer(server);

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
