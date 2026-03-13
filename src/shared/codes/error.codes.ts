export type FrontErrorCode =
| "NETWORK_ERROR"
| "TIMEOUT_ERROR"
| "PARSE_ERROR"
| "UNKNOWN_ERROR"
| "FORBIDDEN"
| "NOT_FOUND"
| "SERVER_ERROR"

export type AppeErrorCode = FrontErrorCode | string; // string for backend codes