import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgChartsModule} from 'ng2-charts';
import { HttpClient } from '@angular/common/http';
import { ChartConfiguration,ChartOptions } from 'chart.js';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-monthly-bar-chart',
  standalone: true,
  imports: [CommonModule, NgChartsModule, RouterModule],
  templateUrl: './monthly-bar-chart.component.html',
  styleUrls: ['./monthly-bar-chart.component.scss']
})
export class MonthlyBarChartComponent implements OnInit {
  barChartLabels: string[] = [];
  barChartData: ChartConfiguration<'bar'>['data']['datasets']=[{
    data: [],
    label: 'Avg Close Price (₹)',
    backgroundColor: '#2980b9',
    hoverBackgroundColor: '#1c5980',
    borderRadius: 6
  }]
  barChartOptions: ChartOptions<'bar'>={
    responsive: true,
    scales:{
      y:{
        beginAtZero: true,
        ticks:{
          color: '#34495e'
        },
        title:{
          display: true,
          text: '₹ Average Close',
          color: '#2c3e50'
        }
      },
      x:{
        ticks:{
          color: '#34495e'
        },
        title:{
          display:true,
          text: 'Month',
          color: '#2c3e50'
        }
      }
    },
    plugins:{
      legend:{
        labels:{
          color: '#2c3e50'
        }
      },
      tooltip:{
        callbacks:{
          label: context=>`₹ ${context.raw}`
        }
      }
    }
  };
  constructor(private http: HttpClient,private auth: AuthService){}
  ngOnInit(): void {
    if(!this.auth.isLoggedIn()){
      this.auth.logout();
      return;
    }
    this.http.get<any[]>('http://localhost:3000/sensex/monthly-averages')
    .subscribe(data=>{
      this.barChartLabels=data.map(d=>d.month);
      this.barChartData[0].data=data.map(d=>d.avgClose);
    })
  }

}