var express = require('express')
var Client = require('node-rest-client').Client
var router = express.Router()
var client = new Client()


const bosonConfig = {
  keywordsAnalysisUrl: "http://api.bosonnlp.com/keywords/analysis?top_k=3",
  timeAnalysisUrl: "http://api.bosonnlp.com/time/analysis",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "X-Token": "1uBAiWEh.18183.6NeILpXF8AOL"
  }
}

function getKeywords(words) {
  var args = {
    data: "\"" + words + "\"",
    headers: bosonConfig.headers
  }
  return new Promise(function (resolve, reject) {
    client.post(bosonConfig.keywordsAnalysisUrl, args, function (data, response) {
      resolve(data)
    })
  })
}

function getTime(words) {
  var args = {
    parameters: {
      pattern: words
    },
    headers: bosonConfig.headers
  }
  return new Promise(function (resolve, reject) {
    client.post(bosonConfig.timeAnalysisUrl, args, function (data, response) {
      resolve(data)
    })
  })

}

/* GET users listing. */
router.get('/', function (req, res, next) {
  Promise.all([getKeywords(req.query.keywords), getTime(req.query.keywords)]).then(data => {
    res.send(
      JSON.stringify(data)
    )
  })
  // getKeywords(req.query.keywords).then(function(data){
  //   console.log(res)
  //   res.send(JSON.stringify(data))
  // })
});

module.exports = router;