import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { CatsService } from "../../services/cats.service";
import { Breed } from "../../types/breed.type";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { SnackbarService } from "src/app/pages/components/snackbar/service/snackbar.service";
import { SnackbarType } from "src/app/pages/components/snackbar/models/snackbar-type";
import { LoginService } from "src/app/pages/login/services/login.service";

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
    private loginService: LoginService,
    private snackBar: SnackbarService
  ) {}

  ngOnInit() {
    this.loginService.token$.subscribe((token) => {
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
