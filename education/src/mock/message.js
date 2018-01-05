const { config } = require('./common')

const { apiPrefix } = config
let database = {
  data: [
    {
      id: 1,
      name: "开启消息阅读状态,发出的消息已读未读一目了然。",
      new: true
    },
    {
      id: 2,
      name: "开启消息阅读状态,发出的消息已读未读一目了然。",
      new: true
    },
    {
      id: 3,
      name: "开启消息阅读状态,发出的消息已读未读一目了然。",
      new: false
    },
    {
      id: 4,
      name: "开启消息阅读状态,发出的消息已读未读一目了然。",
      new: false
    }
  ]
}

module.exports = {

  [`GET ${apiPrefix}/message`] (req, res) {
    res.status(200).json(database)
  },
}
