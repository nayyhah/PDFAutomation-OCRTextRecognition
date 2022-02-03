const auth = require("../middleware/auth")()
    // const { Query } = require("mongoose");
const { spawn } = require('child_process');
const Query = require("../models/queries")
const User = require("../models/user")
const _ = require("lodash");
const bbPromise = require('bluebird');
const { cloudinary } = require('../cloudinary')
    // require(")
    // const { PythonShell } = require('python-shell');
    // const imageToBase64 = require('image-to-base64');
    // let fs = require("fs

exports.secureparser = async(req, res) => {
    // console.log("here")
    // console.dir(req.body)
    const user = req.user;
    const templateID = req.body.templateid;
    const timestamp = new Date()
        // const options = req.body.options;
    const query = new Query({
        timestamp,
        templateID
        // options
    })
    query.parsed = req.files.map(f => ({ url: f.path, filetype: f.mimetype, document: {} }));
    if (!query.parsed[0]) {
        return res.json({ "msg": "No files Attached" })
    }

    // console.dir(query.parsed[0])
    let finalout = []
        // const promises = []

    function create_process(file) {
        return new bbPromise((resolve, reject) => {
            // console.dir(query.templateID)
            // console.dir(file)
            var c_process = spawn('python', ["./pythonCode/main.py",
                file.path,
                file.mimetype,
                query.templateID
            ])

            c_process.stdout.on('data', data => {
                // console.log(data.toString())
                // console.log(data.toString())
                try {
                    out = JSON.parse(data.toString())
                    finalout.push(out)
                } catch (e) {
                    console.log(data.toString())
                }
            })

            c_process.stderr.on('data', function(err) {
                // console.log(err.toString())
                reject(err.toString());
            });
            // promises.push(c_process)
            c_process.on('close', () => {
                resolve()
            });
        })
    }


    bbPromise.map(req.files, (file) => {
        return create_process(file)
    }).then(() => {
        res.json(finalout)
        for (let i = 0; i < req.files.length; i++)
            query.parsed[i].document = finalout[i];

        user.queries.push(query.id);
        user.save()
        query.save()
    })
}
exports.allQueries = async(req, res) => {

    await req.user.populate({ path: 'queries' });
    res.json(req.user.queries)
}


exports.nosaveparser = async(req, res) => {
    const templateID = req.body.templateid;
    if (req.files.length == 0) {
        res.json({ "msg": "No files Attached" })
    }
    // console.dir(query.parsed[0])
    // console.dir(req.files)

    // console.dir(query.parsed[0])
    let finalout = []
        // const promises = []

    function create_process(file) {
        return new bbPromise((resolve, reject) => {
            // console.dir(query.templateID)
            // console.dir(file)
            var c_process = spawn('python', ["./pythonCode/main.py",
                file.path,
                file.mimetype,
                templateID
            ])

            c_process.stdout.on('data', data => {
                // console.log(data.toString())
                // console.log(data.toString())

                // out = JSON.parse(data.toString())
                // finalout.push(out)
                try {
                    out = JSON.parse(data.toString())
                    finalout.push(out)
                    cloudinary.uploader.destroy(file.filename)
                } catch (e) {
                    console.log("Invalid JSON")
                    console.log(e)
                }
            })

            c_process.stderr.on('data', function(err) {
                // console.log(err.toString())
                reject(err.toString());
            });
            // promises.push(c_process)
            c_process.on('close', () => {
                resolve()
            });
        })
    }


    bbPromise.map(req.files, (file) => {
        return create_process(file)
    }).then(() => {
        res.json(finalout)
    })

}
exports.refinedSearch = async(req, res) => {
    const {
        options,
        queryid,
    } = req.body
    const query = await Query.findById(queryid)
    let output = []
    let parsed = {}
    for (doc in query.parsed) {
        if (doc.isparsed == false) {
            continue;
        }
        parsed = doc.document;
        for (opt in options) {
            _.get(parsed, opt)
        }

    }


}

exports.deleteQuery = async(req, res) => {
    const { queryid } = req.body;
    console.log(queryid)
    await User.findByIdAndUpdate(req.user.id, { $pull: { queries: queryid } })
    await Query.findByIdAndDelete(queryid);
    res.send('Deleted');
}