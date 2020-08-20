const express = require('express');
const { unauthorizedError, success, error } = require('../util/request-util');
const router = express.Router();

/**
 * Header: Authorization
 */
router.get('/', function(req, res, next) {
  authByJwt(({}) => {
    return Promise.resolve("hello-world").then(result => {
      res.status(200).json(success(undefined, result))
    })
  }, req, res, next)
});

/**
 * 
 * @param {*} onAuthenticated : callback when request is authenticated
 */
const authByJwt = function(onAuthenticated, req, res, next) {
  let jwtToken = req.header("Authorization")
  // verify transaction key, result is jwt payload
  let result = {}
  if (result) {
    onAuthenticated(result).catch(err => {
      console.error(err)
      res.status(500).json(error(err))
    })
  } else {
    res.status(401).json(unauthorizedError())
  }
}

module.exports = router;
