const mongoose = require('mongoose');
const { HttpHelper } = require('../helpers/http');
const http = new HttpHelper();
const { code, responseMsgs } = require('../helpers/constants');

const records = mongoose.model('records');

exports.fetchRecords = async (req, res) => {
  try {
    const {
      startDate, endDate, minCount, maxCount,
    } = req.body;
    const query = [
      {
        $project: {
          _id: 0,
          key: 1,
          createdAt: 1,
          totalCount: {
            $sum: '$counts',
          },
        },
      },
      {
        $match: {
          $and: [
            { createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) } },
            { totalCount: { $gt: minCount, $lt: maxCount } },
          ],
        },
      },
    ];

    const data = await records.aggregate(query);
    http.setSuccess(code.STATUS200, 0, responseMsgs.common.success, data);
    http.send(res);
  } catch (error) {
    http.setError(code.STATUS500, 1, responseMsgs.common.error);
    http.send(res);
  }
};
