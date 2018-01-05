const { config } = require('./common')

const { apiPrefix } = config
let database = [
  {
    id: 1,
    code: "E123454",
    coverUrl: "../test/course-1.png",
    name: "C# .NET程序设计",
    courseTimes: [
      {
        startTime: "2017/10/07 10:00",
        endTime: "2017/10/07 11:30",
      }
    ],
    campusName: "闸北校区",
    classroomName: "科技楼101",
    lectureies: {
      name: "罗永浩",
      state: "无效",
    }
  },
  {
    id: 2,
    code: "E123454",
    coverUrl: "../test/course-1.png",
    name: "C# .NET程序设计",
    courseTimes: [
      {
        startTime: "2017/10/07 10:00",
        endTime: "2017/10/07 11:30",
      }
    ],
    campusName: "闸北校区",
    classroomName: "科技楼101",
    lectureies: {
      name: "罗永浩",
      state: "无效",
    }
  },
  {
    id: 3,
    code: "E123454",
    coverUrl: "../test/course-1.png",
    name: "C# .NET程序设计",
    courseTimes: [
      {
        startTime: "2017/10/07 10:00",
        endTime: "2017/10/07 11:30",
      }
    ],
    campusName: "闸北校区",
    classroomName: "科技楼101",
    lectureies: {
      name: "罗永浩",
      state: "无效",
    }
  },
  {
    id: 4,
    code: "E123454",
    coverUrl: "../test/course-1.png",
    name: "C# .NET程序设计",
    courseTimes: [
      {
        startTime: "2017/10/07 10:00",
        endTime: "2017/10/07 11:30",
      }
    ],
    campusName: "闸北校区",
    classroomName: "科技楼101",
    lectureies: {
      name: "罗永浩",
      state: "无效",
    }
  },
  {
    id: 5,
    code: "E123454",
    coverUrl: "../test/course-1.png",
    name: "C# .NET程序设计",
    courseTimes: [
      {
        startTime: "2017/10/07 10:00",
        endTime: "2017/10/07 11:30",
      }
    ],
    campusName: "闸北校区",
    classroomName: "科技楼101",
    lectureies: {
      name: "罗永浩",
      state: "无效",
    }
  },
  {
    id: 6,
    code: "E123454",
    coverUrl: "../test/course-1.png",
    name: "C# .NET程序设计",
    courseTimes: [
      {
        startTime: "2017/10/07 10:00",
        endTime: "2017/10/07 11:30",
      }
    ],
    campusName: "闸北校区",
    classroomName: "科技楼101",
    lectureies: {
      name: "罗永浩",
      state: "无效",
    }
  },
  {
    id: 7,
    code: "E123454",
    coverUrl: "../test/course-1.png",
    name: "C# .NET程序设计",
    courseTimes: [
      {
        startTime: "2017/10/07 10:00",
        endTime: "2017/10/07 11:30",
      }
    ],
    campusName: "闸北校区",
    classroomName: "科技楼101",
    lectureies: {
      name: "罗永浩",
      state: "无效",
    }
  },
  {
    id: 8,
    code: "E123454",
    coverUrl: "../test/course-2.png",
    name: "C# .NET程序设计",
    courseTimes: [
      {
        startTime: "2017/10/07 10:00",
        endTime: "2017/10/07 11:30",
      },
      {
        startTime: "2017/10/07 10:00",
        endTime: "2017/10/07 11:30",
      }
    ],
    campusName: "闸北校区",
    classroomName: "科技楼101",
    lectureies: {
      name: "罗永浩",
      state: "无效",
    }
  },
  {
    id: 9,
    code: "E123454",
    coverUrl: "../test/course-1.png",
    name: "C# .NET程序设计",
    courseTimes: [
      {
        startTime: "2017/10/07 10:00",
        endTime: "2017/10/07 11:30",
      }
    ],
    campusName: "闸北校区",
    classroomName: "科技楼101",
    lectureies: {
      name: "罗永浩",
      state: "无效",
    }
  },
  {
    id: 10,
    code: "E123454",
    coverUrl: "../test/course-1.png",
    name: "C# .NET程序设计",
    courseTimes: [
      {
        startTime: "2017/10/07 10:00",
        endTime: "2017/10/07 11:30",
      }
    ],
    campusName: "闸北校区",
    classroomName: "科技楼101",
    lectureies: {
      name: "罗永浩",
      state: "无效",
    }
  },
  {
    id: 11,
    code: "E123454",
    coverUrl: "../test/course-1.png",
    name: "C# .NET程序设计",
    courseTimes: [
      {
        startTime: "2017/10/07 10:00",
        endTime: "2017/10/07 11:30",
      }
    ],
    campusName: "闸北校区",
    classroomName: "科技楼101",
    lectureies: {
      name: "罗永浩",
      state: "无效",
    }
  },
  {
    id: 12,
    code: "E123454",
    coverUrl: "../test/course-1.png",
    name: "C# .NET程序设计",
    courseTimes: [
      {
        startTime: "2017/10/07 10:00",
        endTime: "2017/10/07 11:30",
      }
    ],
    campusName: "闸北校区",
    classroomName: "科技楼101",
    lectureies: {
      name: "罗永浩",
      state: "无效",
    }
  },
]

module.exports = {

  [`GET ${apiPrefix}/course`] (req, res) {
    const { query } = req
    let { pageSize, page, ...other } = query
    pageSize = parseInt(pageSize) || 6
    page = parseInt(page) || 1
    let totalPage = parseInt(database.length/pageSize)

    let newData = database

    res.status(200).json({
      item: newData.slice((page - 1) * pageSize, page * pageSize),
      total: newData.length,
      page: page,
      pageSize: pageSize,
      totalPage: totalPage,
    })
  },
}
