const AWS = require("aws-sdk");
const DOMAIN = "https://remotecompany.s3.amazonaws.com/";
const s3 = new AWS.S3({
	accessKeyId: process.env.AWS_ACCESS_KEY,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const uploadFile = (fileUpload, fileName, contentType, contentEncoding) => {
	const params = {
		Bucket: process.env.AWS_3S_BUCKET_NAME || "jobproject",
		Key: `${fileName}`,
		Body: fileUpload,
        ContentType: contentType,
        ContentEncoding: contentEncoding,
		ACL: "public-read",
	};

	return new Promise((resolve, rejects) => {
		s3.upload(params, (err, data) => {
			if (err) {
                console.log("Upload file err", err);
                rejects(err)
			}

			resolve(data.Location);
		});
	});
};

const deleteFile = (fileName) => {
	const params = {
		Bucket: process.env.AWS_3S_BUCKET_NAME || "jobproject",
		Key: fileName.replace(DOMAIN, ""),
	};

	new Promise((resolve, rejects) => {
		s3.deleteObject(params, (err, data) => {
			if (err) console.log(err, err.stack);
			// an error occurred
			else console.log(data);
		});
	});
};

module.exports = {
    uploadBase64Image,
	uploadFile,
	deleteFile
};