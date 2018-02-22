/**
 * Created by vijay on 2018/2/22.
 */
import Express from 'express';
import Article from '../../models/article';
import {responseClient} from '../util';

const router = Express.Router();

router.post('/addArticle', function (req, res) {
    const {
        title,
        content,
        time,
        tags,
        isPublish
    } = req.body;
    const author = req.session.userInfo.username;
    const coverImg = `/${Math.round(Math.random() * 9 + 1)}.jpg`;
    const viewCount = 0;
    const commentCount = 0;
    let tempArticle = new Article({
        title,
        content,
        isPublish,
        viewCount,
        commentCount,
        time,
        author,
        coverImg,
        tags: tags.split(',')
    });
    tempArticle.save().then(data => {
        responseClient(res, 200, 0, '保存成功', data);
    }).cancel(err=>{
        console.error(err);
        responseClient(res);
    })
});

module.exports = router;
