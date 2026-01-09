import { Component, OnInit, signal } from '@angular/core';
import { StudentService } from '../services/student.service';
import { CommonModule } from '@angular/common';

interface DashboardStats {
  total: number;
  certified: number;
  completed: number;
  active: number;
  feesCollected: number;
  feesPending: number;
  totalRevenue: number;
  studentsWithFeesPending: number;
  studentsWithFeesSubmitted: number;
}
@Component({
  selector: 'app-dashboard',
  imports: [CommonModule ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
stats = signal<DashboardStats | null>(null);
  isLoading = signal(true);
  error = signal<string | null>(null);
  
  // Computed percentages
  get certificationRate(): number {
    const s = this.stats();
    return s && s.total > 0 ? Math.round((s.certified / s.total) * 100) : 0;
  }
  
  get completionRate(): number {
    const s = this.stats();
    return s && s.total > 0 ? Math.round((s.completed / s.total) * 100) : 0;
  }
  
  get activeRate(): number {
    const s = this.stats();
    return s && s.total > 0 ? Math.round((s.active / s.total) * 100) : 0;
  }
  
  get feesCollectionRate(): number {
    const s = this.stats();
    return s && s.totalRevenue > 0 
      ? Math.round((s.feesCollected / s.totalRevenue) * 100) 
      : 0;
  }
  
  constructor(private studentService: StudentService) {}
  
  ngOnInit(): void {
    this.loadDashboard();
  }
  
  loadDashboard(): void {
    this.isLoading.set(true);
    this.error.set(null);
    
    this.studentService.getDashboardStats().subscribe({
      next: (response) => {
        this.stats.set(response.stats);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Dashboard error:', err);
        this.error.set('Failed to load dashboard data');
        this.isLoading.set(false);
      }
    });
  }
  
  refresh(): void {
    this.loadDashboard();
  }
  
  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  }
}
