import { GlobalService } from '../../services/global.service';
import { NotificationModel } from '../../models/notification-model';

export class RootComponent {
    constructor(public _globalService: GlobalService) { }

    alertMessage(data: NotificationModel) {
        console.log(data);
    }
}

