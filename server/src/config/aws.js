const S3 = require("aws-sdk/clients/s3")
const fs = require("fs")
const util = require("util")
const unlinkFile = util.promisify(fs.unlink)

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_KEY


const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
})

// uploads file to S3
async function uploadFile(file) {
    // creates file stream
    const fileStream = fs.createReadStream(file.path)

    // upload params
    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename
    }
    // returns an upload promise
    return s3.upload(uploadParams).promise()
}
exports.uploadFile = uploadFile

// downloads file to S3
async function getFileStream(filekey) {
    const downloadParams = {
        Key: filekey,
        Bucket: bucketName
    }
    return s3.getObject(downloadParams).createReadStream()

}
exports.getFileStream = getFileStream

// Deletes Avatar
async function removeAvatar(filekey) {
    const removeParams = {
        Key: filekey,
        Bucket: bucketName
    }
    return s3.deleteObject(removeParams).promise()
}
exports.removeAvatar = removeAvatar


// Remove uploads from server
async function removeFile(path) {
    return unlinkFile(path)
}
exports.removeFile = removeFile

