class HttpException extends Error {
    /** @type {401} */
    static UnauthorizedStatus = 401;
    /** @type {403} */
    static ForbiddenStatus = 403;
    /** @type {404} */
    static NotFound = 404;
    /**
     * @param {number} status 상태 코드
     * @param {Error['message']} message 초기화하지 않으면 기본값으로 초기화 된다.
     */
    constructor(status, message = defaultMessages[status]) {
        super(message);
        this.status = status;
        this.message = message;
    }
}

const defaultMessages = {
    [HttpException.UnauthorizedStatus]: '토큰이 유효하지 않습니다.',
    [HttpException.ForbiddenStatus]: '인가되지 않은 요청 입니다.',
    [HttpException.NotFound]: '요청한 리소스를 찾을 수 없습니다.',
};

module.exports = HttpException;
