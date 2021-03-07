import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { async, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AddHeroComponent } from './add-hero.component';
import { LoaderModule } from '../loader/loader.module';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Hero } from 'src/app/models/hero.interface';

const toastrService = {
    error: (
        message?: string,
        title?: string,
        override?: any
    ) => { },
};

describe('AddHeroComponent', () => {
    let component: AddHeroComponent;
    let fixture: ComponentFixture<AddHeroComponent>;
    let addHeroForm;
    let compiled;
    let heroesServiceMock;
    let routerMock;
    let formBuilderMock;
    let toastMock;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [AddHeroComponent],
            imports: [
                FormsModule,
                RouterTestingModule.withRoutes([]),
                ReactiveFormsModule,
                HttpClientModule,
                LoaderModule,
                MatInputModule,
                MatButtonModule,
                BrowserAnimationsModule
            ],
            providers: [
                { provide: ToastrService, useValue: toastrService },
                LoaderService
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddHeroComponent);

        heroesServiceMock = {
            addHero: jest.fn()
        };

        routerMock = {
            navigateByUrl: jest.fn()
        };

        toastMock = toastrService;
        formBuilderMock = new FormBuilder();

        component = new AddHeroComponent(
            formBuilderMock,
            routerMock,
            heroesServiceMock,
            toastMock
        );

        component = fixture.componentInstance;
        fixture.detectChanges();
        addHeroForm = component.addHeroForm.controls;
        compiled = fixture.debugElement.nativeElement;

    });

    describe('Test: ngOnInit', () => {
        it('Should be initialized and call initEditHeroForm', () => {
            fixture.detectChanges();
            expect(fixture).toBeTruthy();
            const initEditHeroFormSpy = jest.spyOn(component, 'initEditHeroForm');
            component.ngOnInit();
            expect(initEditHeroFormSpy).toBeCalled();
        });
    });

    describe('Test: addHeroForm', () => {
        it('Should initialize addHeroForm', () => {
            const hero = {
                name: '',
                description: '',
                imageURL: ''
            };
            expect(component.addHeroForm.value).toEqual(hero);
        });

        it('Should invalidate the form', () => {
            addHeroForm.name.setValue('');
            addHeroForm.description.setValue('');
            expect(component.addHeroForm.valid).toBeFalsy();
            expect(compiled.querySelector('button[type="submit"]').disabled).toBe(true);
        });

        it('Should validate the form', () => {
            addHeroForm.name.setValue('superman');
            addHeroForm.description.setValue('this is a short description');
            expect(component.addHeroForm.valid).toBeTruthy();
            fixture.detectChanges();
            expect(compiled.querySelector('button[type="submit"]').disabled).toBe(false);
        });
    });

    describe('Test: addHeroAttempt()', () => {
        it('Should NOT call register of authentication Service', () => {
            addHeroForm.name.setValue('');
            addHeroForm.description.setValue('');

            component.addHeroAttempt();

            expect(heroesServiceMock.addHero).not.toHaveBeenCalled();
        });

        it('Should call addHero of heroes Service', () => {
            addHeroForm.name.setValue('superman');
            addHeroForm.description.setValue('this is a short description');
            const hero: Hero = {
                id: 1,
                name: addHeroForm.name.value,
                description: addHeroForm.description.value,
                imageURL: addHeroForm.imageURL.value
            };

            const addHeroSpy = jest.spyOn(heroesServiceMock, 'addHero').mockReturnValue(true);

            component.addHeroAttempt();

            expect(heroesServiceMock.addHero(hero)).toEqual(true);
            expect(addHeroSpy).toHaveBeenCalledWith(hero);
        });

        it('Should call addHero of heroes Service but with an error response', () => {
            addHeroForm.name.setValue('superman');
            addHeroForm.description.setValue('this is a short description');

            const error: HttpErrorResponse = {
                status: 409,
                message: 'Hero already exists.'
            } as HttpErrorResponse;

            const handleAddHeroErrorSpy = jest.spyOn(component, 'handleAddHeroError');
            jest.spyOn(heroesServiceMock, 'addHero').mockReturnValue(throwError(error));

            component.addHeroAttempt();
            expect(handleAddHeroErrorSpy);
        });

    });

});
