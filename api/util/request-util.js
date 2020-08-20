const unauthorizedError = function() {
    return error("unauthorize")
}

const error = function (message) {
    return response(false, message)
}

const success = function (message = "success", data) {
    return response(true, message, data)
}

const response = function (success, message, data) {
    return {
        success: success,
        message: message,
        data: data
    }
}

module.exports = {
    error,
    unauthorizedError,
    response,
    success,
}