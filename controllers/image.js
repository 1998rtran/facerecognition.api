const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '86e709d268d3427693d7658ae68ed665'
   });

   const handleApiCall = (req, res) => {
   app.models.predict(
 // .predict('53e1df302c079b3db8a0a36033ed2d15', this.state.input)
     Clarifai.FACE_DETECT_MODEL, req.body.input)
     .then(data => {
        res.json(data);
     })
   .catch(err => res.status(400).json('unable to work with API'))
    }

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries);
    })
    .catch(err => res.status(400).json('unable to get entries'))
    }
    
    module.exports = {
        handleImage: handleImage,
        handleApiCall: handleApiCall
    }