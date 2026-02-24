import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { CatsService } from "../../services/cats.service";
import { Breed } from "../../types/breed.type";
import { FormControl } from "@angular/forms";
import { Observable, Subscription } from "rxjs";
import { AuthService } from "src/app/features/auth/services/auth.service";
import { Image } from "../../types/image.type";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { SnackbarService } from "src/app/core/components/snackbar/service/snackbar.service";
import { SnackbarType } from "src/app/core/components/snackbar/models/snackbar-type";

@Component({
  selector: "app-cats-table",
  standalone: false,
  templateUrl: "./cats-table.component.html",
  styleUrl: "./cats-table.component.scss",
})
export class CatsTableComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  breedsList!: Breed[];
  displayedColumns: string[] = ["name", "origin", "temperament"];
  dataSource = new MatTableDataSource<Breed>();

  constructor(
    private catsService: CatsService,
    private authService: AuthService,
    private snackBar: SnackbarService
  ) {}

  ngOnInit() {
    this.authService.token$.subscribe((token) => {
      if (token) {
        this.getBreeds();
      }
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getBreeds() {
    this.catsService.getBreeds().subscribe({
      next: (breedsList) => {
        this.dataSource.data = breedsList;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        this.snackBar.openCustomSnackbar(
          'Ocurrió un error al cargar las razas.',
          SnackbarType.error,
        );
      }
    });
  }

  applyTableFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();
  }
}
