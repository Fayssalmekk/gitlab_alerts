var express = require('express');
var router = express.Router();
const request = require('request');
require('dotenv').config();


let id = process.env.PROJECT_ID            /* gitlab project id  */
let token = process.env.ACCESS_TOKEN    /* gitlab token */
const alerts = [];

async function wait (ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms)
  });
}

function ToLabels(obj) {
  var labels = Object.entries(obj);
  labels = labels.map(x => x.toString().replace(",", " : "));
  return labels;

}

router.get('/', async function (req, res) {
  res.send(alerts);
  await wait(5 * 1000);
  console.log("getting");
});

router.post('/', async (req, res) => {
  alerts.push(req.body);
  

  const options = {
    url: `https://git-ps.wakanda.io/api/v4/projects/${id}/issues`,
    json: true,
    headers: {
      'PRIVATE-TOKEN': token,
    },
    body: {
      title: req.body.commonLabels.alertname,
      state: "opened",
      description: req.body.commonAnnotations.description,
      labels: ToLabels(req.body.commonLabels),
      due_date: req.body.alerts[0].startsAt 

    }
  };



  request.post(options, async (err, res, body) => {
    if (err) {
      return console.log(err);

    }
    console.log("Posted To gitlab issues")
    await wait(10 * 1000);
    console.log("posted")

  

  });
  await wait(10 * 1000);
  res.send(alerts);
  res.end;
  
  
});



module.exports = router;
