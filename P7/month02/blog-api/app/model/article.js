module.exports = app => {
    let mongoose = app.mongoose;
    let Schema = mongoose.Schema;
    let ObjectId = Schema.Types.ObjectId;
    let ArticleSchema = new Schema({
        title: { type: String, required: true },    // 标题
        content: { type: String, required: true },  // 正文
        user: {                                     // 用户作者
            type: ObjectId,
            ref: 'User'
        },
        pv: { type: Number, default: 0 },           // page view 页面的访问量
        comments: [                                 // 评论
            { user: { type: ObjectId, ref: 'User' }, content: String }
        ],
        createAt: { type: Date, default: Date.now } // 创建时间，默认为当前时间
    });

    return mongoose.model('Article', ArticleSchema);
}