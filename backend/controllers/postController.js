import postModel from '../models/Post.js';

export const getLastTags = async (req, res) => {
    try {
        const posts = await postModel.find().limit(5).exec();

        const tags = posts.map(obj => obj.tags).flat().slice(0, 5);

        res.json(tags);
    } catch (error) {
        console.log(error);
        res.status(500).json({
                message: 'Не удалось получить теги',
        });
    }
};

export const getAll = async (req, res) => {
    try {
        const posts = await postModel.find().populate('user').exec();

        res.json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({
                message: 'Не удалось получить статьи',
            });
    }
};

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;

        const doc = await postModel.findOneAndUpdate(
        {
            _id: postId,
        }, 
        {
            $inc: { viewsCount: 1 },
        },
        {
            returnDocument: 'after',
        }, 
        ).then((doc, err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: "Can't get article.",
                });
            }
      
            if (!doc) {
                return res.status(404).json({
                    message: "Article not found.",
                });
            }
            res.json(doc);
        })
                
    } catch (error) {
        console.log(error);
        res.status(500).json({
                message: 'Не удалось получить статьи',
            });
    }
};

export const removeOne = async (req, res) => {
    try {
        const postId = req.params.id;

        const doc = await postModel.findOneAndDelete(
        {
            _id: postId,
        }).then((doc, err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: "Не удалось удалить статью",
                });
            }
      
            if (!doc) {
                return res.status(404).json({
                    message: "Статья не найдена",
                });
            }
            res.json({
                success: true
            });
        });   
                
    } catch (error) {
        console.log(error);
        res.status(500).json({
                message: 'Не удалось получить статьи',
            });
    }
};

export const createOne = async (req, res) => {
    try {
        const doc = new postModel({
            title: req.body.title,
            text: req.body.text,
            tags: req.body.tags.split(','),
            imageUrl: req.body.imageUrl,
            user: req.userId,
        });

        const post = await doc.save();

        res.json(post);

    } catch (err) {
        console.log(err);
        res.status(500).json({
                message: 'Не удалось создать статью',
            });
    }
};

export const updateOne = async (req, res) => {
    try {
        const postId = req.params.id;

        await postModel.updateOne({
            _id: postId,
        }, {
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        });

        res.json({
            success: true,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
                message: 'Не удалось обновить статью',
            });
    }
};