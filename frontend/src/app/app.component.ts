import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  imports: [CommonModule, FormsModule]
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['category', 'amount', 'date'];
  dataSource: BudgetItem[] = [];
  totalSavings: number = 0;
  totalSpendings: number = 0;
  newSpending: BudgetItem = { category: '', amount: 0, date: '' };

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getData().subscribe((response: BudgetItem[]) => {
      this.dataSource = response;
      this.calculateTotals();
    });
  }

  calculateTotals(): void {
    this.totalSpendings = this.dataSource.reduce((acc, item) => acc + item.amount, 0);
    // Assuming totalSavings is calculated based on some logic, for now, setting it to a static value
    this.totalSavings = 1000 - this.totalSpendings; // Example logic
  }

  addSpending(): void {
    this.dataSource.push({ ...this.newSpending });
    this.calculateTotals();
    this.newSpending = { category: '', amount: 0, date: '' };
  }
}