export interface PaginationResult<T> {
    data: T
    next: boolean;
    prev: boolean
}