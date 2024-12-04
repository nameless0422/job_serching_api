// 글로벌 에러 핸들러
exports.globalErrorHandler = (err, req, res, next) => {
    // HTTP 상태 코드 (기본값: 500)
    const statusCode = err.status || 500;

    // 응답 데이터
    const response = {
        status: 'error',
        message: err.message || 'Internal Server Error',
        code: err.code || 'INTERNAL_SERVER_ERROR',
    };

    // 개발 환경에서 추가 디버깅 정보 제공
    if (process.env.NODE_ENV === 'development') {
        response.stack = err.stack;
    }

    res.status(statusCode).json(response);
};

// 404 에러 처리
exports.notFoundHandler = (req, res, next) => {
    res.status(404).json({
        status: 'error',
        message: 'Resource not found',
        code: 'NOT_FOUND',
    });
};
