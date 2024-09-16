import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './api.service';

export interface BudgetItem {
  category: string;
  amount: number;
  date: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['category', 'amount', 'date'];
  dataSource: BudgetItem[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getData().subscribe((response: BudgetItem[]) => {
      this.dataSource = response;
    });
  }
}