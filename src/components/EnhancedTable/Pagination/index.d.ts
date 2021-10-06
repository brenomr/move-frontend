export type IOnChangePageEvent = React.MouseEvent<HTMLButtonElement, MouseEvent> | null


export interface IPagination {
    quantityOfRows: number[];
    component: string;
    count: number,
    rowsPerPage: number,
    page: number,
    onChangePage: (event: IOnChangePageEvent, newPage: number) => void,
    onChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void,
}