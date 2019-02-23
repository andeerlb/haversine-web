import { Observable } from 'rxjs';
import { CustomDataTableColumn } from '../../models/custom-data-table-column.model';

export interface CustomDataTable {
    displayedColumns: CustomDataTableColumn[];
    getAll(): Observable<any>;
    delete(row: any): Observable<any>;
}