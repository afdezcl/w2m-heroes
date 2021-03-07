import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Hero } from 'src/app/models/hero.interface';
import { HeroUpdate } from 'src/app/models/heroUpdate.interface';
import { HeroesService } from 'src/app/services/heroes/heroes.service';

@Component({
  selector: 'app-edit-hero',
  templateUrl: './edit-hero.component.html',
  styleUrls: ['./edit-hero.component.scss']
})
export class EditHeroComponent implements OnInit {

  public heroId: number;
  public hero: Hero;
  public editHeroForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.heroId = +params.get('id');
    });
  }

  ngOnInit(): void {
    this.initEditHeroForm();
    this.getHeroById();
  }

  get form(): { [key: string]: AbstractControl } {
    return this.editHeroForm.controls;
  }

  initEditHeroForm(): void {
    this.editHeroForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      imageURL: ['']
    });
  }

  getHeroById(): void {
    this.heroesService.getHeroById(this.heroId)
      .subscribe((response: Hero) => {
        this.hero = response;
        this.form.name.setValue(response.name);
        this.form.description.setValue(response.description);
        this.form.imageURL.setValue(response.imageURL);
      });
  }

  editHero(): void {
    if (this.editHeroForm.valid) {
      const heroToUpdate: HeroUpdate = {
        name: this.form.name.value.toUpperCase(),
        description: this.form.description.value,
        imageURL: this.form.imageURL.value
      };

      this.heroesService.updateHero(this.heroId, heroToUpdate)
        .subscribe(() => {
          this.router.navigateByUrl('/');
        }, (error) => this.handleEditHeroError(error));
    }
  }

  handleEditHeroError(error: HttpErrorResponse): void {
    this.toastr.error(error.message);
  }
}
