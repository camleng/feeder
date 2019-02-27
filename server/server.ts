import * as express from 'express';
import * as https from 'https';
import * as cors from 'cors';
import * as path from 'path';
import * as feedings from './routes/feeding.route';
import * as motor from './routes/motor.route';
import * as socket from './services/socket.service';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import * as ssl from './services/ssl.service';

dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use((req, res, next) => {
    if (!req.secure)
        res.redirect('https://' + req.headers.host + req.url);
    next();
});
app.use(express.static(path.join(__dirname, 'web')));
app.use(cors());
app.use(bodyParser.json());
app.use('/api/feedings', feedings);
app.use('/api/turn', motor)

app.get('*', (req, res) => {
    res.sendFile(path.resolve('./web/index.html'));
});

const server = https.createServer(ssl.options(), app);

socket.initServer(server);

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
