var express = require('express');
var router = express.Router();
const request = require('request');

const alerts= [];



router.get('/', function(req, res) {
  res.send(alerts);
  console.log("getting");	
});

router.post('/', function(req, res) {
  alerts.push(req.body);	 
  res.send(alerts);
  console.log(req.body.labels)
  console.log(req.body)

  let id = "25039571"
  const options = {
    url: `https://gitlab.com/api/v4/projects/${id}/issues`,
    json: true,
    headers: {
      'PRIVATE-TOKEN': 'glpat-tiZC1JXVTo_U32LBoKUp',
    },
    body: {
      title: req.body.commonLabels.alertname,
      state: "opened",
      description: req.body.commonAnnotationsdescription,
      issue_type : "incident",
      labels:  req.body.commonLabels.instance

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
