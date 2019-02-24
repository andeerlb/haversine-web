import { Observable } from 'rxjs';
import { CustomDataTableColumn } from '../../models/custom-data-table-column.model';
import { Pageable } from '../../models/pageable.model';

export interface CustomDataTable {
    displayedColumns: CustomDataTableColumn[];
    getAll(pageable: Pageable): Observable<any>;
    delete(row: any): Observable<any>;
}