import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import {MatIconModule } from '@angular/material/icon'
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatIconModule ],
  templateUrl: './home.html',   // ✅ misma carpeta
  styleUrls: ['./home.css']     // ✅ plural y array
})
export class Home {
    displayedColumns: string[] = ['name', 'minAmount', 'category'];

  funds = [
    { name: 'FPV_BTG_PACTUAL_RECAUDADORA', minAmount: 75000, category: 'FPV' },
    { name: 'FPV_BTG_PACTUAL_ECOPETROL',   minAmount: 125000, category: 'FPV' },
    { name: 'DEUDAPRIVADA',                 minAmount: 50000,  category: 'FIC' },
    { name: 'FDO-ACCIONES',                 minAmount: 250000, category: 'FIC' },
    { name: 'FPV_BTG_PACTUAL_DINAMICA',    minAmount: 100000, category: 'FPV' }
  ];
}
