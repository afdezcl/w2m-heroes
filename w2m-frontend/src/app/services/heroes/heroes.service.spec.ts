import { of } from 'rxjs';
import { Hero } from '../../models/hero.interface';
import { HeroUpdate } from '../../models/heroUpdate.interface';
import { HeroesService } from './heroes.service';

describe('Service: ExpenseService', () => {
    let service: HeroesService;
    const http = jest.fn();

    beforeEach(() => {
        service = new HeroesService(http as any);
    });

    describe('Test: init component', () => {
        it('should be defined', () => {
            expect(service).toBeDefined();
        });
    });

    describe('Test: get heroes', () => {
        it('should get all heroes', done => {
            const response: Array<Hero> = [
                {
                    id: 1,
                    name: 'SUPERMAN',
                    description: 'Esta es la descripción de SUPERMAN',
                    imageURL: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fpngimg.com%2Fimage%2F29170&psig=AOvVaw0BgdekBzmyJJnL5HSfY_Au&ust=1614983464803000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPi95q_Yl-8CFQAAAAAdAAAAABAI'
                },
                {
                    id: 2,
                    name: 'HULK',
                    description: 'Esta es la descripción de HULK',
                    imageURL: 'https://www.google.com/imgres?imgurl=http%3A%2F%2Fpngimg.com%2Fuploads%2Fhulk%2Fhulk_PNG82.png&imgrefurl=http%3A%2F%2Fpngimg.com%2Fimage%2F63416&tbnid=sIlcX00RQ1HjlM&vet=12ahUKEwi0i8qz2ZfvAhUV-4UKHQ4pCUIQMygAegUIARCpAQ..i&docid=qPdNW5pXnXHjiM&w=3024&h=3888&q=HUL%20image%20png&ved=2ahUKEwi0i8qz2ZfvAhUV-4UKHQ4pCUIQMygAegUIARCpAQ'
                }];

            const httpMock = {
                get: jest.fn().mockReturnValue(of(response))
            };
            const serviceMock = new HeroesService(httpMock as any);
            serviceMock.getHeroes().subscribe((data) => {
                expect(httpMock.get).toBeDefined();
                expect(httpMock.get).toHaveBeenCalled();
                expect(data).toEqual(response);
                done();
            });
        });
    });

    describe('Test: get hero by ID', () => {
        it('should get hero by ID', done => {
            const heroId = 1;
            const response: Hero = {
                id: 1,
                name: 'SUPERMAN',
                description: 'Esta es la descripción de SUPERMAN',
                imageURL: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fpngimg.com%2Fimage%2F29170&psig=AOvVaw0BgdekBzmyJJnL5HSfY_Au&ust=1614983464803000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPi95q_Yl-8CFQAAAAAdAAAAABAI'
            };

            const httpMock = {
                get: jest.fn().mockReturnValue(of(response))
            };
            const serviceMock = new HeroesService(httpMock as any);
            serviceMock.getHeroById(heroId).subscribe((data) => {
                expect(httpMock.get).toBeDefined();
                expect(httpMock.get).toHaveBeenCalled();
                expect(data).toEqual(response);
                done();
            });
        });
    });

    describe('Test: update hero', () => {
        it('should update hero', done => {
            const heroId = 1;
            const heroUpdate: HeroUpdate = {
                name: 'SUPERMAN',
                description: 'Nueva descripcion',
            };

            const response: Hero = {
                id: 1,
                name: 'SUPERMAN',
                description: 'Nueva descripcion',
                imageURL: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fpngimg.com%2Fimage%2F29170&psig=AOvVaw0BgdekBzmyJJnL5HSfY_Au&ust=1614983464803000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPi95q_Yl-8CFQAAAAAdAAAAABAI'
            };

            const httpMock = {
                patch: jest.fn().mockReturnValue(of(response))
            };
            const serviceMock = new HeroesService(httpMock as any);
            serviceMock.updateHero(heroId, heroUpdate).subscribe((data) => {
                expect(httpMock.patch).toBeDefined();
                expect(httpMock.patch).toHaveBeenCalled();
                expect(data).toEqual(response);
                done();
            });
        });
    });


    describe('Test: delete hero', () => {
        it('should delete a hero by ID', done => {
            const usrId = 123;
            const response = {
                success: true,
                message: 'Hero removed successfully'
            };

            const httpMock = {
                delete: jest.fn().mockReturnValue(of(response))
            };
            const serviceMock = new HeroesService(httpMock as any);
            serviceMock.deleteHero(usrId).subscribe((data) => {
                expect(httpMock.delete).toBeDefined();
                expect(httpMock.delete).toHaveBeenCalled();
                expect(data).toEqual(response);
                done();
            });
        });
    });

});
