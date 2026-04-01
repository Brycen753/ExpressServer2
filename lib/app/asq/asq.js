const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
const Like = require('../../models/Like');

// Helper Function
const send404 = (res) => res.status(404).json({ 
    code: 'NOT_FOUND', 
    message: 'Requested resource was not found' 
});

router.param('questionid', async (req, res, next, id) => {
    try {
        const post = await Post.findById(id);
        if (post && !post.reference) {
            req.asqPost = post;
            return next();
        }
        send404(res);
    } catch (err) { send404(res); }
});

router.param('answerid', async (req, res, next, id) => {
    try {
        const post = await Post.findById(id);
        if (post && post.reference) {
            req.asqPost = post;
            return next();
        }
        send404(res);
    } catch (err) { send404(res); }
});

router.route('/questions')
    .get(async (req, res, next) => {
        try {
            const questions = await Post.find({ reference: { $exists: false } })
                .select('-contents -reference');
            res.json(questions);
        } catch (err) { next(err); }
    })
    .post(async (req, res, next) => {
        try {
            const { title, contents, author } = req.body;
            const question = new Post({
                title: title || "",
                contents,
                author,
                likeCount: 0
            });
            await question.save();
            res.status(201).json(question);
        } catch (err) { next(err); }
    })
    .all((req, res) => {
        res.status(405).json({ code: 'UNSUPPORTED', message: 'Requested resource does not support this method' });
});

router.route('/questions/:questionid')
    .get((req, res) => {
        const result = req.asqPost.toObject();
        delete result.reference;
        res.json(result);
    })
    .put(async (req, res, next) => {
        try {
            const { title, contents } = req.body;
            if (title !== undefined) req.asqPost.title = title;
            if (contents !== undefined) req.asqPost.contents = contents;
            req.asqPost.edited = Date.now();
            await req.asqPost.save();
            res.json(req.asqPost);
        } catch (err) { next(err); }
});

router.route('/questions/:questionid/answers')
    .get(async (req, res, next) => {
        try {
            const answers = await Post.find({ reference: req.asqPost.id }).select('-title');
            res.json(answers);
        } catch (err) { next(err); }
    })
    .post(async (req, res, next) => {
        try {
            const { contents, author } = req.body;
            const answer = new Post({
                contents,
                author,
                reference: req.asqPost.id,
                likeCount: 0
            });
            await answer.save();
            res.status(201).json(answer);
        } catch (err) { next(err); }
    });

router.route('/answers/:answerid')
    .get((req, res) => {
        const result = req.asqPost.toObject();
        delete result.title;
        res.json(result);
    })
    .put(async (req, res, next) => {
        try {
            if (req.body.contents !== undefined) req.asqPost.contents = req.body.contents;
            req.asqPost.edited = Date.now();
            await req.asqPost.save();
            res.json(req.asqPost);
        } catch (err) { next(err); }
    });

router.get('/likes/:postid', async (req, res, next) => {
    try {
        const likes = await Like.find({ post: req.params.postid });
        res.json(likes.map(l => l.user));
    } catch (err) { next(err); }
});

router.get('/likes/:postid/:username', async (req, res, next) => {
    try {
        const exists = await Like.exists({ post: req.params.postid, user: req.params.username });
        res.json(!!exists);
    } catch (err) { next(err); }
});

router.post('/likes/:postid/:username', async (req, res, next) => {
    try {
        const like = new Like({ post: req.params.postid, user: req.params.username });
        try {
            await like.save();
            // Only increment if creation succeeded
            await Post.updateOne({ _id: req.params.postid }, { $inc: { likeCount: 1 } });
        } catch (err) {
            if (err.name !== "MongoServerError" || err.code !== 11000) throw err;
        }
        res.json(true);
    } catch (err) { next(err); }
});

router.delete('/likes/:postid/:username', async (req, res, next) => {
    try {
        const { deletedCount } = await Like.deleteOne({ 
            post: req.params.postid, 
            user: req.params.username 
        });
        if (deletedCount > 0) {
            // Only decrement if a document was actually removed
            await Post.updateOne({ _id: req.params.postid }, { $inc: { likeCount: -1 } });
        }
        res.json(false);
    } catch (err) { next(err); }
});

module.exports = router;