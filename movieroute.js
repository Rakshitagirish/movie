const express = require('express');
const router = express.Router();
const Movie = require('../models/movieModel');

// Create a new movie (POST)
router.post('/movies', async (req, res) => {
    try {
        const movie = new Movie(req.body);
        await movie.save();
        res.status(201).send(movie);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Get all movies (GET)
router.get('/movies', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).send(movies);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Get a movie by ID (GET)
router.get('/movies/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).send('Movie not found');
        res.status(200).send(movie);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Update a movie by ID (PUT)
router.put('/movies/:id', async (req, res) => {
    try {
        const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!movie) return res.status(404).send('Movie not found');
        res.status(200).send(movie);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Delete a movie by ID (DELETE)
router.delete('/movies/:id', async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);
        if (!movie) return res.status(404).send('Movie not found');
        res.status(200).send('Movie deleted');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
