const PORT = process.env.PORT||8000;

const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const articles = [];
const app = express();

const newspapers=[{
    name:'gaurdian',
    address:'view-source:https://www.theguardian.com/world/ukraine'
    },
    {
        name:''
    }
]


app.get('/', (req, res) => {
    res.json('Welcome to my Ukraine News API');
});

app.get('/news', (req, res) => {
    axios.get('https://www.theguardian.com/world/volodymyr-zelenskiy')
        .then((response) => {
            const html = response.data;
            const $ = cheerio.load(html);

            $('a[aria-label*="Zelenskiy"]', html).each(function () {
                const title = $(this).attr('aria-label');
                const url = $(this).attr('href');
                articles.push({
                    title,
                    url
                });
            });
            res.json(articles);
        }).catch((err) => console.log(err));
});

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
