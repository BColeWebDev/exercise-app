const AWS = require("aws-sdk")


const imageBucket = new AWS.S3({
    signatureVersion: "v4",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION
})

const awsServices = async (image, userId) => {

    // uniquefile-name
    const imgFile = `${userId}-${image}`

    const config = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: imgFile,
        ContentType: 'multipart/form-data',
        ACL: "public-read"
    };

    const signedUrl = await imageBucket.getSignedUrl(`${userId} - avatar-img`, config)

    const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${imgFile}`


    return { signedUrl, fileUrl }
}



module.exports = awsServices