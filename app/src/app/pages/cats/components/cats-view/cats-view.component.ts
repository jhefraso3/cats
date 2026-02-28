import { Component, OnInit } from "@angular/core";
import { CatsService } from "../../services/cats.service";
import { Breed } from "../../types/breed.type";
import { FormControl } from "@angular/forms";
import { map, Observable, startWith, Subscription } from "rxjs";
import { Image } from "../../types/image.type";
import { SnackbarService } from "src/app/pages/components/snackbar/service/snackbar.service";
import { SnackbarType } from "src/app/pages/components/snackbar/models/snackbar-type";
import { LoginService } from "src/app/pages/login/services/login.service";
import { ImagesService } from "../../services/images.service";
import { CATS_MESSAGES } from "../../constants/cats-messages.constants";

@Component({
  selector: "app-cat",
  templateUrl: "./cats-view.component.html",
  styleUrls: ["./cats-view.component.scss"],
  standalone: false,
})
export class CatsViewComponent implements OnInit {
  subscription$: Subscription[] = [];
  breedsControl = new FormControl<string | Breed>("");
  breedsList!: Breed[];
  filteredBreeds!: Observable<Breed[]>;
  breeds: Breed[] = [];
  selectedBreed?: Breed | null;
  breedsFormControl = new FormControl<string | Breed>("");
  images: Image[] = [];

  constructor(
    private catsService: CatsService,
    private imagesService: ImagesService,
    private loginService: LoginService,
    private snackBar: SnackbarService,
  ) {}

  ngOnInit() {
    this.loginService.token$.subscribe((token) => {
      if (token) {
        this.getBreeds();
      }
    });
  }

  getBreeds() {
    this.catsService.getBreeds().subscribe({
      next: (breedsList) => {
        this.breedsList = breedsList;
        this.initializeFilterBreeds();
      },
      error: (err) => {
        this.snackBar.openCustomSnackbar(
          err.console.error() || CATS_MESSAGES.ERROR.GET_BREEDS,
          SnackbarType.error,
        );
      },
    });
  }

  initializeFilterBreeds() {
    this.filteredBreeds = this.breedsControl.valueChanges.pipe(
      startWith(""),
      map((value) => {
        const name = typeof value === "string" ? value : value?.name;
        return name
          ? this._filterBreeds(name as string)
          : this.breedsList.slice();
      }),
    );
  }

  private _filterBreeds(value: string): Breed[] {
    const filterValue = value.toLowerCase();
    return this.breedsList.filter((b) =>
      b.name.toLowerCase().includes(filterValue),
    );
  }

  displayBreeds(breed: Breed): string {
    return breed && breed.name ? breed.name : "";
  }

  onBreedSelected(breed: Breed) {
    this.imagesService.getImagesByBreed(breed.id).subscribe({
      next: (res) => {
        this.images = res;
        this.selectedBreed = this.breedsList.find((b) => b.id === breed.id);
      },
      error: (err) => {
        this.snackBar.openCustomSnackbar(
          err.console.error() || CATS_MESSAGES.ERROR.GET_IMAGES,
          SnackbarType.error,
        );
      },
    });
  }

  clear() {
    this.breedsControl.patchValue("");
    this.selectedBreed = null;
    this.images = [];
  }
}
