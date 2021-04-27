//// Core modules

//// External modules
const express = require('express');
const axios = require('axios')
const lodash = require('lodash')
//// Modules
const animeApi = require('./../animeApi')

let router = express.Router();


router.get('/', async (req, res, next) => {
    try {
        res.render('pages/home.html', {

        })
    } catch (error) {

    }
})

router.get('/anime/:listId', async (req, res, next) => {
    try {
        let listId = req.params.listId

        let response = await animeApi.get(`/anime/${listId}?include=mediaRelationships,categories,mappings,animeProductions,animeStaff,streamingLinks`)
        let anime = response.data.data
        // let episodes = response.data.data.relationships.episodes.data
        // // let episodes = lodash.filter(response.data.included, (data) => data.type === 'episodes')

        // // Initialize Promiser
        // let promises = [];
        // let result

        // // //Get Episodes
        // episodes.pop()
        // lodash.each(episodes, async (episode) => {
        //     promises.push(animeApi.get(`/episodes/${episode.id}`))
        // })
        // result = await Promise.all(promises)
        // //Map Episodes Data
        // episodes = lodash.map(result, (episode, index) => episode.data.data)
        // //Remove Episode that has no data
        // episodes = lodash.filter(episodes, (episode) => episode.attributes.canonicalTitle)
        res.render('pages/anime-read.html', {
            anime: anime,
        })


    } catch (err) {
        next(err);
    }
});

module.exports = router;