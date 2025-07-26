const express = require('express');
const { status } = require('minecraft-server-util');

const app = express();
const PORT = 3000;

const MC_HOST = '212.21.15.122';
const MC_PORT = 10000;

let lastStatus = null;

async function updateStatus() {
    try {
        lastStatus = await status(MC_HOST, MC_PORT, { timeout: 1000 });
    } catch (e) {
        lastStatus = { online: false, error: e.message };
    }
}

setInterval(updateStatus, 1000);
updateStatus();

app.get('/api/status', (req, res) => {
    res.json(lastStatus);
});

app.listen(PORT, () => {
    console.log(`Server status API running on http://localhost:${PORT}`);
});
