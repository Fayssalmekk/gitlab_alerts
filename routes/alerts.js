var express = require('express');
var router = express.Router();
const request = require('request');
require('dotenv').config();


let id = process.env.PROJECT_ID            /* gitlab project id  */
let token = process.env.ACCESS_TOKEN    /* gitlab token */
const alerts= [];


function ToLabels(obj) {
  var labels = Object.entries(obj );
  labels = labels.map(x => x.toString().replace(",", " : ")   );
  return labels;

}

router.get('/', function(req, res) {
  res.send(alerts);
  console.log("getting");	
});

router.post('/', function(req, res) {
  alerts.push(req.body);	 
  res.send(alerts);
  
  console.log(req.body.alerts)

  
  const options = {
    url: `https://git-ps.wakanda.io/api/v4/projects/${id}/issues`,
    json: true,
    headers: {
      'PRIVATE-TOKEN': token,
    },
    body: {
      title: req.body.alerts[0].labels.alertname,
      state: "opened",
      description: req.body.alerts[0].annotations.description,
      /*issue_type : "",*/
      labels:  ToLabels(req.body.alerts[0].labels),
      due_date: req.body.alerts[0].startsAt

    }
  };

  request.post(options, (err, res, body) => {
    if (err) {
      return console.log(err);
    }
    console.log("Posted To gitlab issues")
  });


  console.log("posted")
});

router.put('/', function(req, res) {
  res.send(res);
});

router.delete('/', function(req, res) {
  res.send(204);
});

module.exports = router;
