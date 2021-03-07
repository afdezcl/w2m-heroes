import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Hero } from 'src/app/models/hero.interface';
import { HeroesService } from 'src/app/services/heroes/heroes.service';

@Component({
  selector: 'app-add-hero',
  templateUrl: './add-hero.component.html',
  styleUrls: ['./add-hero.component.scss']
})
export class AddHeroComponent implements OnInit {

  public hero: Hero;
  public addHeroForm: FormGroup;
  public imageURL: string;

  constructor(
    private formBuilder: FormBuilder,
    private heroesService: HeroesService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.initEditHeroForm();
  }

  get form(): { [key: string]: AbstractControl } {
    return this.addHeroForm.controls;
  }

  initEditHeroForm(): void {
    this.addHeroForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      imageURL: ['']
    });
  }

  addHeroAttempt(): void {
    if (this.addHeroForm.valid) {
      const hero: Hero = {
        id: Math.floor(Math.random()), // In a real APP, this id must be generate by the API (Backend)
        name: this.form.name.value.toUpperCase(),
        description: this.form.description.value,
        imageURL: this.form.imageURL.value
      };

      this.heroesService.addHero(hero)
        .subscribe(() => {
          this.router.navigateByUrl('');
        }, (error) => this.handleAddHeroError(error));
    }
  }

  handleAddHeroError(error: HttpErrorResponse): void {
    this.toastr.error(error.message);
  }
}
