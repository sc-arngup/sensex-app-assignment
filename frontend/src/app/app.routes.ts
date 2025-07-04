import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { MonthlyBarChartComponent } from './components/monthly-bar-chart/monthly-bar-chart.component';
export const routes: Routes = [{path: '',redirectTo: '/login',pathMatch: 'full'},
    {path: 'login',component: LoginComponent},
    {path: 'home',component: HomeComponent},
    {path: 'chart',component: MonthlyBarChartComponent}
];
