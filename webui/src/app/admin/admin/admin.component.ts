import { Component, OnInit } from '@angular/core';
import { LogService } from '../../services/log.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  logs: any[];

  constructor(
    private logService: LogService) { }

  ngOnInit() {
    this.logService.getLogs()
      .subscribe(x => this.logs = x)
  }

}
