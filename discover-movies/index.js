const config = require('../config');
const { discoverMovie } = require('./movieApi');

const express = require('express');

const router = express.Router();

router.post('/discover-movies', function(req, res) {
  console.log('[GET] /discover-movies');
  const kind = req.body.conversation.memory['recording'].type;

  const genreId = req.body.conversation.memory['genre'].id;

  const language = req.body.conversation.memory['language'];
  const nationality = req.body.conversation.memory['nationality'];

  const isoCode = language
    ? language.short.toLowerCase()
    : nationality.short.toLowerCase();

  return discoverMovie(kind, genreId, isoCode)
    .then(function(carouselle) {
      res.json({
        replies: carouselle,
        conversation: {
          memory: {
            'name': 'PE',
          }
        }
      });
    })
    .catch(function(err) {
      console.error('movieApi::discoverMovie error: ', err);
    });
});

module.exports = router;
