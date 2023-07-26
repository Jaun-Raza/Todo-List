import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


var itemsArr = [];

function todoItem(req, res, next) {

    const itemName = req.body['itemInput'];

    if (itemName) {
        itemsArr.push(itemName);
    }
    
    if(itemName === "clear" || itemName === "Clear") {
        itemsArr = [];
    }

    next();

}

app.use(todoItem);

app.get('/', (req, res) => {
    res.render('today.ejs', { itemsArr });
})

app.post('/', (req, res) => {
    res.redirect('/');
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
})