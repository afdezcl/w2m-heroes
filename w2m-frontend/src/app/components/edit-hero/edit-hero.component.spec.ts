import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService } from 'ngx-toastr';
import { LoaderModule } from '../loader/loader.module';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Hero } from 'src/app/models/hero.interface';
import { EditHeroComponent } from './edit-hero.component';
import { ActivatedRoute } from '@angular/router';
import { HeroUpdate } from 'src/app/models/heroUpdate.interface';
import { of, throwError } from 'rxjs';

const toastrService = {
    error: (
        message?: string,
        title?: string,
        override?: any
    ) => { },
};

const mockActivatedRoute = {
    snapshot: {
        paramMap: {
            get: () => 1,
        },
    },
};

describe('EditHeroComponent', () => {
    let component: EditHeroComponent;
    let fixture: ComponentFixture<EditHeroComponent>;
    let editHeroForm;
    let compiled;
    let heroesServiceMock;
    let routerMock;
    let activatedRouteMock;
    let formBuilderMock;
    let toastMock;


    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [EditHeroComponent],
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
                { provide: ActivatedRoute, useValue: mockActivatedRoute },
                LoaderService
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EditHeroComponent);

        heroesServiceMock = {
            updateHero: jest.fn(),
            getHeroById: jest.fn()
        };

        routerMock = {
            navigateByUrl: jest.fn()
        };

        activatedRouteMock = { };

        toastMock = toastrService;
        formBuilderMock = new FormBuilder();

        component = new EditHeroComponent(
            formBuilderMock,
            routerMock,
            heroesServiceMock,
            toastMock,
            activatedRouteMock
        );
        component = fixture.componentInstance;
        fixture.detectChanges();
        editHeroForm = component.editHeroForm.controls;
        compiled = fixture.debugElement.nativeElement;
    });

    describe('Test: ngOnInit', () => {
        it('Should be initialized and call initEditHeroForm', () => {
            fixture.detectChanges();
            expect(fixture).toBeTruthy();
            const initEditHeroFormSpy = jest.spyOn(component, 'initEditHeroForm');
            const getHeroByIdSpy = jest.spyOn(component, 'getHeroById');
            component.ngOnInit();
            expect(initEditHeroFormSpy).toBeCalled();
            expect(getHeroByIdSpy).toBeCalled();
        });
    });

    describe('Test: editHeroForm', () => {
        it('Should initialize editHeroForm', () => {
            const hero: HeroUpdate = {
                name: '',
                description: '',
                imageURL: ''
            };
            expect(component.editHeroForm.value).toEqual(hero);
        });

        it('Should invalidate the form', () => {
            editHeroForm.name.setValue('');
            editHeroForm.description.setValue('');
            expect(component.editHeroForm.valid).toBeFalsy();
        });

        it('Should validate the form', () => {
            editHeroForm.name.setValue('superman');
            editHeroForm.description.setValue('this is a short description');
            expect(component.editHeroForm.valid).toBeTruthy();
            fixture.detectChanges();
        });
    });

    describe('Test: editHero()', () => {
        it('Should NOT call updateHero of heroes Service', () => {
            editHeroForm.name.setValue('');
            editHeroForm.description.setValue('');

            component.editHero();

            expect(heroesServiceMock.updateHero).not.toHaveBeenCalled();
        });

        it('Should call updateHero of heroes Service', () => {
            editHeroForm.name.setValue('Random Name');
            editHeroForm.description.setValue('this is a short description');
            const hero: Hero = {
                id: 1000,
                name: editHeroForm.name.value,
                description: editHeroForm.description.value,
                imageURL: editHeroForm.imageURL.value
            };

            const editHeroSpy = jest.spyOn(heroesServiceMock, 'updateHero').mockReturnValue(true);

            component.editHero();

            expect(heroesServiceMock.updateHero(hero.id, hero)).toEqual(true);
            expect(editHeroSpy).toHaveBeenCalledWith(1000, hero);
        });

        it('Should call updateHero of heroes Service but with an error response', () => {
            editHeroForm.name.setValue('superman');
            editHeroForm.description.setValue('this is a short description');

            const error: HttpErrorResponse = {
                status: 409,
                message: 'Hero already exists.'
            } as HttpErrorResponse;

            const handleEditHeroErrorSpy = jest.spyOn(component, 'handleEditHeroError');
            jest.spyOn(heroesServiceMock, 'updateHero').mockReturnValue(throwError(error));

            component.editHero();
            expect(handleEditHeroErrorSpy);
        });

    });

});
